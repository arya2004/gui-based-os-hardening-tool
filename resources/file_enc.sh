# Encrypt a disk partition
sudo apt install cryptsetup

sudo cryptsetup luksFormat /dev/sdX

# Open the encrypted partition
sudo cryptsetup luksOpen /dev/sdX my-encrypted-partition

# Create a file system (e.g., ext4) on the encrypted partition
sudo mkfs.ext4 /dev/mapper/my-encrypted-partition

# Mount the encrypted partition
sudo mount /dev/mapper/my-encrypted-partition /mnt/my-encrypted-mount
