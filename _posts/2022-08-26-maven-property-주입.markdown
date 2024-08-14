---
layout: post
title:  "[SpringBoot] Maven property 주입하기"
date:   2022-08-26 00:00:00 +0900
img: springboot_maven.png # Add image post (optional)
tags: [Springboot, Maven] # add tag
---

로그에 프로젝트명, 프로젝트버전을 남기기 위해 pom.xml에 설정된 프로젝트명, 프로젝트 버전을 스프링으로 가져오는 방법을 알아보았다.

### pom.xml

1. resource 필터링 활성화를 통해 [application.properties](http://application.properties) 리소스 파일의 속성을 필터링(교체)
    
    ```xml
    <resources>
        <resource>
            <filtering>true</filtering>
            <directory>src/main/resources</directory>
            <includes>
                <include>application.properties</include>
            </includes>
        </resource>
    </resources>
    ```
    
2. [application.properties](http://application.properties) 파일에서 maven 프로퍼티를 ${} 형태로 주입받을 수 있도록 설정
    1. spring-boot-start-parent에서는 @property@로 프로터피를 주입받게 재정의되어 있으나useDefaultDelimiters : true로 주면 ${property}로 주입받을 수 있다.
    
    ```xml
    <build>
    ...
    	<plugins>
          ...
    		<plugin>
    			<groupId>org.apache.maven.plugins</groupId>
    			<artifactId>maven-resources-plugin</artifactId>
    			<version>2.7</version>
    			<configuration>
    				<useDefaultDelimiters>true</useDefaultDelimiters>
    			</configuration>
    		</plugin>
    	</plugins>
    </build>
    ```
    

### application.properties

1. 아래와 같이 pom.xml에서 가져올 프로퍼티를 지정한다.

```
  application.name=${project.artifactId}
  build.version=${project.version}
```