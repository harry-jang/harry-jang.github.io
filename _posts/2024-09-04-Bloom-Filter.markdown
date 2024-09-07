---
layout: post
title:  "[자료구조] BloomFilter"
date:   2024-09-05 09:00:00 +0900
img: bloomfilter.jfif # Add image post (optional)
tags: [DataStructure, BloomFilter] # add tag
---

# BloomFilter란?
버튼 하워드 블룸이 저술한 논문, 『 *Space/Time Trade-offs in Hash Coding with Allowable Errors* 』에서 언급된  **큰 데이터 집합 내에 특정 원소의 포함여부를 빠르게 검사할 때 사용되는 자료구조**로,
비트배열(bitarray)와 해시함수를 사용한 공간 효율적인 확률적 자료구조임.


## 원리
블룸필터는 값을 저장하는 비트배열과 해시함수들로 구성되어 있음.

해시함수들을 이용해서 원소를 해시코드로 변환한 결과를 모듈러연산을 통해 비트배열에 각 비트 위치에 저장하는 구조.

![블룸 필터의 원리]({{site.baseurl}}/assets/img/bloomFilter_principle.png)


예를 들어 비트배열의 사이즈(m)가 18, 해시함수의 갯수(k)가 3인 블룸필터로 {x, y, z} 집합을 표현한다고 가정.

집합 내의 원소 x에 대해서 각 해시함수를 실행하여 나온 결과값에 모듈러 연산을 해서 비트배열에 들어갈 인덱스 값을 구함.

나머지 원소들도 동일하게 계산하여 해당되는 인덱스에 값을 1로 채움.  

![블룸 필터의 원리]({{site.baseurl}}/assets/img/bloomFilter_array.png)

새로운 원소 w에 대해서 해당 집합에 포함되는지 확인한다면, 비트배열을 채울 때와 동일하게 각 해시함수를 돌려 해당 비트배열 인덱스에 값이 1인지 확인.

하나라도 1이 아닌 경우 포함되지 않는 걸로 판단.


## 특징
### 공간 효율성
비트 배열을 사용하여 매우 작은 공간을 사용하면서도 많은 양의 데이터를 다룰 수 있음

### 긍정 오류(False Positive) 발생 가능성
해시 충돌과 비트배열의 크기제약에 의해 집합 내에 속하지 않은 원소를 가끔 속해있다 라고 하는 긍정오류의 가능성이 있음. 따라서 집합 내에 원소의 숫자가 증가할 수록 긍정 오류의 가능성이 증가함.

반대로  False Negative(부정 오류)의 가능성은 없음.

>**bloomFilter 최적 값 계산**
>
>긍정오류(false positive)의 확률을 줄이기 위해 hash function의 갯수 및 bitmap size를 조절하는 방식으로 최적값을 찾아 설정해야 정확도를 높일 수 있음
>
>[https://hur.st/bloomfilter/?n=500&p=0.0001&m=&k=](https://hur.st/bloomfilter/?n=500&p=0.0001&m=&k=)


### 원소 추가만 가능

집합 내에 원소를 추가하는 것은 가능하나 삭제하는 것은 불가능.

현재는 Counting Bloom Filter나 Cuckoo Filter라는 삭제 가능한 개량 모델도 나옴.


## 사용 예

1. 데이터베이스 및 캐싱 시스템
    1. 캐시 미스 방지

        DB나 캐시 시스템에서 데이터가 캐시에 있는지 여부를 빠르게 확인해서 캐시에 없는 데이터에 대한 쿼리를 방지하여 성능 최적화
        
    2. DB 조회 최적화

        특정 키나 레코드가 존재하는지 먼저 블룸 필터로 확인 후 없을 경우 불필요한 디스크 조회 방지
        
    3. 분산 캐시

        여러 노드에 걸쳐 있는 분산 캐시에서 특정 키가 어느 노드에 존재하는 지 확인
        
2. 네트워크 및 보안
    1. 네트워크 패킷 필터링

        특정 패킷이 악성 목록에 있는지 빠르게 확인하여 악성 IP 주소나 도메인을 효율적으로 필터링
        
    2. 중복 제거

        이미 처리된 패킷이나 메시지를 빠르게 확인하여 동일한 메시지나 요청이 반복적으로 전송되는 것을 방지
        
3. 웹 서비스 및 검색 엔진
    1. URL 중복 검사

        웹 크롤러에서 동일한 URL를 반복적으로 방문하지 않도록 이미 방문한 URL을 블룸필터로 필터링하여 크롤링 효율을 높임
        
    2. 검색 엔진 키워드 필터링   

        인덱스에 포함된 키워드인지 빠르게 확인하여 불필요한 검색 작업을 줄임
        
4. 블록체인
    1. SPV(간이 결제 확인) 노드     
    
        전체 블록체인을 다운로드하지 않고, 특정 트랜잭션이 블록체인에 포함되어 있는지 확인하는 용도로 사용
        

## 대표 라이브러리

- Guava (client, 분산환경 지원 x)
- Redisson (client)
- RedisBloom (server, redisStack 내 지원 모듈)

## 참고자료

[https://en.wikipedia.org/wiki/Bloom_filter](https://en.wikipedia.org/wiki/Bloom_filter)

[https://kwjdnjs.tistory.com/77](https://kwjdnjs.tistory.com/77)

[https://meetup.nhncloud.com/posts/192](https://meetup.nhncloud.com/posts/192)
