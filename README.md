# WSL2 



on ubuntu WSL ( type 'Ip addr') to get the Ip addr

and then replase connectaddress to Ip addr from Ubuntu WSL

Enable port on Windows Command (Run As Administrator)
netsh interface portproxy add v4tov4 listenport=19000 connectport=19000 connectaddress=172.27.212.106
netsh interface portproxy add v4tov4 listenport=19001 connectport=19001 connectaddress=172.27.212.106
netsh interface portproxy add v4tov4 listenport=19002 connectport=19002 connectaddress=172.27.212.106

netsh interface portproxy add v4tov6 listenport=19002 connectport=19002 connectaddress=::1 listenaddress=0.0.0.0
netsh interface portproxy add v4tov6 listenport=19001 connectport=19001 connectaddress=::1 listenaddress=0.0.0.0
netsh interface portproxy add v4tov6 listenport=19000 connectport=19000 connectaddress=::1 listenaddress=0.0.0.0

netsh advfirewall firewall add rule name="Open Port 19000 for WSL2" dir=in action=allow protocol=TCP localport=19000

on ubuntu WSL 'export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.9' to your local address.

netsh interface portproxy add v4tov6 listenport=3000 connectport=3000 connectaddress=::1 listenaddress=0.0.0.0
enable WSL Port to Windows so it can be used for physical phone or another 

New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Inbound -LocalPort 3000 -Action Allow -Protocol TCP;
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Outbound -LocalPort 3000 -Action Allow -Protocol TCP;
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=$($(wsl hostname -I).Trim());
Invoke-Expression "netsh interface portproxy show v4tov4"


In case using Android Emulator but cannot connect to emulator

