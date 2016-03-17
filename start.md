# Welcome to the hosts!
                   
1. Use the following guidance may cover all existing hosts, such as existing hosts important content, then please make a backup. 

2. After using the following guide is configured, you will need to "reset the network":

- Reboot the system
- Plug the network cable
- Enable Disable flight mode
- Switching network in the System Settings

If you do not reset your network, then, hosts will not be used.

> ** If you have any questions, please visit [our Wiki page] (https://github.com/racaljk/hosts/wiki). **


## Windows
Open the file with a text editor (such as Notepad):

    C: \ Windows \ System32 \ drivers \ etc \ hosts
    
And our [hosts] (https://raw.githubusercontent.com/racaljk/hosts/master/hosts) file, copy the contents of the entire contents into the file and save it.

> Note: If you can not be saved, right-hosts file and find the "Properties" -> "Security" and then choose your login user name, and finally click Edit, select the "write" button.

## Mac OS
Please create / modify `/ private / etc / hosts` file and our [hosts] (https://raw.githubusercontent.com/racaljk/hosts/master/hosts) contents of the file to copy the entire contents of the file and save.


> You can also use [Gas Mask] (http://www.macupdate.com/app/mac/29949/gas-mask/) tool.


## Android
Please create / modify `/ system / etc / hosts` file and our [hosts] (http://hosts.ren/hosts/hosts) contents of the file to copy the entire contents of the file and save.


## IOS
Please create / modify `/ etc / hosts` file and our [hosts] (http://hosts.ren/hosts/hosts) contents of the file to copy the entire contents to the file and save.


## Linux
Please create / modify `/ etc / hosts` file and our [hosts] (http://hosts.ren/hosts/hosts) contents of the file to copy the entire contents to the file and save.

Or open a terminal (shortcut <kbd> Ctrl + Alt + T </ kbd>) and directly using the following command:

    bash -c 'wget http://hosts.ren/hosts/hosts -qO / tmp / hosts && sudo mv / tmp / hosts / etc / hosts'