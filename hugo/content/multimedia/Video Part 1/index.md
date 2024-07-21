---
title: Video Basics Part 1 - Intro & Short History
date: 2024-07-21
lastmod: 2024-07-21
draft: false
author: Alireza Miryazdi
# Common-Defined params
summary: First part of series on Video-related concepts that I've learned and am learning over time.
categories: 
  - Multimedia
  - Video
  - History
tags: 
  - video
menu: main # Add page to a menu. Options: main, footer
# Theme-Defined params
comments: true # Enable/disable Disqus comments for specific page
authorbox: true # Enable/disable Authorbox for specific page
toc: true # Enable/disable Table of Contents for specific page
tocOpen: true # Open Table of Contents block for specific page
mathjax: true # Enable/disable MathJax for specific page
related: true # Enable/disable Related content for specific page
meta: 
  - date
  - categories
  - tags
---

Part of a series discussing video-related concepts. It is mostly an aggregation of different topics from different sources, with additions to make it easier to understand (for me personally).

I have tried to link to the sources as much as I could, but I may have missed something. In that case, please contact me :D

## Introduction

Video is a time-ordered sequence of frames, or images. A frame is a 2D buffer of pixels (spatial dimension), and the time aspect denotes a temporal dimension.

Modern LCD and LED displays represent images by their Red, Green and Blue colors (RGB). Let's continue with an example to visualize how much information is stored in a video. You might have heard the term *8-bit* color, which means each color component can have 8 bits or $2^8=256$ possible values. 

A *byte* is defined as 8 bits of data; therefore, in this case, each pixel has 3 bytes, for the red, green and blue components. We can do some basic calculations for the bytes required to store a raw 60 frames per second 1080p video:

$$
\begin{aligned}
	&\underset{\text{frames per second}}{60} \times \underset{\text{pixels per frame}}{1920 \times 1080} \times \underset{\text{bytes per pixel}}{3}
	\\ 
	&= 373248000 \text{ Bytes/s} \underset{\text{divide by 1E6}}{=} 373.248 \text{ MegaBytes/s}
\end{aligned}
$$

Which is a lot, for example, compared to something like USB 2.0 which supports at most 60 MB/s. We can also see now why compression is so important. Proper algorithms can give us the same perceptual quality at a fraction of the bytes.

## Short History

Three groups have been consistently involved in video compression. ITU-T, ISO and IEC. In recent years, the push for royalty-free options has introduced more choices, but this doesn't mean the patented stuff will be discarded anytime soon.  
For example, even H.264, which is getting pretty old at this point, is still being used by about 80% of video industry developers as of 2023 (down from about 90% in 2019 - source: [bitmovin](https://bitmovin.com/video-developer-report)). Even with the push for newer standards, it's safe to assume H.264 will still be used for many years to come.  
The schemes provided by these entities are usually just describing the compressed bitstream and providing some form of reference software for encoding/decoding. More performant variants and hardware encoding/decoding (using the GPU) are usually developed later on.  
Here is a basic timeline of the most common compression schemes in use today (source: mostly Wikipedia):

| Year/Author | ITU-T | ISO/IEC | ITU-T + ISO/IEC | Google | AOMedia |     Name     |                                                              Desc                                                               |
| :---------: | :---: | :-----: | :-------------: | :----: | :-----: | :----------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|    1989     |       |         |        ✓        |        |         |     JPEG     |       Joint Photographic Experts Group (JPEG) joint committee between ISO/IEC and ITU-T - release 1989 - still maintained       |
|    1991     |       |    ✓    |                 |        |         |    MPEG-1    |                                               Mp layer 3 (mp3) still used today!                                                |
|    1993     |   ✓   |         |                 |        |         |    H.261     |                          First truly practical digital video coding standard, essentially obsolete now                          |
|    1996     |   ✓   |         |                 |        |         |    H.263     |                                           Basis for the development of MPEG-4 Part 2                                            |
|    1996     |       |    ✓    |                 |        |         |    MPEG-2    |                                                        Still widely used                                                        |
|    1998     |       |    ✓    |        ✓        |        |         |    MPEG-4    |                                                        Still maintained                                                         |
|    2002     |       |    ✓    |                 |        |         |    MPEG-7    |                                                                                                                                 |
|    2004     |       |         |        ✓        |        |         | H.264 (AVC)  |                                                        Still widely used                                                        |
|    2008     |       |         |                 |   ✓    |         |     VP8      |                                        First attempt at royalty-free, ideas from H.263,4                                        |
|    2013     |       |         |        ✓        |        |         | H.265 (HEVC) |                                              Up to 50% better compression than AVC                                              |
|    2013     |       |         |                 |   ✓    |         |     VP9      |                              Comparable to H.265, performance not much better, partially patented                               |
|    2018     |       |         |                 |        |    ✓    |     AV1      | Used elements from Daala (Xiph.org), Thor (Cisco Systems), and VP10 (Google), royalty-free, resource heavy but good compression |
|    2020     |       |         |        ✓        |        |         | H.266 (VVC)  |                                             Up to 50% better compression than HEVC                                              |

Methods in use by each new scheme is motivated by the predecessors, and aims to build on what already exists. This makes each iteration better, but also means learning the latest technologies more difficult, as there is a lot to catch up on.  
Of course, this document doesn't even go into the compression methods used at all. Those are coming later~