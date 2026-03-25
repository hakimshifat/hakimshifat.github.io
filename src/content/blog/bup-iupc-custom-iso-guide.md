---
title: "IUPC Custom ISO Guide"
description: "A comprehensive guide to building a custom Ubuntu 24.04 ISO for IUPC programming contests using Cubic, including network lockdown, user restrictions, and security hardening."
pubDate: "2025-12-27"
tags: ["linux", "arch-linux", "ubuntu", "cubic", "iso", "security", "iptables"]
heroImage: " "
---

# IUPC Custom ISO Guide

## 1. Prerequisites
- **Host OS:** Arch Linux.
- **Tools:** Cubic (Custom Ubuntu ISO Creator) installed on the host.
- **Base ISO:** Official Ubuntu 24.04 Desktop ISO.

## 2. Phase 1: Initial Cubic Setup
1. Open **Cubic** and select a new project directory.
2. Choose the base Ubuntu ISO file.
3. Navigate to the **Virtual Terminal (Chroot)** environments. All commands hereafter are executed within this chroot.

## 3. Phase 2: Core Tooling & IDE Installation
Prepare the system with the required compilers, networking utilities, and development environments.

```bash
# Update repositories and base packages
apt update && apt upgrade -y

# Install standard contest tools
apt install -y build-essential g++ gcc python3 openjdk-17-jdk \
  dnsutils iptables-persistent network-manager curl gpg codeblocks vim

# Install Visual Studio Code
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | \
  gpg --dearmor -o /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] \
  https://packages.microsoft.com/repos/code stable main" > \
  /etc/apt/sources.list.d/vscode.list
apt update && apt install -y code

# Install Sublime Text
curl -fsSL https://download.sublimetext.com/sublimehq-pub.gpg | \
  gpg --dearmor -o /etc/apt/keyrings/sublimehq-archive.gpg
echo "deb [signed-by=/etc/apt/keyrings/sublimehq-archive.gpg] \
  https://download.sublimetext.com/ apt/stable/" > \
  /etc/apt/sources.list.d/sublime-text.list
apt update && apt install -y sublime-text
```

## 4. Phase 3: The "Bulletproof" Network Lockdown

We use a dynamic whitelist script to handle changing IP addresses for contest domains.

### A. The Firewall Script

Create `/usr/local/bin/lockdown.sh`:

```bash
#!/bin/bash
# Allowed domains for the contest
DOMAINS=("toph.co" "codeforces.com" "vjudge.net" "fonts.googleapis.com" "fonts.gstatic.com" "ajax.googleapis.com")

# Reset and set default to DROP (Deny all)
iptables -F
iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP

# Allow local traffic and DNS resolution
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A INPUT -p udp --sport 53 -j ACCEPT

# Dynamically whitelist resolved IPs
for domain in "${DOMAINS[@]}"; do
    ips=$(dig +short "$domain" | grep -E '^[0-9.]+$')
    for ip in $ips; do
        iptables -A OUTPUT -p tcp -d "$ip" --dport 443 -j ACCEPT
        iptables -A OUTPUT -p tcp -d "$ip" --dport 80 -j ACCEPT
        iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    done
done
```

**Permissions:** `chmod 700 /usr/local/bin/lockdown.sh`

### B. Automation via Systemd

Enable the script to run automatically at boot.

```bash
cat <<EOF > /etc/systemd/system/contest.service
[Unit]
Description=IUPC Network Hardening
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/lockdown.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl enable contest.service
```

## 5. Phase 4: User & Terminal Security

Apply the principle of least privilege to the contestant account.

### A. Account Creation
```bash
# Admin User (Authorized staff)
useradd -m -s /bin/bash admin
echo "adminusername:adminpassword" | chpasswd
usermod -aG sudo adminusername

# Contestant User (Restricted access)
useradd -m -s /bin/bash contestant
echo "contestantusername:contestantpassword" | chpasswd
# Ensure NO sudo rights
deluser contestant sudo 2>/dev/null
```

### B. Disarming Commands & System Files
```bash
# Revoke execution rights for networking tools from standard users
chmod 700 /usr/sbin/iptables /usr/sbin/ip /usr/bin/nmcli /usr/bin/nmtui

# Hard-code DNS and make it unchangeable (Immutable)
echo -e "nameserver 8.8.8.8\nnameserver 1.1.1.1" > /etc/resolv.conf
chattr +i /etc/resolv.conf
```

### C. GUI (Dconf) Lockdown

Lock desktop settings so the UI cannot be used to bypass restrictions.

```bash
mkdir -p /etc/dconf/db/local.d/locks
cat <<EOF > /etc/dconf/db/local.d/01-iupc-lockdown
[org/gnome/desktop/lockdown]
disable-command-line=false
disable-user-switching=true

[org/gnome/nm-applet]
disable-connected-notifications=true
EOF

cat <<EOF > /etc/dconf/db/local.d/locks/iupc-locks
/org/gnome/control-center/network
/org/gnome/desktop/networking/
EOF
dconf update
```

## 6. Phase 5: Finalizing & Testing

1. **Compression:** In Cubic, select **gzip** for a stable balance of speed and size.
2. **Auto-login:** Configure the `contestant` account to auto-login via the Cubic options page.
3. **QEMU Testing:** Run the following command on your Arch host:

```bash
qemu-system-x86_64 -enable-kvm -m 4G -cpu host -cdrom ./custom.iso -vga std -display gtk
```
