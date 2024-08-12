---
layout: post
title:  "[Ubuntu] WSL 우분투에서 MongoDB 실행되지 않는 현상 해결 방법"
date:   2022-08-04 00:00:00 +0900
img: wsl.png # Add image post (optional)
tags: [WSL, WSL2, Ubuntu, MongoDB] # add tag
---

Spring MongoDB Integration 실습을 위해 WSL 우분투환경에서 MongoDB를 설치하고 실행하려고 하니 
다음과 같은 에러가 발생하였다.

```bash
❯ systemctl start mongod
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

찾아보니 wsl2에서는 systemd를 지원하지 않기 때문에 공식적으로는 `systemctl` 명령어를 사용할 수 없다고 한다. 대신 `service` 명령은 지원하기 때문에 `service` 명령으로 실행해보라고 한다.

`service` 라는 명령어는 /etc/init.d에 해당 파일이 존재할 때 사용할 수 있는 명령어 이다.

```bash
❯ sudo service mongod start
mongod: unrecognized service
```

apt-get으로 mongodb를 설치했을때 /etc/init.d에 mongod파일이 생성되지 않는 듯 하다.

수동으로 /etc/init.d에 mongod 파일을 만들어주자.

```bash
cd /etc/init.d
sudo touch mongod
sudo chmod 755 mongod
```

[https://github.com/mongodb/mongo/blob/master/debian/init.d](https://github.com/mongodb/mongo/blob/master/debian/init.d)

찾아보니 해당 링크의 내용으로 mongod 파일을 만들면 되는 듯하다.

mongod 파일에 해당 내용을 붙여넣기하고 다시 실행해보았다.

```bash
❯ sudo service mongod start
 * Starting database mongod                                                                             [ OK ]
❯ ps -ef | grep mongod
mongodb  23520 17530  4 14:19 ?        00:00:00 /usr/bin/mongod --config /etc/mongod.conf
```

정상적으로 뜨는 것 같다.