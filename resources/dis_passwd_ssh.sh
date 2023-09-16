# Edit the SSH configuration file
sudo nano /etc/ssh/sshd_config

# Set PasswordAuthentication to 'no'
PasswordAuthentication no

# Restart the SSH service
sudo systemctl restart sshd
