# Asynchronous JavaScript using Salesforce Lightning Web Components (LWC)

<p align="center">
	<img src="https://github.com/eltoroit/ETAsyncJS/blob/blog/@ELTOROIT/blog/HeaderImage.png?raw=true" alt="Asynchronous JavaScript using Salesforce Lightning Web Components (LWC)">
</p>

This week I was teaching [a class on LWC](https://trailhead.salesforce.com/en/academy/classes/dex602-programming-lightning-web-components/) in Chicago, IL and the students asked me about asynchronous JavaScript. Being such an important topic, I built a simple demo that I have cleaned a bit to explains the different ways to work with Asynchronous JavaScript from LWC.

This is the idea behind this simple demo: We have three operations (A, B, C) which can take any amount of time to complete, therefore we need to execute them asynchronously. As a matter of fact, you control when each of these processes finishes and in which order by toggling their button on the screen, or you can fail the operations to see the exception behavior.

I have created a repo for this SFDX project with the LWC code ([click here to view it](https://github.com/eltoroit/ETAsyncJS))

<p align="center">
	<a href="https://github.com/eltoroit/ETAsyncJS"><img src="https://github.com/eltoroit/ETAsyncJS/blob/blog/@ELTOROIT/blog/RepoLink.png?raw=true" alt="Visit Repo"></a>
</p>

The operations can be done in three different scenarios:

-   Any Order: The operations run in parallel and we can take some action when any of those finish in the order they are completing. The code can be written with Callbacks _anyOrderCallback()_, Promises _anyOrderPromises()_ but Async/Await can’t be used here.
-   Serial: The operations have to be completed in serial mode. We must complete A, before starting B, and finish B before starting C. The operation will only complete if the correct toggle is used. The code can be written with Callbacks _serialCallback()_, Promises _serialPromises()_ or Async/Await _serialAsyncAwait()_.
-   After All: This last operation can only be done with Promises _afterAllPromises()_. The idea is that we will wait until all the operations have completed, regardless of the order. This is a good technique if you want to download some files for example, and we do not care about the order in which they arrive, we only care that all of them have arrived.

I will now wait asynchronously for your feedback and comments :-)
