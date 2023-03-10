sudo apt update 
sudo apt install -y python3-pip python3-virtualenv sqlite3
cd restify
virtualenv venv
pip3 install -r requirements.txt 
