Title: Some Basic Networking Concepts
Date: 2023-11-17
Category: Networking
Tags: Networking, IP, MAC, Router
Slug: networking-some-concepts
Keywords: Networking
Authors: Alireza Miryazdi
Summary: Some networking concepts I had to learn and consolidate for a task in a software company.

## Part 1 - Some Questions and Answers
### What are the private IP addresses?

Internal addresses within a closed network, that are non-routable from clients outside it. They are unique within the network, but differenxt networks can have the same private address, unlike a public IP address that is unique globally.  
The addresses below (IPv4) are designated as private, and are chosen for networks of different sizes, from large to small (see also [Subnet Mask](#what-is-subnet-mask)):  
- 10.0.0.0/8  
- 172.16.0.0/12  
- 192.168.0.0/16  
### What is Subnet Mask?  

Subnet masks are used to create subnetworks within larger IP networks, allowing efficient allocation of IP addresses and improved network management.  
In short, it specifies the valid network IP ranges within the network.  

**An example**:  
172.27.76.0/22 shows a network in CIDR format which is equivalent to a netmask of `255.255.252.0`, and specifies IP addresses in the range `172.27.76.1` to `172.27.79.255`. The final address specifies a **broadcast** address, which can be used to broadcast to all devices in the network.  
### What is Port?  

Number assigned to uniquely identify a connection endpoint and to direct data to a specific service. At the software level, within an operating system. All valid port numbers are in the range `0-65535`, with some being commonly used for specific types of software.  
### What is Port forwarding?  

An intercepting application/device reads the packet header, notes the destination, and then rewrites the header information and sends it to another computer, one that’s different from the one intended. The destination can also have a different port than the one intended.  

Port forwarding can also be used to enable remote access to services hosted on private networks.  
An example of post forwarding can happen when using Docker (software level) and by some network routers (hardware-level).  
### What is Router?  

A router is a physical or virtual appliance that passes information between two or more packet-switched computer networks -- analyzing a given data packet's destination IP address, calculating the best way for it to reach that destination, and then forwarding it accordingly.  
A router is different from a modem; a router forms networks and manages the flow of data within and between those networks, while a modem connects those networks to the internet. A single device may plug into a modem in order to connect to the internet, while a router can help distribute this signal to multiple devices within an established network and allow all of them to access the internet.  
### Difference between Switch and Hub  

A hub is simply a multiport Ethernet repeater that operates at the physical level (layer 1). When the hub receives information from a sending device, it simply repeats, or broadcasts, that same information out all ports on the hub.  
To fix the problem of all connected devices receiving the same broadcast (which is a problem for large networks), the network switch is used.  
- Firstly, a switch segments the network into multiple logical LANs known as VLANs, which reduces broadcast congestion on a larger network by breaking up the broadcast procedure.  
- Secondly, a layer 2 switch can maintain a list of a switch port number along with the MAC address of the device connected to it. This way, if the switch knows the specific port that the MAC address corresponds to, it is sent only out that port as a Unicast frame.  
### What is DNS?

DNS translates domain names to IP addresses, so browsers can load Internet resources. DNS servers eliminate the need for humans to memorize IP addresses such as 192.168.1.1 (in IPv4), or more complex newer alphanumeric IP addresses such as 2400:cb00:2048:1::c629:d7a2 (in IPv6).  

  ### What is Gateway?

Also known as a protocol converter. It connects the computers of one network to another and defines the boundaries of the network. If two networks with different protocols want to be connected to each other, both networks need to have gateways that provide a point of presence and entry for computers from both networks to communicate.  

In other words, gateways can join different systems.  
### What is DHCP?  

Protocol, mainly for assigning IP address to devices in a private network.
The DHCP server manages requests for IP addresses from the network and keeps a record of all the IP addresses it assigns and to which devices it assigns them. It also maintains an IP address pool to choose from.  
The DHCP can tell different devices on the network apart using their MAC. In most home internet setups, the DHCP server is implemented inside the router.  
### Difference between TCP and UDP  

- **Connection Versus Connectionless**  
	In TCP/IP, the two ends of the communication link must be connected at all times during the communication. An application using UDP prepares a packet and sends it to the receiver's address without first checking to see if the receiver is ready to receive a packet, hence the packet may get lost.  
- **Stream Versus Packet**  
	The TCP/IP stack is responsible for breaking the stream of data into packets and sending those packets, while the stack at the other end is responsible for reassembling the packets into a data stream using information in the packet headers. UDP, on the other hand, is a packet-oriented protocol where the application itself divides the data into packets and sends them to the other end.  
- **Reliability**  
	The packets that are sent by TCP/IP contain a unique sequence number. This helps with retransmitting lost packets, and reconstructing the packets in correct order.  
### Difference between Bandwidth and Latency 

Throughput is also covered, since it is very relevant to the other two.  

- Bandwidth is the maximum amount of data that can be transferred in a given amount of time. There are two pieces to bandwidth: upload speed and download speed.  
- Latency refers to how long it takes for data to travel from one point to another. This is also referred to as ping time or lag.  
- Throughput is how much data was transferred in that amount of time, while bandwidth is how much data could be transferred. In other words, throughput is what actually happened while bandwidth is the theoretical prediction.  
**An analogy**:
Think of a highway (bandwidth) with a toll booth (latency). The highway has a certain maximum capacity, like a network's bandwidth. The toll booth adds a delay, similar to network latency. The actual number of cars passing through the toll booth per hour represents throughput, which can be lower than the highway's maximum capacity due to the toll booth's delay.  
### What is a MAC address?

Like each house has its own postal address, every device has a Media Access Control (MAC) address assigned to it by the manufacturer, that uniquely identifies it in any network it is connected to.  
Depending on the hardware manufacturer, a MAC address could even expose information about the model of the device, but there are tools to spoof it as well.  

### How a web browser behaves when a user types "https://www.google.com" in the browser from a network perspective 

Based on the previous content in this article, and other content, here is an overview of what happens when you type that address in a browser within your **home router**'s domain:  
1. Local Device Lookup: The browser first checks its local cache to see if it already has the IP address for "www.google.com". This IP address is like the postal address for the website on the internet.  
	- If the address wasn't in browser cache, the browser then asks the Operating System to find the IP address. The OS checks its own cache.
	- If the address wasn't in OS cache, the OS looks at the local DNS resolver specified in its network settings. This is usually the IP address of your home router. The router checks its cache.
	- If the address wasn't in the router's cache, it forwards the DNS query to the DNS server configured in its settings. This is known as a recursive DNS server (one such as the commonly used 8.8.8.8).
	- The recursive DNS server first checks its cache. If the address is not cached already, it asks for help from the authoritative DNS hierarchy.
		1. Since Google uses the .com domain, the DNS server first asks the root domain nameserver for the IP address of the .com TLD server.  
		2. The recursive DNS server asks the TLD authoritative server where it can find the authoritative DNS server for www.google.com.  
		3. Finally, The authoritative server for www.google.com is asked where to find www.google.com. The result is returned to the user.  
2. TCP Connection: With the IP address known, the browser initiates a three-way TCP handshake with Google to establish a TCP connection. This involves sending a SYN packet and receiving a SYN-ACK packet in return, followed by sending an ACK packet back to the server.  
3. TLS Handshake: Since the URL uses "https", a secure connection is required. The browser starts a TLS handshake with Google servers. This involves exchanging cryptographic keys and certificates to establish a secure connection.  
4. HTTP Request: The browser sends an HTTP GET request over the secure connection to request the webpage at "www.google.com". This request is sent to a specific port, usually port 80 for HTTP or 443 for HTTPS.  
5. NAT Translation: The router translates the private IP address of your computer to its own public IP address for all outbound packets, and keeps track of these translations in a NAT table. When it receives packets back from the Google, it uses the NAT table to translate the destination address back to the private IP address of your computer.  
### Sources

[router](https://www.cloudflare.com/learning/network-layer/what-is-a-router/) 
[port forwarding](https://whatismyipaddress.com/port-forwarding) and [ports](https://whatismyipaddress.com/port)  
[ip/cidr/netmask](https://jodies.de/ipcalc)  
[netmask](https://avinetworks.com/glossary/subnet-mask)  
[private IPs](https://www.techtarget.com/whatis/definition/private-IP-address)   
[DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)  
[DNS](https://umbrella.cisco.com/blog/what-is-the-difference-between-authoritative-and-recursive-dns-nameservers)   
[router/gateway](https://community.fs.com/article/router-vs-gateway-what-is-the-similarity-and-difference.html)  
[router/switch/hub](https://www.techtarget.com/searchnetworking/answer/Difference-between-a-router-switch-and-a-hub)   
[DHCP](https://whatismyipaddress.com/dhcp)   
[TCP/UDP](https://www.mathworks.com/help/instrument/tcpip-and-udp-comparison.html)   
[throughput/latency](https://aws.amazon.com/compare/the-difference-between-throughput-and-latency/)   
[bandwidth/latency](https://www.earthlink.net/blog/bandwidth-vs-latency/)  

## Part 2 - System Info With Bash  
Won't work for all systems, so not really valuable.

```bash
#!/bin/bash

# CPU
cpu_model_name=$(lscpu | grep "^Model name" | awk '{print $NF}'
cpu_clock_speed=$(lscpu | grep "^CPU MHz" | awk '{print $NF}'
cpu_core_count=$(lscpu | grep "^CPU(s)" | awk '{print $NF}'

# Memory
memory_total=$(free -mh | grep Mem | awk '{print $2}')
memory_used=$(free -mh | grep Mem | awk '{print $3}')
memory_free=$(free -mh | grep Mem | awk '{print $4}')

# Disk
disk_total=$(df -h / | tail -1 | awk '{print $2}')
disk_used=$(df -h / | tail -1 | awk '{print $3}')
disk_free=$(df -h / | tail -1 | awk '{print $4}')

# Network
network_ip=$(hostname -I | awk '{print $1}')
network_gateway=$(route -n | grep '^0.0.0.0' | awk '{print $2}') 
network_dns=$(cat /etc/resolv.conf | grep 'nameserver' | awk '{print $2}')

echo
echo "CPU     - model name: $cpu_model_name clock speed: $cpu_clock_speed core count: $cpu_core_count"
echo "Memory  - total size: $memory_total used size: $memory_used free size: $memory_free"
echo "Disk    - total size: $disk_total used size: $disk_used free size: $disk_free"
echo "Network - IP address: $network_ip gateway: $network_gateway dns server: $network_dns"
echo

if [[ -z $network_dns ]]
then
  exit 1
fi
```
