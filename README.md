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

on ubuntu WSL 'export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.133.76' to your local address.

netsh interface portproxy add v4tov6 listenport=3000 connectport=3000 connectaddress=::1 listenaddress=0.0.0.0
enable WSL Port to Windows so it can be used for physical phone or another 

New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Inbound -LocalPort 3000 -Action Allow -Protocol TCP;
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Outbound -LocalPort 3000 -Action Allow -Protocol TCP;
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=$($(wsl hostname -I).Trim());
Invoke-Expression "netsh interface portproxy show v4tov4"


New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Inbound -LocalPort 19000 -Action Allow -Protocol TCP;
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Outbound -LocalPort 19000 -Action Allow -Protocol TCP;
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=0.0.0.0 connectport=19000 connectaddress=$($(wsl hostname -I).Trim());
Invoke-Expression "netsh interface portproxy show v4tov4"


In case using Android Emulator but cannot connect to emulator in wsl

cd ~
sudo apt-get update
sudo apt-get install unzip zip
wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
unzip sdk-tools-linux-4333796.zip -d Android
rm sdk-tools-linux-4333796.zip
sudo apt-get install -y lib32z1 openjdk-8-jdk
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
### check latest platform and build-tools versions (29, 29.0.2)
./sdkmanager --install "platform-tools" "platforms;android-29" "build-tools;29.0.2"
export ANDROID_HOME="$HOME/Android"
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/tools/bin:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
printf "\n\nexport ANDROID_HOME=\$HOME/Android\nexport PATH=\$PATH:\$ANDROID_HOME/tools\nexport PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> ~/.bashrc
./sdkmanager --update
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"


Microsoft Windows [Version 10.0.19045.3271]
(c) Microsoft Corporation. All rights reserved.

C:\Users\did>set ANDROID_HOME
ANDROID_HOME=C:\Users\did\AppData\Local\Android\Sdk

C:\Users\did>set WSLENV=ANDROID_HOME/up

C:\Users\did>ubuntu
❯ echo $ANDROID_HOME
/mnt/c/Users/did/AppData/Local/Android/Sdk


on zsh add

nano ~/.zshrc

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_complet

hostip=$(ipconfig.exe | grep "Wireless LAN adapter Wi-Fi" -A 5 | grep "IPv4 Address" | awk '{print $>
export REACT_NATIVE_PACKAGER_HOSTNAME="$hostip"
export ANDROID_HOME=/mnt/c/Users/did/AppData/Local/Android/Sdk
export WSLENV=ANDROID_HOME/p

and then
sudo cp /mnt/c/Users/did/AppData/Local/Android/sdk/platform-tools/adb.exe /mnt/c/Users/did/AppData/Local/Android/sdk/platform-tools/adb

close terminal