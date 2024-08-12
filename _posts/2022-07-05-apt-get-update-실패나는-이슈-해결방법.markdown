---
layout: post
title:  "[Ubuntu] apt-get update 실패나는 이슈 해결방법"
date:   2022-07-05 12:13:23 +0900
img: apt-get.jpg # Add image post (optional)
tags: [K8s, Openssl, Ubuntu] # add tag
---
```bash
❯ sudo apt-get update
Ign:1 https://apt.kubernetes.io kubernetes-xenial InRelease
Err:2 https://apt.kubernetes.io kubernetes-xenial Release
  Certificate verification failed: The certificate is NOT trusted. The certificate issuer is unknown.  Could not handshake: Error in the certificate verification. 
Hit:3 https://download.docker.com/linux/ubuntu focal InRelease
Hit:4 http://security.ubuntu.com/ubuntu focal-security InRelease
Hit:5 http://archive.ubuntu.com/ubuntu focal InRelease
Hit:6 http://archive.ubuntu.com/ubuntu focal-updates InRelease
Hit:7 http://archive.ubuntu.com/ubuntu focal-backports InRelease
Reading package lists... Done
E: The repository 'https://apt.kubernetes.io kubernetes-xenial Release' does not have a Release file.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.
```

해당 에러가 발생하는 경우는 해당 서버의 인증서가 없어서 저장소에 릴리즈된 파일들을 읽어오지 못하는 경우이다.

1. 아래 명령어로 해당 서버의 인증서를 파일로 읽어온다.
 ```bash
openssl s_client -connect apt.kubernetes.io:443 | tee cert_file
 ```
1. 파일의  BEGIN CERTIFICATE  부분부터  END CERTIFICATE까지가 인증서 부분이기 때문에 해당 부분만 남기고 나머지는 지우고 파일을 저장한다.
1. 아래 명령어로 제대로 추출되었는지 확인한다.

 ```bash
openssl x509 -inform PEM -text -in cert_file
 ```

1. 해당 인증서의 내용을 신뢰하는 인증 기관 목록(**CA List; Certificate Authority List**)에 추가한다.

 ```bash
cat cert_file >> /etc/ssl/certs/ca-certificates.crt
 ```