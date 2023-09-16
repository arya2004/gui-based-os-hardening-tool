

# Disable services as needed
sudo systemctl disable "$1"


# List enabled services
sudo systemctl list-unit-files --state=enabled