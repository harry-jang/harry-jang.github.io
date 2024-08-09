---
layout: post
title:  "[SpringBoot] Gradle을 이용하여 profile별 프로퍼티 적용하기"
date:   2020-11-06 17:25:41 +0900
img: springboot.png # Add image post (optional)
tags: [Java, Gradle, Spring, Springboot] # add tag
---
### 사용 버전
- JAVA : openJdk 1.8.0 
- Springboot : 2.1.0.RELEASE
- Gradle : 5.3.1

### 개요
#### 실무 환경에서 환경별로 각각 다르게 설정해야 하는 값이 있을 경우, 프로퍼티 파일을 환경별로 분리하여 세팅하는 방법입니다. 예를 들면 개발환경과 실서비스 환경에서 사용하는 DB의 IP, HttpClient의 설정값 등의 환경별로 달라질 수 있는 값을 각 환경에 맞게 프로퍼티를 세팅할 수 있게 됩니다.

### 패키지 구조
#### ![프로젝트 구조]({{site.baseurl}}/assets/img/project_structure.png)

### 적용방법

1. resources 디렉토리 하위에 profiles 폴더를 생성하고 여기에 각 profile별로 프로퍼티 파일을 생성한다. (예시는 .yml 파일이지만 .properties 파일도 가능)
1. 각 profile 별로 만든 프로퍼티 파일에 어떤 profile일 때 활성화시킬지 각각 명시해준다.
	1. yml 파일일 경우
    	~~~ yaml
          spring : 
              profiles :
                  active : "prod"
     	~~~
    1. properties 파일일 경우
      ~~~ 
          spring.profiles.active=prod
      ~~~
1. build.gradle 파일을 열어 resources/profiles 디렉토리에서도 리소스를 읽어올 수 있도록 아래 코드를 추가한다.
	~~~ java
    	sourceSets {
                main {
                    resources {
                        srcDirs("src/main/resources", "src/main/resources/profiles")
                    }
                }
            }
    ~~~
1. 부트  실행시에 profile 값을 적용할 수 있도록 아래 코드를 추가한다.
	~~~ java
    	bootRun {
    		String activeProfile = System.properties['spring.profiles.active']
    		println "zone: $activeProfile"
    		systemProperty "spring.profiles.active", activeProfile
		}
    ~~~
1. 빌드 실행 시 jvm option에 활성화할 profile 옵션을 추가하여 실행한다.
	~~~ bash
    	java -Dspring.profiles.active=local -jar ${빌드 결과물 이름}.jar
    ~~~
   
### 결과
#### 세팅이 완료되면, 기본적으로 resources/application.yml에 있는 프로퍼티 값과 resources/profiles/application-{profile}.xml의 프로퍼티값 둘다 사용할 수 있으며, 만약 프로필과 디폴트 파일에 중복된 프로퍼티 값이 있을 경우 프로필에 기술된 프로퍼티값이 적용이 됩니다.
   
