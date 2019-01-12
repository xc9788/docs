# Nmap命令帮助

[官方参考指南](https://nmap.org/man/zh/index.html)

## -iL <inputfilename\>

从 <inputfilename\>中读取主机/网络，文件中以空格符，制表符，换行符隔开

```bash
nmap -iL iplist.txt

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-12 08:28 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.16 seconds
```

## -iR <hostnum\>

随机生成<hostnum\>个主机/网络进行扫描

```bash
nmap -iR 3

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-12 08:32 EST
Nmap scan report for ppp91-79-71-215.pppoe.mtu-net.ru (91.79.71.215)
Host is up (0.41s latency).
Not shown: 986 closed ports
PORT     STATE    SERVICE
21/tcp   filtered ftp
23/tcp   filtered telnet
25/tcp   filtered smtp
80/tcp   filtered http
135/tcp  filtered msrpc
139/tcp  filtered netbios-ssn
161/tcp  filtered snmp
254/tcp  filtered unknown
255/tcp  filtered unknown
443/tcp  filtered https
445/tcp  filtered microsoft-ds
593/tcp  filtered http-rpc-epmap
4444/tcp filtered krb524
8080/tcp filtered http-proxy

Nmap done: 3 IP addresses (1 host up) scanned in 41.38 seconds
```

## --exclude <host1[，host2][，host3]，...>

排除主机/网络

```bash
nmap 192.168.43.1-5 --exclude 192.168.43.2

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-12 08:37 EST
Nmap scan report for 192.168.43.1
Host is up (0.0058s latency).
Not shown: 998 closed ports
PORT      STATE SERVICE
53/tcp    open  domain
55555/tcp open  unknown
MAC Address: 4E:C0:0A:65:EF:C3 (Unknown)

Nmap done: 4 IP addresses (1 host up) scanned in 0.92 seconds
```

## --excludefile <excludefile\>

排除<excludefile\>中的主机/网络，文件中以空格符，制表符，换行符隔开，效果同上

## -sP 

仅仅进行ping扫描(主机发现)，然后打印出对扫描做出响应的那些主机(存活的主机)

```bash
nmap -sP 192.168.43.0/24

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-12 08:52 EST
Nmap scan report for 192.168.43.1
Host is up (0.0045s latency).
MAC Address: 4E:C0:0A:65:EF:C3 (Unknown)
Nmap scan report for hrb-Shinelon (192.168.43.180)
Host is up (0.00018s latency).
MAC Address: 68:07:15:5C:E6:A3 (Intel Corporate)
Nmap scan report for kali-attack-1 (192.168.43.165)
Host is up.
Nmap done: 256 IP addresses (3 hosts up) scanned in 2.04 seconds
```

## -P0

默认情况下，Nmap只对正在运行的主机进行高强度的探测。使用该命令将完全跳过正常的主机发现，执行所要求的功能，就好像每个IP都是活动的。(大范围扫描时，影响效率)

## -PS [portlist]

对[portlist\]端口发送一个设置了SYN标志位的空TCP报文，默认为80。收到SYN/ACK包表示端口开放；RST包表示端口关闭，但是不论开放与否，都证明目标存活

```bash
nmap -PS 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-13 07:45 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.17 seconds
```

## -PA [portlist]

与-PS同理。收到RST包表示端口开放/关闭，但是不论开放与否，都证明目标存活，主要用于穿越过滤了SYN包的防火墙

```bash
nmap -PA 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-13 07:48 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.12 seconds
```

## -PU [portlist]

发送一个空的(除非指定了--data-length)UDP报文到[portlist\]端口，默认为31338。收到ICMP端口无法到达表示目标端口关闭(目标存活)，如果到达一个开放的端口，大部分服务仅仅忽略这个空报文而不做任何回应，但是这样就和主机/网络无法到达或者TTL超时的效果一样了，所以采用31338这样一个非常不常用的端口来探测目标是否存活

```bash
nmap -PU 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-13 07:58 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.11 seconds
```

## -n

永不对它发现的活动IP地址进行反向域名解析

## -R

永远对目标IP地址作反向域名解析

## -sS

它发送一个SYN报文，收到SYN/ACK表示端口在监听(开放)，收到RST(复位)表示端口关闭。如果数次重发后仍没响应或收到ICMP不可到达错误(类型3，代码1，2，3，9，10，或者13)，该端口就被标记为被过滤。

```bash
nmap -sS 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-14 08:50 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.10 seconds
```

## -sU

UDP扫描发送空的(没有数据)UDP报头到每个目标端口。 如果返回ICMP端口不可到达错误(类型3，代码3)，该端口是关闭的。不响应或者收到ICMP不可到达错误(类型3， 代码1，2，9，10，或者13)表明该端口是open|filtered(开放|过滤)。UDP端口扫描特别慢，建议针对特定端口进行扫描。

```bash
nmap -sU -p 67-68 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-14 09:51 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000028s latency).

PORT   STATE  SERVICE
67/udp closed dhcps
68/udp closed dhcpc

Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds
```

## -sA

探测报文只设置ACK标志位。当扫描未被过滤的系统时，open和closed端口都会返回RST报文。Nmap把它们标记为unfiltered，不响应的端口或者发送特定的ICMP错误消息(类型3，代号1，2，3，9，10， 或者13)的端口，标记为filtered。主要用于发现防火墙规则，确定它们是有状态的还是无状态的，哪些端口是被过滤的

```bash
nmap -sA 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-14 09:57 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
All 1000 scanned ports on localhost (127.0.0.1) are unfiltered

Nmap done: 1 IP address (1 host up) scanned in 0.09 seconds
```

## -p <port ranges>

该选项指明您想扫描的端口

```bash
nmap -p 22,80-82 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-15 14:38 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000026s latency).

PORT   STATE  SERVICE
22/tcp open   ssh
80/tcp closed http
81/tcp closed hosts2-ns
82/tcp closed xfer

Nmap done: 1 IP address (1 host up) scanned in 0.08 seconds
```

## -r

默认情况下，Nmap按随机顺序扫描端口(除了出于效率的考虑，常用的端口前移)。这种随机化通常都是受欢迎的，但您也可以指定-r来顺序端口扫描。

```bash
nmap -r 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-15 14:42 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.10 seconds
```

## -sV

打开服务版本检测，可以使用-A参数来同时使用操作系统检测和版本检测。

```bash
nmap -sV 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 02:07 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.8p1 Debian 1 (protocol 2.0)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.43 seconds
```

## -O

打开操作系统检测，可以使用-A参数来同时使用操作系统检测和版本检测。

```bash
nmap -O 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 02:10 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000044s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
Device type: general purpose
Running: Linux 3.X
OS CPE: cpe:/o:linux:linux_kernel:3
OS details: Linux 3.7 - 3.10
Network Distance: 0 hops

OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 3.43 seconds
```

## -T

Nmap提供了一些简单的方法，使用6个时间模板，使用时采用-T选项及数字(0 - 5)或名称。模板名称有paranoid(0)、sneaky(1)、polite(2)、normal(3)、aggressive(4)和insane(5)。前两种模式用于IDS躲避，Polite模式降低了扫描速度以使用更少的带宽和目标主机资源。默认模式为Normal，因此-T3实际上是未做任何优化。Aggressive模式假设用户具有合适及可靠的网络从而加速扫描。Insane模式假设用户具有特别快的网络或者愿意为获得速度而牺牲准确性。

- T0选项的主要影响是对于连续扫描，在一个时间只能扫描一个端口，每个探测报文的发送间隔为5分钟。
- T1和T2选项比较类似，探测报文间隔分别为15秒和0.4秒。
- T3是Nmap的默认选项，包含了并行扫描。
- T4选项与 --max-rtt-timeout 1250 --initial-rtt-timeout 500等价，最大TCP扫描延迟为10ms。
- T5等价于 --max-rtt-timeout 300 --min-rtt-timeout 50 --initial-rtt-timeout 250 --host-timeout 900000，最大TCP扫描延迟为5ms。

以上命令详细解释[点击这里](https://nmap.org/man/zh/man-performance.html)

```bash
nmap -T2 -p 80-90 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 02:54 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000042s latency).

PORT   STATE  SERVICE
80/tcp closed http
81/tcp closed hosts2-ns
82/tcp closed xfer
83/tcp closed mit-ml-dev
84/tcp closed ctf
85/tcp closed mit-ml-dev
86/tcp closed mfcobol
87/tcp closed priv-term-l
88/tcp closed kerberos-sec
89/tcp closed su-mit-tg
90/tcp closed dnsix

Nmap done: 1 IP address (1 host up) scanned in 4.83 seconds
```

## -f

使用一次该参数，就会将探测的数据包以8的次方的字节数分段(减少分段数量)。

```bash
nmap -f -f 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:06 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000010s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.17 seconds
```

## --mtu

使用--mtu选项可以自定义偏移的大小，使用时不需要-f，偏移量必须是8的倍数。

```bash
nmap --mtu 16 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:11 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000010s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.16 seconds
```

## --source-port <portnumber>;-g <portnumber>

提供一个端口号，Nmap就可以从这些端口发送探测数据，多数防火墙不会过滤来自外部的53(DNS)或67(DHCP)的UDP包和88(Kerberos)的TCP及UDP包。

```bash
nmap --source-port 88 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:23 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000014s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.14 seconds
```

## --data-length <number>

正常情况下，Nmap发送最少的报文，只含一个包头。因此TCP包通常是40字节，ICMP ECHO请求只有28字节。这个选项告诉Nmap在发送的报文上附加指定数量的随机字节。操作系统检测(-O)包不受影响，但大部分ping和端口扫描包受影响，这会使处理变慢，但对扫描的影响较小。

```bash
nmap --data-length 80 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:30 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000040s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.18 seconds
```

## --spoof-mac <mac address，prefix，or vendor name>

MAC地址有几种格式。如果简单地使用字符串“0”，Nmap选择一个完全随机的MAC 地址。如果给定的字符品是一个16进制偶数(使用:分隔)，Nmap将使用这个MAC地址。如果是小于12的16进制数字，Nmap会随机填充剩下的6个字节。如果参数不是0或16进制字符串，Nmap将通过nmap-mac-prefixes查找厂商的名称(大小写区分)，如果找到匹配，Nmap将使用厂商的OUI(3字节前缀)，然后随机填充剩余的3个节字。正确的--spoof-mac参数有：Apple，0，01:02:03:04:05:06，deadbeefcafe，0020F2，和Cisco。

```bash
nmap --spoof-mac apple 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:35 ESTSpoofing MAC address 00:03:93:FA:11:DD (Apple)
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.39 seconds
```

## -oN <filespec>
将标准输出直接写入指定的文件

```bash
nmap -oN result.txt

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:40 EST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.33 seconds

cat result.txt

# Nmap 7.70 scan initiated Mon Dec 17 07:40:05 2018 as: nmap -oN result.txt 127.0.0.1
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

# Nmap done at Mon Dec 17 07:40:05 2018 -- 1 IP address (1 host up) scanned in 0.33 seconds
```
   
## -oX <filespec>
将XML输出直接写入指定的文件

```bash
nmap -oX result.txt 127.0.0.1

Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-17 07:42 EST
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000050s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

Nmap done: 1 IP address (1 host up) scanned in 0.31 seconds

cat result.txt

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE nmaprun>
<?xml-stylesheet href="file:///usr/bin/../share/nmap/nmap.xsl" type="text/xsl"?>
<!-- Nmap 7.70 scan initiated Mon Dec 17 07:42:05 2018 as: nmap -oX result.txt 127.0.0.1 -->
<nmaprun scanner="nmap" args="nmap -oX result.txt 127.0.0.1" start="1545050525" startstr="Mon Dec 17 07:42:05 2018" version="7.70" xmloutputversion="1.04">
<scaninfo type="syn" protocol="tcp" numservices="1000" services="1,3-4,6-7,9,13,17,19-26,30,32-33,37,42-43,49,53,70,79-85,88-90,99-100,106,109-111,113,119,125,135,139,143-144,146,161,163,179,199,211-212,222,254-256,259,264,280,301,306,311,340,366,389,406-407,416-417,425,427,443-445,458,464-465,481,497,500,512-515,524,541,543-545,548,554-555,563,587,593,616-617,625,631,636,646,648,666-668,683,687,691,700,705,711,714,720,722,726,749,765,777,783,787,800-801,808,843,873,880,888,898,900-903,911-912,981,987,990,992-993,995,999-1002,1007,1009-1011,1021-1100,1102,1104-1108,1110-1114,1117,1119,1121-1124,1126,1130-1132,1137-1138,1141,1145,1147-1149,1151-1152,1154,1163-1166,1169,1174-1175,1183,1185-1187,1192,1198-1199,1201,1213,1216-1218,1233-1234,1236,1244,1247-1248,1259,1271-1272,1277,1287,1296,1300-1301,1309-1311,1322,1328,1334,1352,1417,1433-1434,1443,1455,1461,1494,1500-1501,1503,1521,1524,1533,1556,1580,1583,1594,1600,1641,1658,1666,1687-1688,1700,1717-1721,1723,1755,1761,1782-1783,1801,1805,1812,1839-1840,1862-1864,1875,1900,1914,1935,1947,1971-1972,1974,1984,1998-2010,2013,2020-2022,2030,2033-2035,2038,2040-2043,2045-2049,2065,2068,2099-2100,2103,2105-2107,2111,2119,2121,2126,2135,2144,2160-2161,2170,2179,2190-2191,2196,2200,2222,2251,2260,2288,2301,2323,2366,2381-2383,2393-2394,2399,2401,2492,2500,2522,2525,2557,2601-2602,2604-2605,2607-2608,2638,2701-2702,2710,2717-2718,2725,2800,2809,2811,2869,2875,2909-2910,2920,2967-2968,2998,3000-3001,3003,3005-3007,3011,3013,3017,3030-3031,3052,3071,3077,3128,3168,3211,3221,3260-3261,3268-3269,3283,3300-3301,3306,3322-3325,3333,3351,3367,3369-3372,3389-3390,3404,3476,3493,3517,3527,3546,3551,3580,3659,3689-3690,3703,3737,3766,3784,3800-3801,3809,3814,3826-3828,3851,3869,3871,3878,3880,3889,3905,3914,3918,3920,3945,3971,3986,3995,3998,4000-4006,4045,4111,4125-4126,4129,4224,4242,4279,4321,4343,4443-4446,4449,4550,4567,4662,4848,4899-4900,4998,5000-5004,5009,5030,5033,5050-5051,5054,5060-5061,5080,5087,5100-5102,5120,5190,5200,5214,5221-5222,5225-5226,5269,5280,5298,5357,5405,5414,5431-5432,5440,5500,5510,5544,5550,5555,5560,5566,5631,5633,5666,5678-5679,5718,5730,5800-5802,5810-5811,5815,5822,5825,5850,5859,5862,5877,5900-5904,5906-5907,5910-5911,5915,5922,5925,5950,5952,5959-5963,5987-5989,5998-6007,6009,6025,6059,6100-6101,6106,6112,6123,6129,6156,6346,6389,6502,6510,6543,6547,6565-6567,6580,6646,6666-6669,6689,6692,6699,6779,6788-6789,6792,6839,6881,6901,6969,7000-7002,7004,7007,7019,7025,7070,7100,7103,7106,7200-7201,7402,7435,7443,7496,7512,7625,7627,7676,7741,7777-7778,7800,7911,7920-7921,7937-7938,7999-8002,8007-8011,8021-8022,8031,8042,8045,8080-8090,8093,8099-8100,8180-8181,8192-8194,8200,8222,8254,8290-8292,8300,8333,8383,8400,8402,8443,8500,8600,8649,8651-8652,8654,8701,8800,8873,8888,8899,8994,9000-9003,9009-9011,9040,9050,9071,9080-9081,9090-9091,9099-9103,9110-9111,9200,9207,9220,9290,9415,9418,9485,9500,9502-9503,9535,9575,9593-9595,9618,9666,9876-9878,9898,9900,9917,9929,9943-9944,9968,9998-10004,10009-10010,10012,10024-10025,10082,10180,10215,10243,10566,10616-10617,10621,10626,10628-10629,10778,11110-11111,11967,12000,12174,12265,12345,13456,13722,13782-13783,14000,14238,14441-14442,15000,15002-15004,15660,15742,16000-16001,16012,16016,16018,16080,16113,16992-16993,17877,17988,18040,18101,18988,19101,19283,19315,19350,19780,19801,19842,20000,20005,20031,20221-20222,20828,21571,22939,23502,24444,24800,25734-25735,26214,27000,27352-27353,27355-27356,27715,28201,30000,30718,30951,31038,31337,32768-32785,33354,33899,34571-34573,35500,38292,40193,40911,41511,42510,44176,44442-44443,44501,45100,48080,49152-49161,49163,49165,49167,49175-49176,49400,49999-50003,50006,50300,50389,50500,50636,50800,51103,51493,52673,52822,52848,52869,54045,54328,55055-55056,55555,55600,56737-56738,57294,57797,58080,60020,60443,61532,61900,62078,63331,64623,64680,65000,65129,65389"/>
<verbose level="0"/>
<debugging level="0"/>
<host starttime="1545050525" endtime="1545050525"><status state="up" reason="localhost-response" reason_ttl="0"/>
<address addr="127.0.0.1" addrtype="ipv4"/>
<hostnames>
<hostname name="localhost" type="PTR"/>
</hostnames>
<ports><extraports state="closed" count="999">
<extrareasons reason="resets" count="999"/>
</extraports>
<port protocol="tcp" portid="22"><state state="open" reason="syn-ack" reason_ttl="64"/><service name="ssh" method="table" conf="3"/></port>
</ports>
<times srtt="5" rttvar="0" to="100000"/>
</host>
<runstats><finished time="1545050525" timestr="Mon Dec 17 07:42:05 2018" elapsed="0.31" summary="Nmap done at Mon Dec 17 07:42:05 2018; 1 IP address (1 host up) scanned in 0.31 seconds" exit="success"/><hosts up="1" down="0" total="1"/>
</runstats>
</nmaprun>
```

## --append-output

在输出文件中添加，不覆盖文件中现有内容

```bash
nmap -oN result.txt --append-output 127.0.0.1

nmap -oN result.txt --append-output 127.0.0.1

cat result.txt

# Nmap 7.70 scan initiated Mon Dec 17 07:44:44 2018 as: nmap -oN result.txt --append-output 127.0.0.1
mass_dns: warning: Unable to determine any DNS servers. Reverse DNS is disabled. Try using --system-dns or specify valid servers with --dns-servers
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000060s latency).
Not shown: 999 closed ports
PORT   STATE SERVICE
22/tcp open  ssh

# Nmap done at Mon Dec 17 07:44:44 2018 -- 1 IP address (1 host up) scanned in 0.14 seconds
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE nmaprun>
<?xml-stylesheet href="file:///usr/bin/../share/nmap/nmap.xsl" type="text/xsl"?>
<!-- Nmap 7.70 scan initiated Mon Dec 17 07:44:49 2018 as: nmap -oX result.txt -&#45;append-output 127.0.0.1 -->
<nmaprun scanner="nmap" args="nmap -oX result.txt -&#45;append-output 127.0.0.1" start="1545050689"
startstr="Mon Dec 17 07:44:49 2018" version="7.70" xmloutputversion="1.04">
<scaninfo type="syn" protocol="tcp" numservices="1000" services="1,3-4,6-7,9,13,17,19-26,30,32-33,37,42-43,49,53,70,79-85,88-90,99-100,106,109-111,113,119,125,135,139,143-144,146,161,163,179,199,211-212,222,254-256,259,264,280,301,306,311,340,366,389,406-407,416-417,425,427,443-445,458,464-465,481,497,500,512-515,524,541,543-545,548,554-555,563,587,593,616-617,625,631,636,646,648,666-668,683,687,691,700,705,711,714,720,722,726,749,765,777,783,787,800-801,808,843,873,880,888,898,900-903,911-912,981,987,990,992-993,995,999-1002,1007,1009-1011,1021-1100,1102,1104-1108,1110-1114,1117,1119,1121-1124,1126,1130-1132,1137-1138,1141,1145,1147-1149,1151-1152,1154,1163-1166,1169,1174-1175,1183,1185-1187,1192,1198-1199,1201,1213,1216-1218,1233-1234,1236,1244,1247-1248,1259,1271-1272,1277,1287,1296,1300-1301,1309-1311,1322,1328,1334,1352,1417,1433-1434,1443,1455,1461,1494,1500-1501,1503,1521,1524,1533,1556,1580,1583,1594,1600,1641,1658,1666,1687-1688,1700,1717-1721,1723,1755,1761,1782-1783,1801,1805,1812,1839-1840,1862-1864,1875,1900,1914,1935,1947,1971-1972,1974,1984,1998-2010,2013,2020-2022,2030,2033-2035,2038,2040-2043,2045-2049,2065,2068,2099-2100,2103,2105-2107,2111,2119,2121,2126,2135,2144,2160-2161,2170,2179,2190-2191,2196,2200,2222,2251,2260,2288,2301,2323,2366,2381-2383,2393-2394,2399,2401,2492,2500,2522,2525,2557,2601-2602,2604-2605,2607-2608,2638,2701-2702,2710,2717-2718,2725,2800,2809,2811,2869,2875,2909-2910,2920,2967-2968,2998,3000-3001,3003,3005-3007,3011,3013,3017,3030-3031,3052,3071,3077,3128,3168,3211,3221,3260-3261,3268-3269,3283,3300-3301,3306,3322-3325,3333,3351,3367,3369-3372,3389-3390,3404,3476,3493,3517,3527,3546,3551,3580,3659,3689-3690,3703,3737,3766,3784,3800-3801,3809,3814,3826-3828,3851,3869,3871,3878,3880,3889,3905,3914,3918,3920,3945,3971,3986,3995,3998,4000-4006,4045,4111,4125-4126,4129,4224,4242,4279,4321,4343,4443-4446,4449,4550,4567,4662,4848,4899-4900,4998,5000-5004,5009,5030,5033,5050-5051,5054,5060-5061,5080,5087,5100-5102,5120,5190,5200,5214,5221-5222,5225-5226,5269,5280,5298,5357,5405,5414,5431-5432,5440,5500,5510,5544,5550,5555,5560,5566,5631,5633,5666,5678-5679,5718,5730,5800-5802,5810-5811,5815,5822,5825,5850,5859,5862,5877,5900-5904,5906-5907,5910-5911,5915,5922,5925,5950,5952,5959-5963,5987-5989,5998-6007,6009,6025,6059,6100-6101,6106,6112,6123,6129,6156,6346,6389,6502,6510,6543,6547,6565-6567,6580,6646,6666-6669,6689,6692,6699,6779,6788-6789,6792,6839,6881,6901,6969,7000-7002,7004,7007,7019,7025,7070,7100,7103,7106,7200-7201,7402,7435,7443,7496,7512,7625,7627,7676,7741,7777-7778,7800,7911,7920-7921,7937-7938,7999-8002,8007-8011,8021-8022,8031,8042,8045,8080-8090,8093,8099-8100,8180-8181,8192-8194,8200,8222,8254,8290-8292,8300,8333,8383,8400,8402,8443,8500,8600,8649,8651-8652,8654,8701,8800,8873,8888,8899,8994,9000-9003,9009-9011,9040,9050,9071,9080-9081,9090-9091,9099-9103,9110-9111,9200,9207,9220,9290,9415,9418,9485,9500,9502-9503,9535,9575,9593-9595,9618,9666,9876-9878,9898,9900,9917,9929,9943-9944,9968,9998-10004,10009-10010,10012,10024-10025,10082,10180,10215,10243,10566,10616-10617,10621,10626,10628-10629,10778,11110-11111,11967,12000,12174,12265,12345,13456,13722,13782-13783,14000,14238,14441-14442,15000,15002-15004,15660,15742,16000-16001,16012,16016,16018,16080,16113,16992-16993,17877,17988,18040,18101,18988,19101,19283,19315,19350,19780,19801,19842,20000,20005,20031,20221-20222,20828,21571,22939,23502,24444,24800,25734-25735,26214,27000,27352-27353,27355-27356,27715,28201,30000,30718,30951,31038,31337,32768-32785,33354,33899,34571-34573,35500,38292,40193,40911,41511,42510,44176,44442-44443,44501,45100,48080,49152-49161,49163,49165,49167,49175-49176,49400,49999-50003,50006,50300,50389,50500,50636,50800,51103,51493,52673,52822,52848,52869,54045,54328,55055-55056,55555,55600,56737-56738,57294,57797,58080,60020,60443,61532,61900,62078,63331,64623,64680,65000,65129,65389"/>
<verbose level="0"/>
<debugging level="0"/>
<host starttime="1545050689" endtime="1545050689"><status state="up" reason="localhost-response" reason_ttl="0"/>
<address addr="127.0.0.1" addrtype="ipv4"/>
<hostnames>
<hostname name="localhost" type="PTR"/>
</hostnames>
<ports><extraports state="closed" count="999">
<extrareasons reason="resets" count="999"/>
</extraports>
<port protocol="tcp" portid="22"><state state="open" reason="syn-ack" reason_ttl="64"/><service name="ssh" method="table" conf="3"/></port>
</ports>
<times srtt="6" rttvar="0" to="100000"/>
</host>
<runstats><finished time="1545050689" timestr="Mon Dec 17 07:44:49 2018" elapsed="0.27" summary="Nmap done at Mon Dec 17 07:44:49 2018; 1 IP address (1 host up) scanned in 0.27 seconds" exit="success"/><hosts up="1" down="0" total="1"/>
</runstats>
</nmaprun>
```