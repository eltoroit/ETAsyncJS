/* eslint-disable no-console */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-alert */
import { LightningElement, track } from "lwc";

export default class DemoAsync extends LightningElement {
	@track stoppedA = false;
	@track stoppedB = false;
	@track stoppedC = false;
	@track failed = false;

	handleChangeA(event) {
		this.stoppedA = event.target.checked;
	}
	handleChangeB(event) {
		this.stoppedB = event.target.checked;
	}
	handleChangeC(event) {
		this.stoppedC = event.target.checked;
	}

	fail() {
		this.failed = true;
	}
	reset() {
		console.log("Reset");
		this.stoppedA = false;
		this.stoppedB = false;
		this.stoppedC = false;
		this.failed = false;
	}

	callback() {
		this.reset();
		console.log("Callback started");
		this.waitForToggleCallback("A", (whichOne, success) => {
			console.log(`${whichOne} completed: Success? ${success}`);
		});
		this.waitForToggleCallback("B", (whichOne, success) => {
			console.log(`${whichOne} completed: Success? ${success}`);
		});
		this.waitForToggleCallback("C", (whichOne, success) => {
			console.log(`${whichOne} completed: Success? ${success}`);
		});
	}
	promises() {
		this.reset();
		console.log("Promises started");
		this.waitForTogglePromise("A")
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
			})
			.catch(whichOne => {
				console.log(`${whichOne} completed: Success? FALSE`);
			});
		this.waitForTogglePromise("B")
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
			})
			.catch(whichOne => {
				console.log(`${whichOne} completed: Success? FALSE`);
			});
		this.waitForTogglePromise("C")
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
			})
			.catch(whichOne => {
				console.log(`${whichOne} completed: Success? FALSE`);
			});
	}
	async asyncAwait() {
		this.reset();
		console.log("Async/Await started");

		let whichOne;
		try {
			whichOne = await this.waitForTogglePromise("A");
			console.log(`${whichOne} completed: Success? TRUE`);
			whichOne = await this.waitForTogglePromise("B");
			console.log(`${whichOne} completed: Success? TRUE`);
			whichOne = await this.waitForTogglePromise("C");
			console.log(`${whichOne} completed: Success? TRUE`);
		} catch (ex) {
			console.log("Error", ex);
		}
	}
	promisesAll() {
		this.reset();
		console.log("All, any order");
		let promises = [];
		promises.push(this.waitForTogglePromise("A"));
		promises.push(this.waitForTogglePromise("B"));
		promises.push(this.waitForTogglePromise("C"));
		Promise.all(promises).then(values => {
			console.log(`${JSON.stringify(values)} completed: Success? TRUE`);
		});
	}
	callbackSerial() {
		this.reset();
		console.log("Callback serial");
		this.waitForToggleCallback("A", (whichOne1, success1) => {
			console.log(`${whichOne1} completed: Success? ${success1}`);
			this.waitForToggleCallback("B", (whichOne2, success2) => {
				console.log(`${whichOne2} completed: Success? ${success2}`);
				this.waitForToggleCallback("C", (whichOne3, success3) => {
					console.log(`${whichOne3} completed: Success? ${success3}`);
				});
			});
		});
	}
	promisesSerial() {
		this.reset();
		console.log("Promises serial");

		this.waitForTogglePromise("A")
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
				return this.waitForTogglePromise("B");
			})
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
				return this.waitForTogglePromise("C");
			})
			.then(whichOne => {
				console.log(`${whichOne} completed: Success? TRUE`);
			})
			.catch(whichOne => {
				console.log(`${whichOne} completed: Success? FALSE`);
			});
	}

	waitForToggleCallback(whichOne, callback) {
		const timer = setInterval(() => {
			const status = this.checkStatus(whichOne);
			if (status.complete) {
				clearInterval(timer);
				callback(whichOne, status.success);
			}
		}, 100);
	}

	waitForTogglePromise(whichOne) {
		return new Promise((resolve, reject) => {
			const timer = setInterval(() => {
				const status = this.checkStatus(whichOne);
				if (status.complete) {
					clearInterval(timer);
					if (status.success) {
						resolve(whichOne);
					} else {
						reject(whichOne);
					}
				}
			}, 100);
		});
	}

	checkStatus(whichOne) {
		let status = {
			complete: false,
			success: false
		};

		if (this.failed) {
			status.success = false;
			status.complete = true;
		} else {
			const check = {
				A: this.stoppedA,
				B: this.stoppedB,
				C: this.stoppedC
			};
			if (check[whichOne]) {
				status.success = true;
				status.complete = true;
			}
		}
		return status;
	}
}
