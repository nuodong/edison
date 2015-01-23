rfkill unblock bluetooth
hciconfig hci0 up

vi /etc/opkg/base-feeds.conf (insert only following lines)
src/gz all http://repo.opkg.net/edison/repo/all
src/gz edison http://repo.opkg.net/edison/repo/edison
src/gz core2-32 http://repo.opkg.net/edison/repo/core2-32

opkg update
opkg install bluez5-dev

npm install -g async
npm install noble
npm install bleno

rfkill unblock bluetooth
systemctl disable bluetooth
hciconfig hci0 up 