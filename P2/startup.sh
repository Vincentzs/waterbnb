sudo apt update 
sudo apt install python3-pip
sudo apt install sqlite3
sudo apt install python3-virtualenv
virtualenv venv
source venv/bin/activate
cd restify
pip3 install -r requirements.txt 