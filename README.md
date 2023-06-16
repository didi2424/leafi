# WSL2 



on ubuntu WSL ( type 'Ip addr') to get the Ip addr

and then replase connectaddress to Ip addr from Ubuntu WSL

Enable port on Windows Command (Run As Administrator)
netsh interface portproxy add v4tov4 listenport=19000 connectport=19000 connectaddress=172.27.187.187 
netsh interface portproxy add v4tov4 listenport=19001 connectport=19001 connectaddress=172.27.187.187 
netsh interface portproxy add v4tov4 listenport=19002 connectport=19002 connectaddress=172.27.187.187 

netsh interface portproxy add v4tov6 listenport=19002 connectport=19002 connectaddress=::1 listenaddress=0.0.0.0
netsh interface portproxy add v4tov6 listenport=19001 connectport=19001 connectaddress=::1 listenaddress=0.0.0.0
netsh interface portproxy add v4tov6 listenport=19000 connectport=19000 connectaddress=::1 listenaddress=0.0.0.0

netsh advfirewall firewall add rule name="Open Port 19000 for WSL2" dir=in action=allow protocol=TCP localport=19000

on ubuntu WSL 'export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.9' to your local address.
