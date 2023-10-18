Title: Differentiating Concurrent and Parallelism
Date: 2023-10-18
Category: Concurrency vs Parallelism
Tags: asyncio, concurrency, parallelism, multicore, multithreading, multiprocessing
Slug: concurrency-and-parallelism
Keywords: concurrency, parallelism
Authors: Alireza Miryazdi
Summary: Differentiating concurrency and parallelism is confusing without understanding the underlying concepts first. This article aims to give you a pretty good understanding of the core concepts of concurrency, how it is handled by different programming languages, and gives some generic guidelines on when to use which.

[source 1](https://www.howtogeek.com/194756/cpu-basics-multiple-cpus-cores-and-hyper-threading-explained/)  
[source 2](https://www.intel.com/content/www/us/en/gaming/resources/hyper-threading.html)  
[source 3](https://www.baeldung.com/cs/multithreading-vs-hyperthreading)  

[TOC]

There are in two concepts in software design:
- **Concurrency**: Multiple tasks that have the ability to run in an overlapping manner, also encapsulates parallelism
- **Parallelism**: Performing multiple operations at the same time  

Before we get more into it, we need to know just a little bit about the CPU architecture itself.

## CPU Architecture  

Pentium 4's of the day featured just a single CPU core, so it could only perform one task at a time - even if it were able to switch between tasks quickly enough that it seemed like multitasking.  

This switching between tasks is called **context switching**, In context switching, all the information from a process needs to be removed, and new information needs to be loaded. This can be expensive! The CPU does this because a long calculation or an IO-bound operation should not lock the CPU for all other pending operations.  

In modern CPUs, other concepts and features are also available:  

- **Cores**  
A mini CPU within the CPU. Processes in each core can run in parallel to the others.  
In the past, this would only be possible with having 2 separate CPUs connected to each other, but all the complexities and the cost of communication between them means they don't perform as well.

- **Hyper-Threading (Intel) or Simultaneous Multithreading (Others)**  
Each core can, itself, act as many cores. The CPU handles parallel tasks within the same core, but it doesn't have the same throughput as having 2 separate cores.  

Hyper-threading can emulate multiple cores, even though they don't actually exist. In a computer with one CPU, 8 cores and each core having 2 threads, the OS effectively *sees* 16 CPUs!
### Some Questions  
- Q: Assume we have a single-core CPU with no hyper-threading, and another single-core CPU with hyper-threading. How do they perform differently?
	- In both, concurrency is still possible through context switching
	- In the CPU without hyper-threading, each time a context switch happens, all memory for the new process needs to be loaded.
	- In the hyper-threaded model, the OS sees two logical cores, and queues them both; memory for both processes is loaded into the CPU memory, and context switching is less expensive. Intel claims it increases performance speed by 30%.

- Q: Assume we have a single-core CPU with hyper-threading, and another dual-core CPU with no hyper-threading. How do they perform differently?
	- While they both appear the same to the OS, the CPU handles them differently.
	- The dual-core CPU is capable of parallelism: running two processes at the same time.
	- The hyper-threaded CPU is not capable of parallelism, only concurrency through context switching.
	- Note that context switching still happens in both, BUT in the dual-core model, there are two cores performing it.  

In practice, modern CPUs use a mixture of hyper-threading and multicore architectures, having the best of both worlds!

### Measuring CPU Performance  

These are applicable for a single-core CPU:
- IPC (Instruction Per Cycle/Clock) - How many things the CPU can do in one cycle.
- Clock Speed tells you how many cycles the CPU can complete in a second.
For example, while a CPU with a faster clock speed can complete more cycles in one second, a CPU with a higher IPC but lower clock speed might still be able to complete more tasks in one second.  

Multicore architectures and hyper-threading complicate things, so always consider **benchmarking on the architecture you are working on**, because the same program could run very differently on different CPUs. 

## Programming Concepts  

Now, this is where it gets tricky. Programmers and developers usually don't really know how their code is being run amongst the CPUs! Each programming language and OS handles concurrency and parallelism differently. 
In the OS, there is a concept of a **process**, that is different from a CPU process. An OS process can use multiple cores and threads and allows shared memory between them, but two different OS processes are not allowed to read memory from each other.  
Two separate OS processes can communicate through other means, like using IPC, shared files, etc. The important thing to note is that **the OS disallows different processes from accessing each other's memory**, and this makes complete sense! You wouldn't want note-taking app reading your banking app's data.  

Generally, though, these are the concepts that are present in most programming languages:

- **Asynchronous Programming**  
As discussed before, context switching can be expensive. Async programming seeks to give some control over "context switching", back to the developer. An example scenario would be:
	- The developer runs an event loop handling two actions on one thread instead of two threads handling two actions.
	- The developer needs to make sure each process doesn't lock up (especially in IO-bound tasks), so that the loop can be completed many times a second.
	- There is no need for synchronization primitives like mutexes, because the order of operations within the loop is predetermined.

- **Multithreaded Programming**  
Let the CPU and OS decide. This model requests a thread from the OS. The OS communicates with the CPU and gives the thread to the program. This way, the developer doesn't even need to worry about mixing IO-bound and CPU-bound tasks, because the CPU itself handles it through context switching and hyper-threading. Context switching can be expensive, though, especially if it happens often.  

It is possible to mix multithreaded and async models to achieve the best of both, for example using 8 threads, each with an event loop.

### Implementation  

How programming languages implement these concepts can be vastly different!

- **Python**  
Python is tricky because it uses something called GIL. Even in a multithreaded programming, all threads share the same interpreter lock, so parallelism isn't really possible in python when using multithreading from a single python interpreter.
Python also has a multiprocessing module, which basically creates a separate interpreter and GIL altogether within another OS process! This is good for CPU-bound tasks, but it makes communication between the processes expensive and restrictive, since they don't and can't share the same memory anymore.
Python also supports async programming.

- **Golang**  
Go handles concurrency natively. It utilizes something called "task stealing", which basically means giving the Go interpreter some control over when context switching happens. The problem is that the CPUs context switching is more expensive than if the programming language itself handles it.  
In Go's model, when an IO-bound task is happening in a goroutine, the Go runtime itself will "steal" the thread from that task and give it to another goroutine that needs it. This minimizes context switching within the Go runtime itself.  
Note that this doesn't mean context switching won't happen at all! For example, if another program is running on the same core, the CPU will still have to manage it, so one process isn't taking up the core completely.  

## Choosing  

When choosing between parallelism and concurrency, I found it helpful to ask myself some questions:  
```txt
1. Does my program benefit from out of order execution?
	1. No → None Needed
	2. Yes
		1. Is CPU bound (calculation-heavy)
			1. Many cores available? 
				1. No → Use sequential functions, concurrency introduces context switching and slows the code
				2. Yes → Use parallelism to utilize cores.
		2. Is I/O bound (file read/write)
			1. Many cores available?
				1. No → Use concurrency. Context switching is actually beneficial since waiting for I/O anyway.
				2. Yes → Use concurrency without parallelism. Parallelism doesn't give much of a boost (I/O blocks, either way)
```

After making the decision, research how it would be implemented in the specific programming language you are using. It might even be beneficial to think about specific sections of the code. For example, [GLib](https://docs.gtk.org/glib/threads.html) gives an example about using async instead of multithreading:

> A common use for GThreads is to move a long-running blocking operation out of the main thread and into a worker thread. **For GLib functions, such as single GIO operations, this is not necessary, and complicates the code. Instead, the `…_async()` version of the function should be used from the main thread, eliminating the need for locking and synchronization between multiple threads**. If an operation does need to be moved to a worker thread, consider using `g_task_run_in_thread()`, or a `GThreadPool`. `GThreadPool` is often a better choice than `GThread`, as it handles thread reuse and task queuing; `GTask` uses this internally.
   However, if multiple blocking operations need to be performed in sequence, and it is not possible to use `GTask` for them, moving them to a worker thread can clarify the code.

