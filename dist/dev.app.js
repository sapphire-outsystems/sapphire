/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "011f1fb06b31fd9c3653";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app.js")(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./components/index.scss */ "./src/components/index.scss");

//Import all JS files
const requireAll = r => r.keys().forEach(r);
requireAll(__webpack_require__("./src/components sync recursive \\.js$"));


/***/ }),

/***/ "./src/components sync recursive \\.js$":
/*!***********************************!*\
  !*** ./src/components sync \.js$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./00-settings/config.js": "./src/components/00-settings/config.js",
	"./05-components/layout/layout-base.js": "./src/components/05-components/layout/layout-base.js",
	"./05-components/layout/layout-blank.js": "./src/components/05-components/layout/layout-blank.js",
	"./05-components/layout/layout-popup.js": "./src/components/05-components/layout/layout-popup.js",
	"./05-components/v3-pat/actions-menu/scripts.js": "./src/components/05-components/v3-pat/actions-menu/scripts.js",
	"./05-components/v3-pat/actions-sub-menu/scripts.js": "./src/components/05-components/v3-pat/actions-sub-menu/scripts.js",
	"./05-components/v3-pat/data-tables/scripts.js": "./src/components/05-components/v3-pat/data-tables/scripts.js",
	"./05-components/v3-pat/datetime-range-picker/scripts.js": "./src/components/05-components/v3-pat/datetime-range-picker/scripts.js",
	"./05-components/v3-pat/dropdown-categories/scripts.js": "./src/components/05-components/v3-pat/dropdown-categories/scripts.js",
	"./05-components/v3-pat/dropzone/plugin.js": "./src/components/05-components/v3-pat/dropzone/plugin.js",
	"./05-components/v3-pat/expandable-link/scripts.js": "./src/components/05-components/v3-pat/expandable-link/scripts.js",
	"./05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js": "./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js",
	"./05-components/v3-pat/generic-gallery/scripts.js": "./src/components/05-components/v3-pat/generic-gallery/scripts.js",
	"./05-components/v3-pat/horizontal-toolbar/scripts.js": "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js",
	"./05-components/v3-pat/hour-picker/scripts.js": "./src/components/05-components/v3-pat/hour-picker/scripts.js",
	"./05-components/v3-pat/input-with-clear/scripts.js": "./src/components/05-components/v3-pat/input-with-clear/scripts.js",
	"./05-components/v3-pat/location-box/scripts.js": "./src/components/05-components/v3-pat/location-box/scripts.js",
	"./05-components/v3-pat/main-interactive-card/scripts.js": "./src/components/05-components/v3-pat/main-interactive-card/scripts.js",
	"./05-components/v3-pat/menu-bar/scripts.js": "./src/components/05-components/v3-pat/menu-bar/scripts.js",
	"./05-components/v3-pat/multiple-selection-button/scripts.js": "./src/components/05-components/v3-pat/multiple-selection-button/scripts.js",
	"./05-components/v3-pat/panel/confirmation-panel.js": "./src/components/05-components/v3-pat/panel/confirmation-panel.js",
	"./05-components/v3-pat/panel/panel-by-id-notify.js": "./src/components/05-components/v3-pat/panel/panel-by-id-notify.js",
	"./05-components/v3-pat/panel/panel-by-id.js": "./src/components/05-components/v3-pat/panel/panel-by-id.js",
	"./05-components/v3-pat/panel/popup-menu.js": "./src/components/05-components/v3-pat/panel/popup-menu.js",
	"./05-components/v3-pat/panel/sapphire-panel.js": "./src/components/05-components/v3-pat/panel/sapphire-panel.js",
	"./05-components/v3-pat/panel/scripts.js": "./src/components/05-components/v3-pat/panel/scripts.js",
	"./05-components/v3-pat/patient-call-cancel/scripts.js": "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js",
	"./05-components/v3-pat/person-card/scripts.js": "./src/components/05-components/v3-pat/person-card/scripts.js",
	"./05-components/v3-pat/prescription-card/scripts.js": "./src/components/05-components/v3-pat/prescription-card/scripts.js",
	"./05-components/v3-pat/prescription-expandable/scripts.js": "./src/components/05-components/v3-pat/prescription-expandable/scripts.js",
	"./05-components/v3-pat/sapphire-header/scripts.js": "./src/components/05-components/v3-pat/sapphire-header/scripts.js",
	"./05-components/v3-pat/sapphire-radio-button/scripts.js": "./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js",
	"./05-components/v3-pat/section-expandable-custom/scripts.js": "./src/components/05-components/v3-pat/section-expandable-custom/scripts.js",
	"./05-components/v3-pat/section-expandable-inside/scripts.js": "./src/components/05-components/v3-pat/section-expandable-inside/scripts.js",
	"./05-components/v3-pat/select-system/scripts.js": "./src/components/05-components/v3-pat/select-system/scripts.js",
	"./05-components/v3-pat/shift-container/scripts.js": "./src/components/05-components/v3-pat/shift-container/scripts.js",
	"./05-components/v3-pat/sidebar/sidebar-structure.js": "./src/components/05-components/v3-pat/sidebar/sidebar-structure.js",
	"./05-components/v3-pat/spinner-horizontal/scripts.js": "./src/components/05-components/v3-pat/spinner-horizontal/scripts.js",
	"./05-components/v3-pat/spinner-vertical/scripts.js": "./src/components/05-components/v3-pat/spinner-vertical/scripts.js",
	"./05-components/v3-pat/split-button/scripts.js": "./src/components/05-components/v3-pat/split-button/scripts.js",
	"./05-components/v3-pat/ssd-component-block/scripts.js": "./src/components/05-components/v3-pat/ssd-component-block/scripts.js",
	"./05-components/v3-pat/ssd-list-line/scripts.js": "./src/components/05-components/v3-pat/ssd-list-line/scripts.js",
	"./05-components/v3-pat/tabs-extended/scripts.js": "./src/components/05-components/v3-pat/tabs-extended/scripts.js",
	"./05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js": "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js",
	"./globals.js": "./src/components/globals.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/components sync recursive \\.js$";

/***/ }),

/***/ "./src/components/00-settings/config.js":
/*!**********************************************!*\
  !*** ./src/components/00-settings/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

SapphireWidgets = window.SapphireWidgets = window.SapphireWidgets || {};


/***/ }),

/***/ "./src/components/05-components/layout/layout-base.js":
/*!************************************************************!*\
  !*** ./src/components/05-components/layout/layout-base.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutBase */
(function ($, window, document, SapphireWidgets) {

	var create = function (config) {
		window[config.widgetId] = new LayoutBase(config);
		SapphireWidgets.LayoutBase.widgetId = config.widgetId;
	};

	var openSidebarIframe = function (duration) {
		window[SapphireWidgets.LayoutBase.widgetId].openSidebarIframe(duration);
	};

	var closeSidebarIframe = function (duration) {
		window[SapphireWidgets.LayoutBase.widgetId].closeSidebarIframe(duration);
	};

	var scrollToElement = function ($element) {
		var $targetElement = $element;
		if (!!$targetElement.length) {
			var scrollToOffsetInterval;
			scrollToOffsetInterval = setInterval(function () {
				if (window[SapphireWidgets.LayoutBase.widgetId].getThresholds().secondaryThreshold > 0) {
					clearInterval(scrollToOffsetInterval);
					var targetElementOffsetTop = $targetElement.offset().top;
					var discount;
					if (!!$('.LayoutBase-emergency').text()) {
						if ($('.LayoutBase-secondary').hasClass('isFixed')) {
							targetElementOffsetTop += 150;
						} else {
							targetElementOffsetTop += 80;
						}
						discount = 390;
					} else {
						if ($('.LayoutBase-secondary').hasClass('isFixed')) {
							targetElementOffsetTop += 80;
						} else {
							targetElementOffsetTop += 20;
						}
						discount = 260;
					}

					$('body, html').scrollTop(targetElementOffsetTop - discount);
				}
			}, 250);
		}
	};

	var LayoutBase = function (config) {
		var _this = this;
		this.layoutBaseRedrawTimer = 0;
		this.hasHeader = config.hasHeader;
		this.isExpandable = config.isExpandable;
		this.isTopWindow = window.top === window.self ? true : false;
		this.$widget = $('#' + config.widgetId);
		this.$wrapper = this.$widget.find('.LayoutBase-Wrapper');
		this.$spacer = this.$widget.find('.LayoutBase-spacer');
		// this.$layoutBaseContent = this.$widget.find('.LayoutBase-Content');
		this.$mainMenu = this.$widget.find('.LayoutBase-MainMenu');
		this.$header = this.$widget.find('.LayoutBase-header');
		this.$headerBody = this.$widget.find('.SapphireHeader-body');
		this.$primaryMenu = this.$widget.find('.LayoutBase-primary-menu');
		this.$emergency = this.$widget.find('.LayoutBase-emergency');
		this.$secondary = this.$widget.find('.LayoutBase-secondary');
		this.$secondaryMenu = this.$widget.find('.LayoutBase-secondary-menu');
		this.$iframeSidebar = this.$widget.find('.LayoutBase-iframesidebar');
		this.$headerAdditionalContent = this.$widget.find('.SapphireHeader-additional-content');
		this.$topfixedContent = this.$widget.find('.LayoutBase-topfixedcontent');
		this.$bottomfixedContent = this.$widget.find('.LayoutBase-bottomfixedcontent');
		this.$mainContent = this.$widget.find('.LayoutBase-MainContent');
		this.extraPaddingEmergency = 0;
		this.extraPaddingSecondary = 0;
		// this.referenceHeight = null;
		this.setupWindowEvents();
		this.$iframeSidebar.append('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
		$(function () {
			$('body').addClass('LayoutBase');
			if (_this.isTopWindow) {
				$('body').css('overflow-y', 'scroll');
			}
		});
		$(window).load(function () {
			$(window).scroll();
			// _this.referenceHeight = $('body')[0].scrollHeight;
		})
	};

	LayoutBase.prototype.setupWindowEvents = function () {

		var _this = this;

		$(window).resize(function () {
			_this.updateThresholds();
			_this.handleOptionalContainers();
			_this.handleLayoutTopPadding();
			_this.handleLayoutBottomPadding();
		});

		$(window).scroll(function () {
			window.clearTimeout(_this.layoutBaseRedrawTimer);
			_this.layoutBaseRedrawTimer = window.setTimeout(function () {
				// console.log('=====');
				// console.log('window', $(window).height());
				// console.log('scrollheight', $('body')[0].scrollHeight);
				// console.log('referenceHeight', _this.referenceHeight);
				_this.updateThresholds();
				_this.handleOptionalContainers();
				_this.handleLayoutTopPadding();
				_this.handleLayoutBottomPadding();
			}, 100);
		});

	};

	LayoutBase.prototype.handleOptionalContainers = function () {
		var scrollTop = $(window).scrollTop();

		if (this.$emergency.length === 1) {
			if (scrollTop + this.contentThreshold > this.emergencyThreshold) {
				this.$emergency.addClass('isFixed');
				this.$emergency.css({
					top: this.contentThreshold,
					width: this.$header.width(),
				});
				this.extraPaddingEmergency = this.$emergency.outerHeight(true);
			} else {
				this.$emergency.removeClass('isFixed');
				this.$emergency.css({
					top: 'auto',
					width: '100%',
				});
				this.extraPaddingEmergency = 0;
			}
		}

		if (this.$secondary.length === 1 && this.$secondary.text().length > 0) {

			if (this.$secondaryMenu.text().length === 0) {
				this.$secondary.addClass('noToolbar');
			}

			if (scrollTop + this.contentThreshold + (this.$emergency.outerHeight(true) || 0) > this.secondaryThreshold) {
				this.$secondary.addClass('isFixed').css({
					top: this.contentThreshold + (this.$emergency.outerHeight(true) || 0),
					width: this.$header.width(),
				});
				this.$secondary.find('.Button.Second, .Button.Third').not('.Panel .Button.Small, .Panel .Button.Third').addClass('Small');
				if (this.$secondary.find('.Toolbar').length === 1) {
					var targetToolbarWidth = $('.SapphireHeader').outerWidth(true) * 0.66;
					this.$secondary.find('.Toolbar').width(targetToolbarWidth);
				}
				if (this.$secondaryMenu.text().length === 0) {
					this.$secondary.addClass('noToolbar');
				}
				this.$primaryMenu.css('opacity', 0);
				this.extraPaddingSecondary = this.$secondary.outerHeight(true);

				// //
				// var currentHeight = $('body')[0].scrollHeight;
				// var compensation = this.referenceHeight - currentHeight;
				// console.log(compensation);

				// if (compensation <= 0) {
				// 	// this.$layoutBaseContent.css('padding-bottom', '');
				// } else {
				// 	this.$layoutBaseContent.css('padding-bottom', compensation);
				// }



			} else {

				// this.$layoutBaseContent.css('padding-bottom', '');

				this.$secondary.removeClass('isFixed').css({
					top: 'auto',
					width: '100%',
				});
				this.$secondary.find('.Button.Second, .Button.Third').removeClass('Small');
				this.$primaryMenu.css('opacity', 1);
				this.$secondary.css({
					height: 'unset',
				});
				this.$secondary.find('.Toolbar').css('width', '100%');
				this.extraPaddingSecondary = 0;
			}

			if (this.$secondaryMenu.text().length > 0) {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', 'unset');
			} else {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', -this.$secondary.outerHeight(true));
				this.$secondaryMenu.css('background-color', 'transparent');
			}
		}
	};

	LayoutBase.prototype.handleLayoutTopPadding = function () {
		var paddingTop = this.contentThreshold + this.extraPaddingEmergency + this.extraPaddingSecondary;
		this.$spacer.stop().animate({
			height: paddingTop,
		}, 0, 'linear');
		if (this.$topfixedContent.length === 1) {
			this.$topfixedContent.css({
				width: $('.LayoutBase-MainContent').width(),
				top: this.topfixedContentThreshold + 'px',
			});
		}
	};

	LayoutBase.prototype.handleLayoutBottomPadding = function () {
		if (this.$bottomfixedContent.length === 1) {
			if ($('body')[0].scrollHeight > $('body').height()) {
				var bottomFixedHeight = this.$bottomfixedContent.outerHeight(true);
				this.$wrapper.addClass('hasFixedBottom').css('padding-bottom', bottomFixedHeight + 'px');
				this.$bottomfixedContent.css({
					width: $('.LayoutBase-MainContent').outerWidth(true)
				});
			} else {
				this.$wrapper.removeClass('hasFixedBottom').css('padding-bottom', '');
				this.$bottomfixedContent.css({
					width: ''
				});
			}
		}
	};

	LayoutBase.prototype.updateThresholds = function () {
		var mainMenuHeight = this.$mainMenu.outerHeight(true) || 0;
		var headerBodyHeight = this.$headerBody.outerHeight(true) || this.$header.outerHeight(true) || 0;
		var topfixedContentHeight = this.$topfixedContent.outerHeight(true) || 0;
		var primaryMenuHeight = this.$primaryMenu.outerHeight(true) || 0;
		var emergencyHeight = this.$emergency.outerHeight(true) || 0;
		this.topfixedContentThreshold = mainMenuHeight + headerBodyHeight;
		this.contentThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight;
		this.emergencyThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight;
		this.secondaryThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight + emergencyHeight;
	};

	LayoutBase.prototype.getThresholds = function () {
		return {
			topfixedContentThreshold: this.topfixedContentThreshold,
			contentThreshold: this.contentThreshold,
			emergencyThreshold: this.emergencyThreshold,
			secondaryThreshold: this.secondaryThreshold,
		};
	};

	LayoutBase.prototype.openSidebarIframe = function (duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		this.$iframeSidebar.animate({
			width: '100%',
		}, duration);
		$('body').css('overflow-y', 'scroll');
		$('.tooltipstered').tooltipster('hide');
	};

	LayoutBase.prototype.closeSidebarIframe = function (duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		var targetWidth = this.isExpandable ? 40 : 262;
		this.$iframeSidebar.animate({
			width: targetWidth,
		}, duration);
		$('body').css('overflow-y', 'scroll');
	};

	SapphireWidgets.LayoutBase = {
		create: create,
		closeSidebarIframe: closeSidebarIframe,
		openSidebarIframe: openSidebarIframe,
		scrollToElement: scrollToElement,
	};

})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/layout/layout-blank.js":
/*!*************************************************************!*\
  !*** ./src/components/05-components/layout/layout-blank.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutBlank */
$(function() {
	if (window.frameElement) {
		if (!!$(this.frameElement).closest('.MainInteractiveCard').length) {
			$('.LayoutBlank.Page').addClass('MainInteractiveCard');
		}
	}
});


/***/ }),

/***/ "./src/components/05-components/layout/layout-popup.js":
/*!*************************************************************!*\
  !*** ./src/components/05-components/layout/layout-popup.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutPopup */
(function ($, window, document, SapphireWidgets) {
	var popupWidth;
	var popupMinWidth;
	var popupHeight;
	var popupMinHeight;
	var popupMaxHeight;
	var popupWidthPercentage;
	var layoutPopupResizeTimer;

	var $popup = $('.LayoutPopup');
	var $osPopup = window.parent.$('.os-internal-Popup.os-internal-ui-dialog');
	var $osPopupContent = window.parent.$('.os-internal-ui-dialog-content.os-internal-ui-widget-content');
	var $overlay = window.parent.$('.os-internal-ui-widget-overlay');
	var popupSize;

	const create = function (config) {

		SapphireWidgets.LayoutPopup.config = config;
		popupSize = SapphireWidgets.LayoutPopup.config.PopupSize;

		$(function () {
			$('body').addClass('LayoutPopup'); // because datetimerangepicker is attached to body
			if (SapphireWidgets.LayoutPopup.config.isTouch) {
				$popup.addClass('isTouch');
				$('body').addClass('isTouch'); // because select2 is attached to body
			}
			var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation, index) {
					redrawDialogWindow();
				});
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: false,
			});
			$('body').css('visibility', 'hidden');
		});

		$(window).load(function () {
			$(this.frameElement).css({
				width: '100%',
				height: '100%'
			});
			setTimeout(function () {
				resizeDialog();
				resizeContent();
				$('body').css('visibility', 'visible');
			}, 150);
			osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.LayoutPopup.redrawDialogWindow);
		});

		$(window.parent).off('resize.LayoutPopup').on('resize.LayoutPopup', function () {
			redrawDialogWindow();
		});
	};

	const redrawDialogWindow = function () {
		clearTimeout(layoutPopupResizeTimer);
		layoutPopupResizeTimer = setTimeout(function () {
			resizeDialog();
			resizeContent();
		}, 300);
	};

	const resizeDialog = function () {
		if (SapphireWidgets.LayoutPopup.config.hasClose) {
			window.parent.$('.os-internal-ui-dialog-titlebar').show();
		}

		if (window.top.$('body').hasClass('LayoutBase')) {
			window.top.$('body').css({
				overflowY: 'hidden'
			});
		}

		$overlay.width('100%');

		var windowHeight = $(window.parent).height();
		var windowWidth = $(window.parent).width();

		if (popupSize === 'Small') {
			popupWidth = parseInt(windowWidth * 0.33);
			popupMinWidth = 400;
		} else if (popupSize === 'Medium') {
			switch (SapphireWidgets.LayoutPopup.config.PopupWidth) {
				case 'XSmall':
					popupMinWidth = 200;
					popupWidthPercentage = 0.2;
					break;
				case 'Small':
					popupMinWidth = 300;
					popupWidthPercentage = 0.3;
					break;
				case 'Medium':
					popupMinWidth = 600;
					popupWidthPercentage = 0.6;
					break;
				default:
					popupMinWidth = 700;
					popupWidthPercentage = 0.7;
			}

			popupWidth = SapphireWidgets.LayoutPopup.config.isTouch ? parseInt(windowWidth * 0.8) : parseInt(windowWidth * popupWidthPercentage);
			popupMinHeight = 200;
			popupMaxHeight = SapphireWidgets.LayoutPopup.config.isTouch ? parseInt(windowHeight * 0.9) : parseInt(windowHeight * 0.7);

			if (SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				popupHeight = popupMaxHeight;
			} else {
				popupHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();
			}

			$osPopupContent.css({
				maxHeight: popupMaxHeight + 'px',
				minHeight: popupMinHeight + 'px',
				height: popupHeight + 'px',
			});
		} else if (popupSize === 'Large') {
			popupMinWidth = parseInt(windowWidth * 0.8);
			popupMaxHeight = parseInt(windowHeight * 0.9);
		}

		$osPopup.css({
			position: 'fixed',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			height: 'auto',
			minWidth: popupMinWidth + 'px',
			width: popupWidth + 'px',
		});
	};

	const resizeContent = function () {
		var $body = $('.LayoutPopup__body__content');
		var contentScrollTop = $body.scrollTop();

		if (popupSize === 'Small' && $('.daterangepicker:visible').length > 0) {
			// skip the reset of .LayoutPopup__body__content
		} else {
			$body.css({
				height: 'auto'
			});
		}

		var headerHeight = $('.LayoutPopup__header').innerHeight() || 0;
		var introHeight = $('.LayoutPopup__intro').innerHeight() || 0;
		var bodyHeight = $('.LayoutPopup__body__content')[0].scrollHeight || 0;
		var footerHeight = $('.LayoutPopup__footer').innerHeight() || 0;
		var contentHeight = headerHeight + introHeight + bodyHeight + footerHeight + 40;
		var dialogHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();

		if (popupSize === 'Small') {
			$osPopupContent.height(contentHeight);
		} else {
			if (contentHeight < dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
				$body.height(forcedBodyHeight);
			} else if (contentHeight < dialogHeight) {
				$osPopupContent.height(contentHeight);
				if (contentHeight < popupMinHeight) {
					var diference = popupMinHeight - contentHeight;
					$body.height(bodyHeight + diference);
				}
			} else if (contentHeight >= dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
				$body.height(forcedBodyHeight);
			} else if (contentHeight >= dialogHeight) {
				if (contentHeight > popupMaxHeight) {
					$osPopupContent.height(popupMaxHeight);
					var forcedBodyHeight = popupMaxHeight - headerHeight - introHeight - footerHeight - 40;
					$body.height(forcedBodyHeight);
				} else {
					$osPopupContent.height(contentHeight);
				}
			} else {
				console.warn('Unexpected combination...');
			}
		}

		// Handle when DateTimeRangePicker is opened
		var dateRangePicker = $('.daterangepicker:visible');
		if (dateRangePicker.length === 1) {
			if (dateRangePicker[0].getBoundingClientRect().bottom > dialogHeight) {
				var difference = dateRangePicker[0].getBoundingClientRect().bottom - dialogHeight;
				var bodyHeight = $('.LayoutPopup__body__content').outerHeight(true);
				$('.LayoutPopup__body__content').height(bodyHeight + difference + 40);
				$osPopupContent.height($('body')[0].scrollHeight);
			}
		}

		$body.scrollTop(contentScrollTop);
	};

	const increaseHeight = function (diference) {
		$osPopupContent.height($osPopupContent.height() + diference);
	};

	const scrollToElement = function ($element) {
		var $targetElement = $element;
		if (!!$targetElement.length) {
			var scrollToOffsetInterval;
			scrollToOffsetInterval = setInterval(function () {
				clearInterval(scrollToOffsetInterval);
				var headerHeight = $('.LayoutPopup__header').outerHeight(true) || 0;
				var introHeight = $('.LayoutPopup__intro').outerHeight(true) || 0;
				var currentBodyScroll = $('.LayoutPopup__body__content')[0].scrollTop || 0;
				var targetElementOffsetTop = $targetElement.offset().top - headerHeight - introHeight + currentBodyScroll - 20;
				$('.LayoutPopup__body__content').scrollTop(targetElementOffsetTop);
			}, 250);
		}
	}

	SapphireWidgets.LayoutPopup = {
		create,
		resizeDialog,
		resizeContent,
		increaseHeight,
		redrawDialogWindow,
		scrollToElement
	};

})(jQuery, window, document, SapphireWidgets);

$(window).unload(function () {
	if (!!$('.LayoutPopup').length) {
		window.top.$('body').css({
			overflowY: 'scroll'
		});
	}
});

/***/ }),

/***/ "./src/components/05-components/v3-pat/actions-menu/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/actions-menu/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ActionsMenu */
(function($, window, SapphireWidgets) {
	var create = function(config) {
		var $triggerElement = $('#' + config.triggerElement);
		var $contentElement = $('#' + config.contentElement);

		if ($contentElement.text().length < 1) {
			$triggerElement.hide();
		}

		$(function() {
			// inside a document ready due to sapphire popup binded events
			window.setTimeout(function() {
				var position = config.position;
				if (config.locale === 'AR') {
					switch (config.position) {
						case 'right':
							position = 'left';
							break;
						case 'left':
							position = 'right';
							break;
						case 'bottom-left':
							position = 'bottom-right';
							break;
						case 'bottom-right':
							position = 'bottom-left';
							break;
						case 'top-left':
							position = 'top-right';
							break;
						case 'top-right':
							position = 'top-left';
							break;
					}
				}
				$triggerElement.tooltipster({
					content: $('<section/>').append($contentElement.clone(true)),
					trigger: config.triggerEvent,
					position: position,
					maxWidth: config.maxWidth,
					theme:
						'tooltipster-location--' +
						config.location +
						' ActionsMenu-tooltip Padding--' +
						config.padding +
						' Border--' +
						config.border,
				});
				$contentElement.remove();
			}, 500);
		});
	};

	SapphireWidgets.ActionsMenu = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/actions-sub-menu/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/actions-sub-menu/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ActionsSubMenu - @Deprecated */
SapphireWidgets.ActionsSubMenu = function(IconId) {
	if ($('.PatientHeaderActions__subMenu').hasClass('SubMenuBlock')) {
		$('.PatientHeaderActions__subMenu').removeClass('SubMenuBlock');
	} else {
		$(IconId)
			.parent()
			.siblings()
			.find('.PatientHeaderActions__subMenu')
			.addClass('SubMenuBlock');
	}
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/data-tables/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/data-tables/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {

  class DataTables {

    constructor(config) {
      this.config = config;
      this.$widget = $(`#${config.widgetId}`);
      this.$table = this.$widget.find('table');
      this.$table.addClass(config.baseStyle);
      this.onInit();
    }

    onInit() {

      this.options = {
        ...this.config,
        fixedColumns: true,
        info: false,
        ordering: false,
        paging: false,
        scrollCollapse: true,
        scrollX: true,
        searching: false,
      }

      $(() => {
        this.$table.DataTable(this.options);
      });
    }

  }

  const create = config => (window[config.widgetId] = new DataTables(config));

  SapphireWidgets.DataTables = {
    create
  };

})();

/***/ }),

/***/ "./src/components/05-components/v3-pat/datetime-range-picker/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/datetime-range-picker/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component DateTimeRangePicker */
(function ($, window, document, SapphireWidgets) {
	var allDateTimeRangePickers = [];

	var create = function (config) {
		for (var i = 0; i < allDateTimeRangePickers.length; i++) {
			if (allDateTimeRangePickers[i].config.widgetId === config.widgetId) {
				allDateTimeRangePickers.splice(i, 1);
			}
		}
		window[config.widgetId] = new DateTimeRangePicker(config);
		allDateTimeRangePickers.push(window[config.widgetId]);
	};

	var DateTimeRangePicker = function (config) {
		this.config = config;
		this.currentLocale = config.currentLocale;

		this.$widget = $('#' + config.widgetId);
		this.$widget.addClass('DateTimeRangePicker');
		this.$clear = this.$widget.find('.DateTimeRangePicker-clear');
		this.$label = this.$widget.find('.DateTimeRangePicker-label');

		this.isEmptyHour = false;

		if (this.config.attachToInput) {
			this.$widget.addClass('attachedInput');
			this.$input = this.$widget.find(
				'.DateTimeRangePicker-placeholder input[type="text"]'
			);
			this.$displayed = this.$widget.find(
				'.DateTimeRangePicker-displayed input[type="text"]'
			);
			if (!this.config.allowsTyping) {
				this.$displayed.prop('readonly', true);
			}
		} else {
			this.$input = $('#' + config.inputId);
			if (!this.config.allowsTyping) {
				this.$input.prop('readonly', true);
			}
		}

		if (this.currentLocale === 'AR') {
			moment.locale('ar-kw');
		}

		var options = {};
		options.startDate = config.startDate;
		options.singleDatePicker = config.singleDatePicker;
		options.autoApply = config.autoApply;
		options.autoUpdateInput = config.autoUpdateInput;
		options.timePicker = config.timePicker;
		options.timePicker24Hour = config.timePicker24Hour;
		options.timePickerIncrement = config.timePickerIncrement;
		options.showDropdowns = config.hasDropdowns;
		options.drops = config.drops;
		options.opens = config.opens;

		var stringConnection = '[, at]';

		if (config.timePicker) {
			if (this.config.attachToInput) {
				this.$displayed.prop('placeholder', 'DD-MM-YYYY HH:MM');
			} else {
				this.$input.prop('placeholder', 'DD-MM-YYYY HH:MM');
			}
			if (options.timePicker24Hour) {
				this.config.formatInput = 'DD-MM-YYYY HH:mm';
				this.config.formatLabel = this.config.hasYearWhenText ?
					'D MMM YYYY' + stringConnection + ' HH:mm' :
					'D MMM' + stringConnection + ' HH:mm';
			} else {
				this.config.formatInput = 'DD-MM-YYYY hh:mm A';
				this.config.formatLabel = this.config.hasYearWhenText ?
					'D MMM YYYY' + stringConnection + ' hh:mm A' :
					'D MMM' + stringConnection + ' hh:mm A';
			}
		} else {
			this.$widget.addClass('onlyDate');
			if (this.config.attachToInput) {
				this.$displayed.prop('placeholder', 'DD-MM-YYYY');
			} else {
				this.$input.prop('placeholder', 'DD-MM-YYYY');
			}
			this.config.formatInput = 'DD-MM-YYYY';
			this.config.formatLabel = this.config.hasYearWhenText ?
				'D MMM YYYY' :
				'D MMM';
		}

		this.config.formatLabel = this.config.hasWeekDayNameWhenText ?
			'ddd[, ]' + this.config.formatLabel :
			this.config.formatLabel;

		options.locale = {
			direction: config.currentLocale === 'AR' ? 'rtl' : 'ltr',
			format: this.config.formatInput,
			cancelLabel: 'Cancel',
			applyLabel: 'Apply',
		};

		if (config.hasTextTrigger) {
			this.$widget.addClass('textTrigger');
		}

		if (config.endDate && config.endDate !== '01-01-1900 00:00:00') {
			options.endDate = config.endDate;
		}
		if (config.maxDate && config.maxDate !== '01-01-1900 00:00:00') {
			options.maxDate = config.maxDate;
		}
		if (config.minDate && config.minDate !== '01-01-1900 00:00:00') {
			options.minDate = config.minDate;
		}

		if (config.DisabledWeekDays) {
			var disabledWeekDays = config.DisabledWeekDays.split(',');
			options.isInvalidDate = function (date) {
				return disabledWeekDays.includes(
					moment(date)
					.day()
					.toString()
				);
			};
		}

		this.$input.daterangepicker(options, function (startDate, endDate, label) {
			// after a selection is made
		});

		// now we have a proper instance
		this.picker = this.$input.data('daterangepicker');

		this.$calendar = $(this.picker.container);

		if (!!this.config.cssClass) {
			this.$calendar.addClass(this.config.cssClass);
		}

		this.$timeHolder = this.$calendar.find('.calendar-time');
		this.$buttonsHolder = this.$calendar.find('.drp-buttons');

		if (this.config.autoApply) {
			this.$buttonsHolder.hide();
		}

		if (config.isEmptyStartDate) {
			this.clear(false);
		} else if (config.isEmptyStartHour) {
			this.isEmptyHour = true;
			this.updateLabeling();
		} else {
			this.updateLabeling();
		}

		if (config.enabled) {
			this.nativeEvents();
			this.customEvents();
		} else {
			this.$clear.hide();
			this.$input.off('click focus keydown keyup');
		}

		if (this.config.attachToInput) {
			this.handleCustomValidation();
		}
	};

	DateTimeRangePicker.prototype.handleCustomValidation = function () {
		var errorMessage = this.$input.next().text();
		if (!!errorMessage.length) {
			this.$displayed.addClass('Not_Valid');
			this.$displayed
				.next()
				.show()
				.text(errorMessage);
		} else {
			this.$displayed.removeClass('Not_Valid');
			this.$displayed.next().hide();
		}
	};

	DateTimeRangePicker.prototype.nativeEvents = function () {
		var _this = this;
		this.$input.on('showCalendar.daterangepicker', function (event, picker) {
			if (_this.config.hasGoToday) {
				_this.$calendar
					.find('.calendar-table thead tr')
					.eq(0)
					.after(
						'<tr><td colspan="7" class="DateTimeRangePicker-calendar-gotoday">' +
						'Today' +
						'</td></tr>'
					);
				if (_this.config.drops === 'up') {
					_this.$calendar.css('top', _this.$calendar.offset().top - 24);
				}
			}
			_this.handleViewportPosition();
		});
		this.$input.on('show.daterangepicker', function (event, picker) {
			if (_this.config.timePicker && _this.config.hasClearHour) {
				_this.$calendar
					.find('.calendar-time')
					.append('<span class="DateTimeRangePicker-calendar-clear"></span>');
				if (_this.isEmptyHour) {
					_this.$timeHolder.css('opacity', 0.5);
					_this.$calendar
						.find('.DateTimeRangePicker-calendar-clear')
						.addClass('disabled');
				} else {
					_this.$timeHolder.css('opacity', 1);
					_this.$calendar.find('.DateTimeRangePicker-calendar-clear').removeClass('disabled');
				}
			}
			_this.handleViewportPosition();
			SapphireWidgets.DateTimeRangePicker.openedWidgetId = _this.config.widgetId;
		});
		this.$input.on('hide.daterangepicker', function (event, picker) {
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').remove();
			_this.updateParentIframe();
		});
		this.$input.on('cancel.daterangepicker', function (event, picker) {});
		this.$input.on('outsideClick.daterangepicker', function (event, picker) {});
		this.$input.on('timechanged.daterangepicker', function (event, picker) {
			_this.isEmptyHour = false;
			_this.$timeHolder.css('opacity', 1);
			if (_this.config.hasClearHour) {
				_this.$calendar
					.find('.calendar-time')
					.append('<span class="DateTimeRangePicker-calendar-clear"></span>');
			}
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('clickDate.daterangepicker', function (event, picker) {
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('apply.daterangepicker', function (event, picker) {
			_this.$clear.removeClass('disabled');
			_this.updateLabeling();
			_this.sendNotification();
		});
	};

	DateTimeRangePicker.prototype.customEvents = function () {
		var _this = this;
		this.$label.off('click').on('click', function (event) {
			_this.picker.toggle();
		});
		this.$clear.off('click').on('click', function (event) {
			_this.clear();
			_this.picker.hide();
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-clear', function () {
			if (_this.config.timePicker24Hour) {
				_this.$calendar.find('.hourselect').val('0').trigger('change');
			} else {
				_this.$calendar.find('.hourselect').val('12').trigger('change');
			}
			_this.$calendar.find('.minuteselect').val('0').trigger('change');
			_this.$calendar.find('.ampmselect').val('AM').trigger('change');
			_this.isEmptyHour = true;
			_this.$timeHolder.css('opacity', 0.5);
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').addClass('disabled');
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-gotoday', function () {
			_this.picker.setStartDate(moment());
			_this.picker.setEndDate(moment());
			_this.picker.hide();
			if (!_this.config.autoUpdateInput || _this.config.hasTextTrigger || _this.config.attachToInput) {
				_this.updateLabeling();
			}
			_this.sendNotification();
		});
		if (this.config.attachToInput) {
			this.$displayed.on('click focus', function () {
				_this.$input.trigger('click');
			});
			this.$displayed.on('keyup', function (evt) {
				_this.$input.val(_this.$displayed.val()).trigger('keyup');
			});
		} else {
			this.$input.on('click', function () {
				window.setTimeout(function () {
					_this.updateParentIframe();
				}, 50);
			});
		}
	};

	DateTimeRangePicker.prototype.updateLabeling = function () {
		var labelMask = this.config.formatLabel;
		var inputMask = this.config.formatInput;
		if (moment(this.picker.startDate).isSame(moment(), 'day')) {
			if (labelMask.includes('D MMM YYYY')) {
				labelMask = labelMask.replace('D MMM YYYY', '[Today]');
			} else if (labelMask.includes('D MMM')) {
				labelMask = labelMask.replace('D MMM', '[Today]');
			} else {
				console.log('Something wrong with the labelMask', labelMask);
			}
		}
		if (this.isEmptyHour) {
			labelMask = labelMask
				.replace('hh:mm A', '[--:--]')
				.replace('HH:mm', '[--:--]');
			inputMask = inputMask
				.replace('hh:mm A', '[--:--]')
				.replace('HH:mm', '[--:--]');
			if (this.config.hasTextTrigger) {
				this.$label.html(this.picker.startDate.format(labelMask));
				if (this.config.timePicker) {
					this.$input.val(
						this.picker.startDate.format('DD-MM-YYYY [00:00:00]')
					);
				} else {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
				}
			} else {
				this.$input.val(this.picker.startDate.format('DD-MM-YYYY [00:00:00]'));
				if (this.config.attachToInput) {
					this.$displayed.val(this.picker.startDate.format(inputMask));
				}
			}
		} else {
			if (this.config.hasTextTrigger) {
				this.$label.html(this.picker.startDate.format(labelMask));
				if (this.config.timePicker) {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY HH:mm:ss'));
				} else {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
				}
			} else {
				if (this.config.attachToInput) {
					this.$displayed.val(this.picker.startDate.format(this.config.formatInput));
					if (this.config.timePicker) {
						this.$input.val(this.picker.startDate.format('DD-MM-YYYY HH:mm:ss'));
					} else {
						this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
					}
				} else {
					this.$input.val(this.picker.startDate.format(this.config.formatInput));
				}
			}
		}
	};

	DateTimeRangePicker.prototype.handleViewportPosition = function () {
		if (window.frameElement && ($(window.frameElement.parentElement).hasClass('tooltipster-content') || $(window.frameElement.parentElement).hasClass('os-internal-ui-dialog-content'))) {
			return;
		}

		if (!this.isInViewport()) {
			var coords = this.$calendar[0].getBoundingClientRect();
			if (this.$calendar.hasClass('drop-up') && this.$calendar[0].getBoundingClientRect().top < 0) {
				var point = window.scrollY + coords.bottom + this.$input.height() + 7;
				this.$calendar.removeClass('drop-up').addClass('drop-down').css('top', point);
			} else if (!this.$calendar.hasClass('drop-up') && this.$calendar[0].getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)) {
				var point = window.scrollY + coords.top - coords.height - this.$input.height() - 7;
				this.$calendar.addClass('drop-up').css('top', point);
			}
		}
	};

	DateTimeRangePicker.prototype.isInViewport = function () {
		var bounding = this.$calendar[0].getBoundingClientRect();
		return (bounding.top >= 0 && bounding.bottom <= (window.innerHeight + 5 || document.documentElement.clientHeight + 5));
	};

	DateTimeRangePicker.prototype.clear = function (sendNotification) {
		this.picker.setStartDate(moment());
		this.picker.setEndDate(moment());
		this.isEmptyHour = false;
		this.$clear.addClass('disabled');
		if (this.config.hasTextTrigger) {
			this.$label.html('-- -- --');
		} else {
			this.$input.val('');
			if (this.config.attachToInput) {
				this.$displayed.val('');
			}
		}
		if (sendNotification || sendNotification == undefined) {
			this.sendNotification(false);
		}
	};

	DateTimeRangePicker.prototype.show = function () {
		this.picker.show();
	};

	DateTimeRangePicker.prototype.hide = function () {
		this.picker.hide();
	};

	DateTimeRangePicker.prototype.cancel = function () {
		this.picker.clickCancel();
	};

	DateTimeRangePicker.prototype.sendNotification = function (sendDate) {
		if (this.$widget.hasClass('attachedInput')) {
			this.$input.trigger('change');
			return false;
		}
		if (sendDate || sendDate == undefined) {
			if (this.isEmptyHour) {
				OsNotifyWidget(
					this.config.dateTimeRangePickerFakeNotifyId,
					this.picker.startDate.format('DD-MM-YYYY [00:00:00]') +
					'|' +
					this.isEmptyHour
				);
			} else {
				if (this.config.timePicker) {
					OsNotifyWidget(
						this.config.dateTimeRangePickerFakeNotifyId,
						this.picker.startDate.format('DD-MM-YYYY HH:mm:ss') +
						'|' +
						this.isEmptyHour
					);
				} else {
					OsNotifyWidget(
						this.config.dateTimeRangePickerFakeNotifyId,
						this.picker.startDate.format('DD-MM-YYYY') + '|' + this.isEmptyHour
					);
				}
			}
		} else {
			OsNotifyWidget(this.config.dateTimeRangePickerFakeNotifyId, 'null|true');
		}
	};

	DateTimeRangePicker.prototype.updateParentIframe = function () {
		if (typeof SapphireWidgets.ResizeParentIframe === 'object') {
			SapphireWidgets.ResizeParentIframe.resize();
		}
		if ($('.Page.LayoutPopup').length === 1) {
			SapphireWidgets.LayoutPopup.redrawDialogWindow();
		}
	}

	SapphireWidgets.DateTimeRangePicker = {
		create: create,
		all: function () {
			return allDateTimeRangePickers;
		},
	};
})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/dropdown-categories/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/dropdown-categories/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component DropdownCategories */
(function($, window, SapphireWidgets) {
	function optGroupSetValue(selectId, inputBoxId, buttonId) {
		var v = document.getElementById(selectId).value;
		$('#' + inputBoxId).val(v);
		$('#' + selectId + ' option[selected]').removeAttr('selected');

		if (v > -1) {
			$('#' + selectId + ' option[value="' + v + '"]').attr('selected', 'selected');
		}

		$('#' + buttonId).click();
		$('#s2id_' + selectId).removeClass('select2-container-active');
	}

	function OsCustomValidatorOptGroup(a, b) {
		var _e = $('#' + a.controltovalidate);
		var isValid = _e.find('option[selected]').length;
		var hasSibling_MandatorySelect2 = _e.prev('div.select2-container.Mandatory').length;

		if (hasSibling_MandatorySelect2) {
			if (isValid) {
				_e.prev('div.select2-container.Mandatory').removeClass('Not_Valid');
			} else {
				_e.prev('div.select2-container.Mandatory').addClass('Not_Valid');
			}
		}

		return isValid;
	}

	function addOptGroupValidator(optGroupElementId) {
		OsPage_Validators.push({
			controltovalidate: optGroupElementId,
			enabled: true,
			errormessage: 'Required field!',
			evaluationfunction: 'SapphireWidgets.DropdownCategories.OsCustomValidatorOptGroup',
			initialvalue: '',
			isvalid: true,
		});
	}

	SapphireWidgets.DropdownCategories = {
		optGroupSetValue,
		OsCustomValidatorOptGroup,
		addOptGroupValidator,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/dropzone/plugin.js":
/*!****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/dropzone/plugin.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* Component Dropzone (Plugin) */


var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true,
		},
	});
	if (superClass)
		Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

// The Emitter class provides the ability to call `.on()` on Dropzone to listen
// to events.
// It is strongly based on component's emitter class, and I removed the
// functionality because of the dependency hell with different frameworks.
var Emitter = (function() {
	function Emitter() {
		_classCallCheck(this, Emitter);
	}

	_createClass(Emitter, [
		{
			key: 'on',

			// Add an event listener for given event
			value: function on(event, fn) {
				this._callbacks = this._callbacks || {};
				// Create namespace for this event
				if (!this._callbacks[event]) {
					this._callbacks[event] = [];
				}
				this._callbacks[event].push(fn);
				return this;
			},
		},
		{
			key: 'emit',
			value: function emit(event) {
				this._callbacks = this._callbacks || {};
				var callbacks = this._callbacks[event];

				if (callbacks) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					for (
						var _iterator = callbacks,
							_isArray = true,
							_i = 0,
							_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
						;

					) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var callback = _ref;

						callback.apply(this, args);
					}
				}

				return this;
			},

			// Remove event listener for given event. If fn is not provided, all event
			// listeners for that event will be removed. If neither is provided, all
			// event listeners will be removed.
		},
		{
			key: 'off',
			value: function off(event, fn) {
				if (!this._callbacks || arguments.length === 0) {
					this._callbacks = {};
					return this;
				}

				// specific event
				var callbacks = this._callbacks[event];
				if (!callbacks) {
					return this;
				}

				// remove all handlers
				if (arguments.length === 1) {
					delete this._callbacks[event];
					return this;
				}

				// remove specific handler
				for (var i = 0; i < callbacks.length; i++) {
					var callback = callbacks[i];
					if (callback === fn) {
						callbacks.splice(i, 1);
						break;
					}
				}

				return this;
			},
		},
	]);

	return Emitter;
})();

var Dropzone = (function(_Emitter) {
	_inherits(Dropzone, _Emitter);

	_createClass(Dropzone, null, [
		{
			key: 'initClass',
			value: function initClass() {
				// Exposing the emitter class, mainly for tests
				this.prototype.Emitter = Emitter;

				/*
       This is a list of all available events you can register on a dropzone object.
        You can register an event handler like this:
        dropzone.on("dragEnter", function() { });
        */
				this.prototype.events = [
					'drop',
					'dragstart',
					'dragend',
					'dragenter',
					'dragover',
					'dragleave',
					'addedfile',
					'addedfiles',
					'removedfile',
					'thumbnail',
					'error',
					'errormultiple',
					'processing',
					'processingmultiple',
					'uploadprogress',
					'totaluploadprogress',
					'sending',
					'sendingmultiple',
					'success',
					'successmultiple',
					'canceled',
					'canceledmultiple',
					'complete',
					'completemultiple',
					'reset',
					'maxfilesexceeded',
					'maxfilesreached',
					'queuecomplete',
				];

				this.prototype.defaultOptions = {
					/**
					 * Has to be specified on elements other than form (or when the form
					 * doesn't have an `action` attribute). You can also
					 * provide a function that will be called with `files` and
					 * must return the url (since `v3.12.0`)
					 */
					url: null,

					/**
					 * Can be changed to `"put"` if necessary. You can also provide a function
					 * that will be called with `files` and must return the method (since `v3.12.0`).
					 */
					method: 'post',

					/**
					 * Will be set on the XHRequest.
					 */
					withCredentials: false,

					/**
					 * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
					 */
					timeout: 30000,

					/**
					 * How many file uploads to process in parallel (See the
					 * Enqueuing file uploads* documentation section for more info)
					 */
					parallelUploads: 2,

					/**
					 * Whether to send multiple files in one request. If
					 * this it set to true, then the fallback file input element will
					 * have the `multiple` attribute as well. This option will
					 * also trigger additional events (like `processingmultiple`). See the events
					 * documentation section for more information.
					 */
					uploadMultiple: false,

					/**
					 * Whether you want files to be uploaded in chunks to your server. This can't be
					 * used in combination with `uploadMultiple`.
					 *
					 * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
					 */
					chunking: false,

					/**
					 * If `chunking` is enabled, this defines whether **every** file should be chunked,
					 * even if the file size is below chunkSize. This means, that the additional chunk
					 * form data will be submitted and the `chunksUploaded` callback will be invoked.
					 */
					forceChunking: false,

					/**
					 * If `chunking` is `true`, then this defines the chunk size in bytes.
					 */
					chunkSize: 2000000,

					/**
					 * If `true`, the individual chunks of a file are being uploaded simultaneously.
					 */
					parallelChunkUploads: false,

					/**
					 * Whether a chunk should be retried if it fails.
					 */
					retryChunks: false,

					/**
					 * If `retryChunks` is true, how many times should it be retried.
					 */
					retryChunksLimit: 3,

					/**
					 * If not `null` defines how many files this Dropzone handles. If it exceeds,
					 * the event `maxfilesexceeded` will be called. The dropzone element gets the
					 * class `dz-max-files-reached` accordingly so you can provide visual feedback.
					 */
					maxFilesize: 256,

					/**
					 * The name of the file param that gets transferred.
					 * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
					 * Dropzone will append `[]` to the name.
					 */
					paramName: 'file',

					/**
					 * Whether thumbnails for images should be generated
					 */
					createImageThumbnails: true,

					/**
					 * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
					 */
					maxThumbnailFilesize: 10,

					/**
					 * If `null`, the ratio of the image will be used to calculate it.
					 */
					thumbnailWidth: 120,

					/**
					 * The same as `thumbnailWidth`. If both are null, images will not be resized.
					 */
					thumbnailHeight: 120,

					/**
					 * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
					 * Can be either `contain` or `crop`.
					 */
					thumbnailMethod: 'crop',

					/**
					 * If set, images will be resized to these dimensions before being **uploaded**.
					 * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
					 * ratio of the file will be preserved.
					 *
					 * The `options.transformFile` function uses these options, so if the `transformFile` function
					 * is overridden, these options don't do anything.
					 */
					resizeWidth: null,

					/**
					 * See `resizeWidth`.
					 */
					resizeHeight: null,

					/**
					 * The mime type of the resized image (before it gets uploaded to the server).
					 * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
					 * See `resizeWidth` for more information.
					 */
					resizeMimeType: null,

					/**
					 * The quality of the resized images. See `resizeWidth`.
					 */
					resizeQuality: 0.8,

					/**
					 * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
					 * Can be either `contain` or `crop`.
					 */
					resizeMethod: 'contain',

					/**
					 * The base that is used to calculate the filesize. You can change this to
					 * 1024 if you would rather display kibibytes, mebibytes, etc...
					 * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
					 * You can change this to `1024` if you don't care about validity.
					 */
					filesizeBase: 1000,

					/**
					 * Can be used to limit the maximum number of files that will be handled by this Dropzone
					 */
					maxFiles: null,

					/**
					 * An optional object to send additional headers to the server. Eg:
					 * `{ "My-Awesome-Header": "header value" }`
					 */
					headers: null,

					/**
					 * If `true`, the dropzone element itself will be clickable, if `false`
					 * nothing will be clickable.
					 *
					 * You can also pass an HTML element, a CSS selector (for multiple elements)
					 * or an array of those. In that case, all of those elements will trigger an
					 * upload when clicked.
					 */
					clickable: true,

					/**
					 * Whether hidden files in directories should be ignored.
					 */
					ignoreHiddenFiles: true,

					/**
					 * The default implementation of `accept` checks the file's mime type or
					 * extension against this list. This is a comma separated list of mime
					 * types or file extensions.
					 *
					 * Eg.: `image/*,application/pdf,.psd`
					 *
					 * If the Dropzone is `clickable` this option will also be used as
					 * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
					 * parameter on the hidden file input as well.
					 */
					acceptedFiles: null,

					/**
					 * **Deprecated!**
					 * Use acceptedFiles instead.
					 */
					acceptedMimeTypes: null,

					/**
					 * If false, files will be added to the queue but the queue will not be
					 * processed automatically.
					 * This can be useful if you need some additional user input before sending
					 * files (or if you want want all files sent at once).
					 * If you're ready to send the file simply call `myDropzone.processQueue()`.
					 *
					 * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
					 * section for more information.
					 */
					autoProcessQueue: true,

					/**
					 * If false, files added to the dropzone will not be queued by default.
					 * You'll have to call `enqueueFile(file)` manually.
					 */
					autoQueue: true,

					/**
					 * If `true`, this will add a link to every file preview to remove or cancel (if
					 * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
					 * and `dictRemoveFile` options are used for the wording.
					 */
					addRemoveLinks: false,

					/**
					 * Defines where to display the file previews – if `null` the
					 * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
					 * selector. The element should have the `dropzone-previews` class so
					 * the previews are displayed properly.
					 */
					previewsContainer: null,

					/**
					 * This is the element the hidden input field (which is used when clicking on the
					 * dropzone to trigger file selection) will be appended to. This might
					 * be important in case you use frameworks to switch the content of your page.
					 */
					hiddenInputContainer: 'body',

					/**
					 * If null, no capture type will be specified
					 * If camera, mobile devices will skip the file selection and choose camera
					 * If microphone, mobile devices will skip the file selection and choose the microphone
					 * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
					 * On apple devices multiple must be set to false.  AcceptedFiles may need to
					 * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
					 */
					capture: null,

					/**
					 * **Deprecated**. Use `renameFile` instead.
					 */
					renameFilename: null,

					/**
					 * A function that is invoked before the file is uploaded to the server and renames the file.
					 * This function gets the `File` as argument and can use the `file.name`. The actual name of the
					 * file that gets used during the upload can be accessed through `file.upload.filename`.
					 */
					renameFile: null,

					/**
					 * If `true` the fallback will be forced. This is very useful to test your server
					 * implementations first and make sure that everything works as
					 * expected without dropzone if you experience problems, and to test
					 * how your fallbacks will look.
					 */
					forceFallback: false,

					/**
					 * The text used before any files are dropped.
					 */
					dictDefaultMessage: 'Drop files here to upload',

					/**
					 * The text that replaces the default message text it the browser is not supported.
					 */
					dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",

					/**
					 * The text that will be added before the fallback form.
					 * If you provide a  fallback element yourself, or if this option is `null` this will
					 * be ignored.
					 */
					dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',

					/**
					 * If the filesize is too big.
					 * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
					 */
					dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',

					/**
					 * If the file doesn't match the file type.
					 */
					dictInvalidFileType: "You can't upload files of this type.",

					/**
					 * If the server response was invalid.
					 * `{{statusCode}}` will be replaced with the servers status code.
					 */
					dictResponseError: 'Server responded with {{statusCode}} code.',

					/**
					 * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
					 */
					dictCancelUpload: 'Cancel upload',

					/**
					 * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
					 */
					dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',

					/**
					 * If `addRemoveLinks` is true, the text to be used to remove a file.
					 */
					dictRemoveFile: 'Remove file',

					/**
					 * If this is not null, then the user will be prompted before removing a file.
					 */
					dictRemoveFileConfirmation: null,

					/**
					 * Displayed if `maxFiles` is st and exceeded.
					 * The string `{{maxFiles}}` will be replaced by the configuration value.
					 */
					dictMaxFilesExceeded: 'You can not upload any more files.',

					/**
					 * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
					 * `b` for bytes.
					 */
					dictFileSizeUnits: { tb: 'TB', gb: 'GB', mb: 'MB', kb: 'KB', b: 'b' },

					/**
					 * Called when dropzone initialized
					 * You can add event listeners here
					 */
					init: function init() {},

					/**
					 * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
					 * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
					 * of a function, this needs to return a map.
					 *
					 * The default implementation does nothing for normal uploads, but adds relevant information for
					 * chunked uploads.
					 *
					 * This is the same as adding hidden input fields in the form element.
					 */
					params: function params(files, xhr, chunk) {
						if (chunk) {
							return {
								dzuuid: chunk.file.upload.uuid,
								dzchunkindex: chunk.index,
								dztotalfilesize: chunk.file.size,
								dzchunksize: this.options.chunkSize,
								dztotalchunkcount: chunk.file.upload.totalChunkCount,
								dzchunkbyteoffset: chunk.index * this.options.chunkSize,
							};
						}
					},

					/**
					 * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
					 * and a `done` function as parameters.
					 *
					 * If the done function is invoked without arguments, the file is "accepted" and will
					 * be processed. If you pass an error message, the file is rejected, and the error
					 * message will be displayed.
					 * This function will not be called if the file is too big or doesn't match the mime types.
					 */
					accept: function accept(file, done) {
						return done();
					},

					/**
					 * The callback that will be invoked when all chunks have been uploaded for a file.
					 * It gets the file for which the chunks have been uploaded as the first parameter,
					 * and the `done` function as second. `done()` needs to be invoked when everything
					 * needed to finish the upload process is done.
					 */
					chunksUploaded: function chunksUploaded(file, done) {
						done();
					},

					/**
					 * Gets called when the browser is not supported.
					 * The default implementation shows the fallback input field and adds
					 * a text.
					 */
					fallback: function fallback() {
						// This code should pass in IE7... :(
						var messageElement = void 0;
						this.element.className = this.element.className + ' dz-browser-not-supported';

						for (
							var _iterator2 = this.element.getElementsByTagName('div'),
								_isArray2 = true,
								_i2 = 0,
								_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
							;

						) {
							var _ref2;

							if (_isArray2) {
								if (_i2 >= _iterator2.length) break;
								_ref2 = _iterator2[_i2++];
							} else {
								_i2 = _iterator2.next();
								if (_i2.done) break;
								_ref2 = _i2.value;
							}

							var child = _ref2;

							if (/(^| )dz-message($| )/.test(child.className)) {
								messageElement = child;
								child.className = 'dz-message'; // Removes the 'dz-default' class
								break;
							}
						}
						if (!messageElement) {
							messageElement = Dropzone.createElement('<div class="dz-message"><span></span></div>');
							this.element.appendChild(messageElement);
						}

						var span = messageElement.getElementsByTagName('span')[0];
						if (span) {
							if (span.textContent != null) {
								span.textContent = this.options.dictFallbackMessage;
							} else if (span.innerText != null) {
								span.innerText = this.options.dictFallbackMessage;
							}
						}

						return this.element.appendChild(this.getFallbackForm());
					},

					/**
					 * Gets called to calculate the thumbnail dimensions.
					 *
					 * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
					 *
					 *  - `srcWidth` & `srcHeight` (required)
					 *  - `trgWidth` & `trgHeight` (required)
					 *  - `srcX` & `srcY` (optional, default `0`)
					 *  - `trgX` & `trgY` (optional, default `0`)
					 *
					 * Those values are going to be used by `ctx.drawImage()`.
					 */
					resize: function resize(file, width, height, resizeMethod) {
						var info = {
							srcX: 0,
							srcY: 0,
							srcWidth: file.width,
							srcHeight: file.height,
						};

						var srcRatio = file.width / file.height;

						// Automatically calculate dimensions if not specified
						if (width == null && height == null) {
							width = info.srcWidth;
							height = info.srcHeight;
						} else if (width == null) {
							width = height * srcRatio;
						} else if (height == null) {
							height = width / srcRatio;
						}

						// Make sure images aren't upscaled
						width = Math.min(width, info.srcWidth);
						height = Math.min(height, info.srcHeight);

						var trgRatio = width / height;

						if (info.srcWidth > width || info.srcHeight > height) {
							// Image is bigger and needs rescaling
							if (resizeMethod === 'crop') {
								if (srcRatio > trgRatio) {
									info.srcHeight = file.height;
									info.srcWidth = info.srcHeight * trgRatio;
								} else {
									info.srcWidth = file.width;
									info.srcHeight = info.srcWidth / trgRatio;
								}
							} else if (resizeMethod === 'contain') {
								// Method 'contain'
								if (srcRatio > trgRatio) {
									height = width / srcRatio;
								} else {
									width = height * srcRatio;
								}
							} else {
								throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
							}
						}

						info.srcX = (file.width - info.srcWidth) / 2;
						info.srcY = (file.height - info.srcHeight) / 2;

						info.trgWidth = width;
						info.trgHeight = height;

						return info;
					},

					/**
					 * Can be used to transform the file (for example, resize an image if necessary).
					 *
					 * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
					 * images according to those dimensions.
					 *
					 * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
					 * to be invoked with the file when the transformation is done.
					 */
					transformFile: function transformFile(file, done) {
						if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
							return this.resizeImage(
								file,
								this.options.resizeWidth,
								this.options.resizeHeight,
								this.options.resizeMethod,
								done
							);
						} else {
							return done(file);
						}
					},

					/**
					 * A string that contains the template used for each dropped
					 * file. Change it to fulfill your needs but make sure to properly
					 * provide all elements.
					 *
					 * If you want to use an actual HTML element instead of providing a String
					 * as a config option, you could create a div with the id `tpl`,
					 * put the template inside it and provide the element like this:
					 *
					 *     document
					 *       .querySelector('#tpl')
					 *       .innerHTML
					 *
					 */
					previewTemplate:
						'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',

					// END OPTIONS
					// (Required by the dropzone documentation parser)

					/*
         Those functions register themselves to the events on init and handle all
         the user interface specific stuff. Overwriting them won't break the upload
         but can break the way it's displayed.
         You can overwrite them if you don't like the default behavior. If you just
         want to add an additional event handler, register it on the dropzone object
         and don't overwrite those options.
         */

					// Those are self explanatory and simply concern the DragnDrop.
					drop: function drop(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					dragstart: function dragstart(e) {},
					dragend: function dragend(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					dragenter: function dragenter(e) {
						return this.element.classList.add('dz-drag-hover');
					},
					dragover: function dragover(e) {
						return this.element.classList.add('dz-drag-hover');
					},
					dragleave: function dragleave(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					paste: function paste(e) {},

					// Called whenever there are no files left in the dropzone anymore, and the
					// dropzone should be displayed as if in the initial state.
					reset: function reset() {
						return this.element.classList.remove('dz-started');
					},

					// Called when a file is added to the queue
					// Receives `file`
					addedfile: function addedfile(file) {
						var _this2 = this;

						if (this.element === this.previewsContainer) {
							this.element.classList.add('dz-started');
						}

						if (this.previewsContainer) {
							file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
							file.previewTemplate = file.previewElement; // Backwards compatibility

							this.previewsContainer.appendChild(file.previewElement);
							for (
								var _iterator3 = file.previewElement.querySelectorAll('[data-dz-name]'),
									_isArray3 = true,
									_i3 = 0,
									_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();
								;

							) {
								var _ref3;

								if (_isArray3) {
									if (_i3 >= _iterator3.length) break;
									_ref3 = _iterator3[_i3++];
								} else {
									_i3 = _iterator3.next();
									if (_i3.done) break;
									_ref3 = _i3.value;
								}

								var node = _ref3;

								node.textContent = file.name;
							}
							for (
								var _iterator4 = file.previewElement.querySelectorAll('[data-dz-size]'),
									_isArray4 = true,
									_i4 = 0,
									_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();
								;

							) {
								if (_isArray4) {
									if (_i4 >= _iterator4.length) break;
									node = _iterator4[_i4++];
								} else {
									_i4 = _iterator4.next();
									if (_i4.done) break;
									node = _i4.value;
								}

								node.innerHTML = this.filesize(file.size);
							}

							if (this.options.addRemoveLinks) {
								file._removeLink = Dropzone.createElement(
									'<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' +
										this.options.dictRemoveFile +
										'</a>'
								);
								file.previewElement.appendChild(file._removeLink);
							}

							var removeFileEvent = function removeFileEvent(e) {
								e.preventDefault();
								e.stopPropagation();
								if (file.status === Dropzone.UPLOADING) {
									return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function() {
										return _this2.removeFile(file);
									});
								} else {
									if (_this2.options.dictRemoveFileConfirmation) {
										return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function() {
											return _this2.removeFile(file);
										});
									} else {
										return _this2.removeFile(file);
									}
								}
							};

							for (
								var _iterator5 = file.previewElement.querySelectorAll('[data-dz-remove]'),
									_isArray5 = true,
									_i5 = 0,
									_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();
								;

							) {
								var _ref4;

								if (_isArray5) {
									if (_i5 >= _iterator5.length) break;
									_ref4 = _iterator5[_i5++];
								} else {
									_i5 = _iterator5.next();
									if (_i5.done) break;
									_ref4 = _i5.value;
								}

								var removeLink = _ref4;

								removeLink.addEventListener('click', removeFileEvent);
							}
						}
					},

					// Called whenever a file is removed.
					removedfile: function removedfile(file) {
						if (file.previewElement != null && file.previewElement.parentNode != null) {
							file.previewElement.parentNode.removeChild(file.previewElement);
						}
						return this._updateMaxFilesReachedClass();
					},

					// Called when a thumbnail has been generated
					// Receives `file` and `dataUrl`
					thumbnail: function thumbnail(file, dataUrl) {
						if (file.previewElement) {
							file.previewElement.classList.remove('dz-file-preview');
							for (
								var _iterator6 = file.previewElement.querySelectorAll('[data-dz-thumbnail]'),
									_isArray6 = true,
									_i6 = 0,
									_iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();
								;

							) {
								var _ref5;

								if (_isArray6) {
									if (_i6 >= _iterator6.length) break;
									_ref5 = _iterator6[_i6++];
								} else {
									_i6 = _iterator6.next();
									if (_i6.done) break;
									_ref5 = _i6.value;
								}

								var thumbnailElement = _ref5;

								thumbnailElement.alt = file.name;
								thumbnailElement.src = dataUrl;
							}

							return setTimeout(function() {
								return file.previewElement.classList.add('dz-image-preview');
							}, 1);
						}
					},

					// Called whenever an error occurs
					// Receives `file` and `message`
					error: function error(file, message) {
						if (file.previewElement) {
							file.previewElement.classList.add('dz-error');
							if (typeof message !== 'String' && message.error) {
								message = message.error;
							}
							for (
								var _iterator7 = file.previewElement.querySelectorAll('[data-dz-errormessage]'),
									_isArray7 = true,
									_i7 = 0,
									_iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();
								;

							) {
								var _ref6;

								if (_isArray7) {
									if (_i7 >= _iterator7.length) break;
									_ref6 = _iterator7[_i7++];
								} else {
									_i7 = _iterator7.next();
									if (_i7.done) break;
									_ref6 = _i7.value;
								}

								var node = _ref6;

								node.textContent = message;
							}
						}
					},
					errormultiple: function errormultiple() {},

					// Called when a file gets processed. Since there is a cue, not all added
					// files are processed immediately.
					// Receives `file`
					processing: function processing(file) {
						if (file.previewElement) {
							file.previewElement.classList.add('dz-processing');
							if (file._removeLink) {
								return (file._removeLink.textContent = this.options.dictCancelUpload);
							}
						}
					},
					processingmultiple: function processingmultiple() {},

					// Called whenever the upload progress gets updated.
					// Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
					// To get the total number of bytes of the file, use `file.size`
					uploadprogress: function uploadprogress(file, progress, bytesSent) {
						if (file.previewElement) {
							for (
								var _iterator8 = file.previewElement.querySelectorAll('[data-dz-uploadprogress]'),
									_isArray8 = true,
									_i8 = 0,
									_iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();
								;

							) {
								var _ref7;

								if (_isArray8) {
									if (_i8 >= _iterator8.length) break;
									_ref7 = _iterator8[_i8++];
								} else {
									_i8 = _iterator8.next();
									if (_i8.done) break;
									_ref7 = _i8.value;
								}

								var node = _ref7;

								node.nodeName === 'PROGRESS' ? (node.value = progress) : (node.style.width = progress + '%');
							}
						}
					},

					// Called whenever the total upload progress gets updated.
					// Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
					totaluploadprogress: function totaluploadprogress() {},

					// Called just before the file is sent. Gets the `xhr` object as second
					// parameter, so you can modify it (for example to add a CSRF token) and a
					// `formData` object to add additional information.
					sending: function sending() {},
					sendingmultiple: function sendingmultiple() {},

					// When the complete upload is finished and successful
					// Receives `file`
					success: function success(file) {
						if (file.previewElement) {
							return file.previewElement.classList.add('dz-success');
						}
					},
					successmultiple: function successmultiple() {},

					// When the upload is canceled.
					canceled: function canceled(file) {
						return this.emit('error', file, 'Upload canceled.');
					},
					canceledmultiple: function canceledmultiple() {},

					// When the upload is finished, either with success or an error.
					// Receives `file`
					complete: function complete(file) {
						if (file._removeLink) {
							file._removeLink.textContent = this.options.dictRemoveFile;
						}
						if (file.previewElement) {
							return file.previewElement.classList.add('dz-complete');
						}
					},
					completemultiple: function completemultiple() {},
					maxfilesexceeded: function maxfilesexceeded() {},
					maxfilesreached: function maxfilesreached() {},
					queuecomplete: function queuecomplete() {},
					addedfiles: function addedfiles() {},
				};

				this.prototype._thumbnailQueue = [];
				this.prototype._processingThumbnail = false;
			},

			// global utility
		},
		{
			key: 'extend',
			value: function extend(target) {
				for (
					var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;
					_key2 < _len2;
					_key2++
				) {
					objects[_key2 - 1] = arguments[_key2];
				}

				for (
					var _iterator9 = objects,
						_isArray9 = true,
						_i9 = 0,
						_iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();
					;

				) {
					var _ref8;

					if (_isArray9) {
						if (_i9 >= _iterator9.length) break;
						_ref8 = _iterator9[_i9++];
					} else {
						_i9 = _iterator9.next();
						if (_i9.done) break;
						_ref8 = _i9.value;
					}

					var object = _ref8;

					for (var key in object) {
						var val = object[key];
						target[key] = val;
					}
				}
				return target;
			},
		},
	]);

	function Dropzone(el, options) {
		_classCallCheck(this, Dropzone);

		var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this));

		var fallback = void 0,
			left = void 0;
		_this.element = el;
		// For backwards compatibility since the version was in the prototype previously
		_this.version = Dropzone.version;

		_this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, '');

		_this.clickableElements = [];
		_this.listeners = [];
		_this.files = []; // All files

		if (typeof _this.element === 'string') {
			_this.element = document.querySelector(_this.element);
		}

		// Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
		if (!_this.element || _this.element.nodeType == null) {
			throw new Error('Invalid dropzone element.');
		}

		if (_this.element.dropzone) {
			throw new Error('Dropzone already attached.');
		}

		// Now add this dropzone to the instances.
		Dropzone.instances.push(_this);

		// Put the dropzone inside the element itself.
		_this.element.dropzone = _this;

		var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};

		_this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {});

		// If the browser failed, just call the fallback and leave
		if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
			var _ret;

			return (_ret = _this.options.fallback.call(_this)), _possibleConstructorReturn(_this, _ret);
		}

		// @options.url = @element.getAttribute "action" unless @options.url?
		if (_this.options.url == null) {
			_this.options.url = _this.element.getAttribute('action');
		}

		if (!_this.options.url) {
			throw new Error('No URL provided.');
		}

		if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
			throw new Error(
				"You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated."
			);
		}

		if (_this.options.uploadMultiple && _this.options.chunking) {
			throw new Error('You cannot set both: uploadMultiple and chunking.');
		}

		// Backwards compatibility
		if (_this.options.acceptedMimeTypes) {
			_this.options.acceptedFiles = _this.options.acceptedMimeTypes;
			delete _this.options.acceptedMimeTypes;
		}

		// Backwards compatibility
		if (_this.options.renameFilename != null) {
			_this.options.renameFile = function(file) {
				return _this.options.renameFilename.call(_this, file.name, file);
			};
		}

		_this.options.method = _this.options.method.toUpperCase();

		if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
			// Remove the fallback
			fallback.parentNode.removeChild(fallback);
		}

		// Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
		if (_this.options.previewsContainer !== false) {
			if (_this.options.previewsContainer) {
				_this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, 'previewsContainer');
			} else {
				_this.previewsContainer = _this.element;
			}
		}

		if (_this.options.clickable) {
			if (_this.options.clickable === true) {
				_this.clickableElements = [_this.element];
			} else {
				_this.clickableElements = Dropzone.getElements(_this.options.clickable, 'clickable');
			}
		}

		_this.init();
		return _this;
	}

	// Returns all files that have been accepted

	_createClass(
		Dropzone,
		[
			{
				key: 'getAcceptedFiles',
				value: function getAcceptedFiles() {
					return this.files
						.filter(function(file) {
							return file.accepted;
						})
						.map(function(file) {
							return file;
						});
				},

				// Returns all files that have been rejected
				// Not sure when that's going to be useful, but added for completeness.
			},
			{
				key: 'getRejectedFiles',
				value: function getRejectedFiles() {
					return this.files
						.filter(function(file) {
							return !file.accepted;
						})
						.map(function(file) {
							return file;
						});
				},
			},
			{
				key: 'getFilesWithStatus',
				value: function getFilesWithStatus(status) {
					return this.files
						.filter(function(file) {
							return file.status === status;
						})
						.map(function(file) {
							return file;
						});
				},

				// Returns all files that are in the queue
			},
			{
				key: 'getQueuedFiles',
				value: function getQueuedFiles() {
					return this.getFilesWithStatus(Dropzone.QUEUED);
				},
			},
			{
				key: 'getUploadingFiles',
				value: function getUploadingFiles() {
					return this.getFilesWithStatus(Dropzone.UPLOADING);
				},
			},
			{
				key: 'getAddedFiles',
				value: function getAddedFiles() {
					return this.getFilesWithStatus(Dropzone.ADDED);
				},

				// Files that are either queued or uploading
			},
			{
				key: 'getActiveFiles',
				value: function getActiveFiles() {
					return this.files
						.filter(function(file) {
							return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
						})
						.map(function(file) {
							return file;
						});
				},

				// The function that gets called when Dropzone is initialized. You
				// can (and should) setup event listeners inside this function.
			},
			{
				key: 'init',
				value: function init() {
					var _this3 = this;

					// In case it isn't set already
					if (this.element.tagName === 'form') {
						this.element.setAttribute('enctype', 'multipart/form-data');
					}

					if (this.element.classList.contains('dropzone') && !this.element.querySelector('.dz-message')) {
						this.element.appendChild(
							Dropzone.createElement(
								'<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + '</span></div>'
							)
						);
					}

					if (this.clickableElements.length) {
						var setupHiddenFileInput = function setupHiddenFileInput() {
							if (_this3.hiddenFileInput) {
								_this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
							}

							// var dropZoneInput = document.querySelector('.dz-hidden-input');
							// if (dropZoneInput) { dropZoneInput.parentNode.removeChild(elem) };

							_this3.hiddenFileInput = document.createElement('input');
							_this3.hiddenFileInput.setAttribute('type', 'file');
							if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
								_this3.hiddenFileInput.setAttribute('multiple', 'multiple');
							}
							_this3.hiddenFileInput.className = 'dz-hidden-input';

							if (_this3.options.acceptedFiles !== null) {
								_this3.hiddenFileInput.setAttribute('accept', _this3.options.acceptedFiles);
							}
							if (_this3.options.capture !== null) {
								_this3.hiddenFileInput.setAttribute('capture', _this3.options.capture);
							}

							// Not setting `display="none"` because some browsers don't accept clicks
							// on elements that aren't displayed.
							_this3.hiddenFileInput.style.visibility = 'hidden';
							_this3.hiddenFileInput.style.position = 'absolute';
							_this3.hiddenFileInput.style.top = '0';
							_this3.hiddenFileInput.style.left = '0';
							_this3.hiddenFileInput.style.height = '0';
							_this3.hiddenFileInput.style.width = '0';
							document.querySelector(_this3.options.hiddenInputContainer).appendChild(_this3.hiddenFileInput);
							return _this3.hiddenFileInput.addEventListener('change', function() {
								var files = _this3.hiddenFileInput.files;

								if (files.length) {
									for (
										var _iterator10 = files,
											_isArray10 = true,
											_i10 = 0,
											_iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();
										;

									) {
										var _ref9;

										if (_isArray10) {
											if (_i10 >= _iterator10.length) break;
											_ref9 = _iterator10[_i10++];
										} else {
											_i10 = _iterator10.next();
											if (_i10.done) break;
											_ref9 = _i10.value;
										}

										var file = _ref9;

										_this3.addFile(file);
									}
								}
								_this3.emit('addedfiles', files);
								return setupHiddenFileInput();
							});
						};
						setupHiddenFileInput();
					}

					this.URL = window.URL !== null ? window.URL : window.webkitURL;

					// Setup all event listeners on the Dropzone object itself.
					// They're not in @setupEventListeners() because they shouldn't be removed
					// again when the dropzone gets disabled.
					for (
						var _iterator11 = this.events,
							_isArray11 = true,
							_i11 = 0,
							_iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();
						;

					) {
						var _ref10;

						if (_isArray11) {
							if (_i11 >= _iterator11.length) break;
							_ref10 = _iterator11[_i11++];
						} else {
							_i11 = _iterator11.next();
							if (_i11.done) break;
							_ref10 = _i11.value;
						}

						var eventName = _ref10;

						this.on(eventName, this.options[eventName]);
					}

					this.on('uploadprogress', function() {
						return _this3.updateTotalUploadProgress();
					});

					this.on('removedfile', function() {
						return _this3.updateTotalUploadProgress();
					});

					this.on('canceled', function(file) {
						return _this3.emit('complete', file);
					});

					// Emit a `queuecomplete` event if all files finished uploading.
					this.on('complete', function(file) {
						if (
							_this3.getAddedFiles().length === 0 &&
							_this3.getUploadingFiles().length === 0 &&
							_this3.getQueuedFiles().length === 0
						) {
							// This needs to be deferred so that `queuecomplete` really triggers after `complete`
							return setTimeout(function() {
								return _this3.emit('queuecomplete');
							}, 0);
						}
					});

					var noPropagation = function noPropagation(e) {
						e.stopPropagation();
						if (e.preventDefault) {
							return e.preventDefault();
						} else {
							return (e.returnValue = false);
						}
					};

					// Create the listeners
					this.listeners = [
						{
							element: this.element,
							events: {
								dragstart: function dragstart(e) {
									return _this3.emit('dragstart', e);
								},
								dragenter: function dragenter(e) {
									noPropagation(e);
									return _this3.emit('dragenter', e);
								},
								dragover: function dragover(e) {
									// Makes it possible to drag files from chrome's download bar
									// http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
									// Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
									var efct = void 0;
									try {
										efct = e.dataTransfer.effectAllowed;
									} catch (error) {}
									e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';

									noPropagation(e);
									return _this3.emit('dragover', e);
								},
								dragleave: function dragleave(e) {
									return _this3.emit('dragleave', e);
								},
								drop: function drop(e) {
									noPropagation(e);
									return _this3.drop(e);
								},
								dragend: function dragend(e) {
									return _this3.emit('dragend', e);
								},

								// This is disabled right now, because the browsers don't implement it properly.
								// "paste": (e) =>
								//   noPropagation e
								//   @paste e
							},
						},
					];

					this.clickableElements.forEach(function(clickableElement) {
						return _this3.listeners.push({
							element: clickableElement,
							events: {
								click: function click(evt) {
									// Only the actual dropzone or the message element should trigger file selection
									if (
										clickableElement !== _this3.element ||
										evt.target === _this3.element ||
										Dropzone.elementInside(evt.target, _this3.element.querySelector('.dz-message'))
									) {
										_this3.hiddenFileInput.click(); // Forward the click
									}
									return true;
								},
							},
						});
					});

					this.enable();

					return this.options.init.call(this);
				},

				// Not fully tested yet
			},
			{
				key: 'destroy',
				value: function destroy() {
					this.disable();
					this.removeAllFiles(true);
					if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
						this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
						this.hiddenFileInput = null;
					}
					delete this.element.dropzone;
					return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
				},
			},
			{
				key: 'updateTotalUploadProgress',
				value: function updateTotalUploadProgress() {
					var totalUploadProgress = void 0;
					var totalBytesSent = 0;
					var totalBytes = 0;

					var activeFiles = this.getActiveFiles();

					if (activeFiles.length) {
						for (
							var _iterator12 = this.getActiveFiles(),
								_isArray12 = true,
								_i12 = 0,
								_iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();
							;

						) {
							var _ref11;

							if (_isArray12) {
								if (_i12 >= _iterator12.length) break;
								_ref11 = _iterator12[_i12++];
							} else {
								_i12 = _iterator12.next();
								if (_i12.done) break;
								_ref11 = _i12.value;
							}

							var file = _ref11;

							totalBytesSent += file.upload.bytesSent;
							totalBytes += file.upload.total;
						}
						totalUploadProgress = (100 * totalBytesSent) / totalBytes;
					} else {
						totalUploadProgress = 100;
					}

					return this.emit('totaluploadprogress', totalUploadProgress, totalBytes, totalBytesSent);
				},

				// @options.paramName can be a function taking one parameter rather than a string.
				// A parameter name for a file is obtained simply by calling this with an index number.
			},
			{
				key: '_getParamName',
				value: function _getParamName(n) {
					if (typeof this.options.paramName === 'function') {
						return this.options.paramName(n);
					} else {
						return '' + this.options.paramName + (this.options.uploadMultiple ? '[' + n + ']' : '');
					}
				},

				// If @options.renameFile is a function,
				// the function will be used to rename the file.name before appending it to the formData
			},
			{
				key: '_renameFile',
				value: function _renameFile(file) {
					if (typeof this.options.renameFile !== 'function') {
						return file.name;
					}
					return this.options.renameFile(file);
				},

				// Returns a form that can be used as fallback if the browser does not support DragnDrop
				//
				// If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
				// This code has to pass in IE7 :(
			},
			{
				key: 'getFallbackForm',
				value: function getFallbackForm() {
					var existingFallback = void 0,
						form = void 0;
					if ((existingFallback = this.getExistingFallback())) {
						return existingFallback;
					}

					var fieldsString = '<div class="dz-fallback">';
					if (this.options.dictFallbackText) {
						fieldsString += '<p>' + this.options.dictFallbackText + '</p>';
					}
					fieldsString +=
						'<input type="file" name="' +
						this._getParamName(0) +
						'" ' +
						(this.options.uploadMultiple ? 'multiple="multiple"' : undefined) +
						' /><input type="submit" value="Upload!"></div>';

					var fields = Dropzone.createElement(fieldsString);
					if (this.element.tagName !== 'FORM') {
						form = Dropzone.createElement(
							'<form action="' +
								this.options.url +
								'" enctype="multipart/form-data" method="' +
								this.options.method +
								'"></form>'
						);
						form.appendChild(fields);
					} else {
						// Make sure that the enctype and method attributes are set properly
						this.element.setAttribute('enctype', 'multipart/form-data');
						this.element.setAttribute('method', this.options.method);
					}
					return form != null ? form : fields;
				},

				// Returns the fallback elements if they exist already
				//
				// This code has to pass in IE7 :(
			},
			{
				key: 'getExistingFallback',
				value: function getExistingFallback() {
					var getFallback = function getFallback(elements) {
						for (
							var _iterator13 = elements,
								_isArray13 = true,
								_i13 = 0,
								_iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();
							;

						) {
							var _ref12;

							if (_isArray13) {
								if (_i13 >= _iterator13.length) break;
								_ref12 = _iterator13[_i13++];
							} else {
								_i13 = _iterator13.next();
								if (_i13.done) break;
								_ref12 = _i13.value;
							}

							var el = _ref12;

							if (/(^| )fallback($| )/.test(el.className)) {
								return el;
							}
						}
					};

					var _arr = ['div', 'form'];
					for (var _i14 = 0; _i14 < _arr.length; _i14++) {
						var tagName = _arr[_i14];
						var fallback;
						if ((fallback = getFallback(this.element.getElementsByTagName(tagName)))) {
							return fallback;
						}
					}
				},

				// Activates all listeners stored in @listeners
			},
			{
				key: 'setupEventListeners',
				value: function setupEventListeners() {
					return this.listeners.map(function(elementListeners) {
						return (function() {
							var result = [];
							for (var event in elementListeners.events) {
								var listener = elementListeners.events[event];
								result.push(elementListeners.element.addEventListener(event, listener, false));
							}
							return result;
						})();
					});
				},

				// Deactivates all listeners stored in @listeners
			},
			{
				key: 'removeEventListeners',
				value: function removeEventListeners() {
					return this.listeners.map(function(elementListeners) {
						return (function() {
							var result = [];
							for (var event in elementListeners.events) {
								var listener = elementListeners.events[event];
								result.push(elementListeners.element.removeEventListener(event, listener, false));
							}
							return result;
						})();
					});
				},

				// Removes all event listeners and cancels all files in the queue or being processed.
			},
			{
				key: 'disable',
				value: function disable() {
					var _this4 = this;

					this.clickableElements.forEach(function(element) {
						return element.classList.remove('dz-clickable');
					});
					this.removeEventListeners();

					return this.files.map(function(file) {
						return _this4.cancelUpload(file);
					});
				},
			},
			{
				key: 'enable',
				value: function enable() {
					this.clickableElements.forEach(function(element) {
						return element.classList.add('dz-clickable');
					});
					return this.setupEventListeners();
				},

				// Returns a nicely formatted filesize
			},
			{
				key: 'filesize',
				value: function filesize(size) {
					var selectedSize = 0;
					var selectedUnit = 'b';

					if (size > 0) {
						var units = ['tb', 'gb', 'mb', 'kb', 'b'];

						for (var i = 0; i < units.length; i++) {
							var unit = units[i];
							var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

							if (size >= cutoff) {
								selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
								selectedUnit = unit;
								break;
							}
						}

						selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
					}

					return '<strong>' + selectedSize + '</strong> ' + this.options.dictFileSizeUnits[selectedUnit];
				},

				// Adds or removes the `dz-max-files-reached` class from the form.
			},
			{
				key: '_updateMaxFilesReachedClass',
				value: function _updateMaxFilesReachedClass() {
					if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
						if (this.getAcceptedFiles().length === this.options.maxFiles) {
							this.emit('maxfilesreached', this.files);
						}
						return this.element.classList.add('dz-max-files-reached');
					} else {
						return this.element.classList.remove('dz-max-files-reached');
					}
				},
			},
			{
				key: 'drop',
				value: function drop(e) {
					if (!e.dataTransfer) {
						return;
					}
					this.emit('drop', e);

					var files = e.dataTransfer.files;

					this.emit('addedfiles', files);

					// Even if it's a folder, files.length will contain the folders.
					if (files.length) {
						var items = e.dataTransfer.items;

						if (items && items.length && items[0].webkitGetAsEntry != null) {
							// The browser supports dropping of folders, so handle items instead of files
							this._addFilesFromItems(items);
						} else {
							this.handleFiles(files);
						}
					}
				},
			},
			{
				key: 'paste',
				value: function paste(e) {
					if (
						__guard__(e != null ? e.clipboardData : undefined, function(x) {
							return x.items;
						}) == null
					) {
						return;
					}

					this.emit('paste', e);
					var items = e.clipboardData.items;

					if (items.length) {
						return this._addFilesFromItems(items);
					}
				},
			},
			{
				key: 'handleFiles',
				value: function handleFiles(files) {
					var _this5 = this;

					return files.map(function(file) {
						return _this5.addFile(file);
					});
				},

				// When a folder is dropped (or files are pasted), items must be handled
				// instead of files.
			},
			{
				key: '_addFilesFromItems',
				value: function _addFilesFromItems(items) {
					var _this6 = this;

					return (function() {
						var result = [];
						for (
							var _iterator14 = items,
								_isArray14 = true,
								_i15 = 0,
								_iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();
							;

						) {
							var _ref13;

							if (_isArray14) {
								if (_i15 >= _iterator14.length) break;
								_ref13 = _iterator14[_i15++];
							} else {
								_i15 = _iterator14.next();
								if (_i15.done) break;
								_ref13 = _i15.value;
							}

							var item = _ref13;

							var entry;
							if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
								if (entry.isFile) {
									result.push(_this6.addFile(item.getAsFile()));
								} else if (entry.isDirectory) {
									// Append all files from that directory to files
									result.push(_this6._addFilesFromDirectory(entry, entry.name));
								} else {
									result.push(undefined);
								}
							} else if (item.getAsFile != null) {
								if (item.kind == null || item.kind === 'file') {
									result.push(_this6.addFile(item.getAsFile()));
								} else {
									result.push(undefined);
								}
							} else {
								result.push(undefined);
							}
						}
						return result;
					})();
				},

				// Goes through the directory, and adds each file it finds recursively
			},
			{
				key: '_addFilesFromDirectory',
				value: function _addFilesFromDirectory(directory, path) {
					var _this7 = this;

					var dirReader = directory.createReader();

					var errorHandler = function errorHandler(error) {
						return __guardMethod__(console, 'log', function(o) {
							return o.log(error);
						});
					};

					var readEntries = function readEntries() {
						return dirReader.readEntries(function(entries) {
							if (entries.length > 0) {
								for (
									var _iterator15 = entries,
										_isArray15 = true,
										_i16 = 0,
										_iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();
									;

								) {
									var _ref14;

									if (_isArray15) {
										if (_i16 >= _iterator15.length) break;
										_ref14 = _iterator15[_i16++];
									} else {
										_i16 = _iterator15.next();
										if (_i16.done) break;
										_ref14 = _i16.value;
									}

									var entry = _ref14;

									if (entry.isFile) {
										entry.file(function(file) {
											if (_this7.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
												return;
											}
											file.fullPath = path + '/' + file.name;
											return _this7.addFile(file);
										});
									} else if (entry.isDirectory) {
										_this7._addFilesFromDirectory(entry, path + '/' + entry.name);
									}
								}

								// Recursively call readEntries() again, since browser only handle
								// the first 100 entries.
								// See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
								readEntries();
							}
							return null;
						}, errorHandler);
					};

					return readEntries();
				},

				// If `done()` is called without argument the file is accepted
				// If you call it with an error message, the file is rejected
				// (This allows for asynchronous validation)
				//
				// This function checks the filesize, and if the file.type passes the
				// `acceptedFiles` check.
			},
			{
				key: 'accept',
				value: function accept(file, done) {
					if (file.size > this.options.maxFilesize * 1024 * 1024) {
						return done(
							this.options.dictFileTooBig
								.replace('{{filesize}}', Math.round(file.size / 1024 / 10.24) / 100)
								.replace('{{maxFilesize}}', this.options.maxFilesize)
						);
					} else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
						return done(this.options.dictInvalidFileType);
					} else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
						done(this.options.dictMaxFilesExceeded.replace('{{maxFiles}}', this.options.maxFiles));
						return this.emit('maxfilesexceeded', file);
					} else {
						return this.options.accept.call(this, file, done);
					}
				},
			},
			{
				key: 'addFile',
				value: function addFile(file) {
					var _this8 = this;

					file.upload = {
						uuid: Dropzone.uuidv4(),
						progress: 0,
						// Setting the total upload size to file.size for the beginning
						// It's actual different than the size to be transmitted.
						total: file.size,
						bytesSent: 0,
						filename: this._renameFile(file),
						chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),
						totalChunkCount: Math.ceil(file.size / this.options.chunkSize),
					};
					this.files.push(file);

					file.status = Dropzone.ADDED;

					this.emit('addedfile', file);

					this._enqueueThumbnail(file);

					return this.accept(file, function(error) {
						if (error) {
							file.accepted = false;
							_this8._errorProcessing([file], error); // Will set the file.status
						} else {
							file.accepted = true;
							if (_this8.options.autoQueue) {
								_this8.enqueueFile(file);
							} // Will set .accepted = true
						}
						return _this8._updateMaxFilesReachedClass();
					});
				},

				// Wrapper for enqueueFile
			},
			{
				key: 'enqueueFiles',
				value: function enqueueFiles(files) {
					for (
						var _iterator16 = files,
							_isArray16 = true,
							_i17 = 0,
							_iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();
						;

					) {
						var _ref15;

						if (_isArray16) {
							if (_i17 >= _iterator16.length) break;
							_ref15 = _iterator16[_i17++];
						} else {
							_i17 = _iterator16.next();
							if (_i17.done) break;
							_ref15 = _i17.value;
						}

						var file = _ref15;

						this.enqueueFile(file);
					}
					return null;
				},
			},
			{
				key: 'enqueueFile',
				value: function enqueueFile(file) {
					var _this9 = this;

					if (file.status === Dropzone.ADDED && file.accepted === true) {
						file.status = Dropzone.QUEUED;
						if (this.options.autoProcessQueue) {
							return setTimeout(function() {
								return _this9.processQueue();
							}, 0); // Deferring the call
						}
					} else {
						throw new Error("This file can't be queued because it has already been processed or was rejected.");
					}
				},
			},
			{
				key: '_enqueueThumbnail',
				value: function _enqueueThumbnail(file) {
					var _this10 = this;

					if (
						this.options.createImageThumbnails &&
						file.type.match(/image.*/) &&
						file.size <= this.options.maxThumbnailFilesize * 1024 * 1024
					) {
						this._thumbnailQueue.push(file);
						return setTimeout(function() {
							return _this10._processThumbnailQueue();
						}, 0); // Deferring the call
					}
				},
			},
			{
				key: '_processThumbnailQueue',
				value: function _processThumbnailQueue() {
					var _this11 = this;

					if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
						return;
					}

					this._processingThumbnail = true;
					var file = this._thumbnailQueue.shift();
					return this.createThumbnail(
						file,
						this.options.thumbnailWidth,
						this.options.thumbnailHeight,
						this.options.thumbnailMethod,
						true,
						function(dataUrl) {
							_this11.emit('thumbnail', file, dataUrl);
							_this11._processingThumbnail = false;
							return _this11._processThumbnailQueue();
						}
					);
				},

				// Can be called by the user to remove a file
			},
			{
				key: 'removeFile',
				value: function removeFile(file) {
					if (file.status === Dropzone.UPLOADING) {
						this.cancelUpload(file);
					}
					this.files = without(this.files, file);

					this.emit('removedfile', file);
					if (this.files.length === 0) {
						return this.emit('reset');
					}
				},

				// Removes all files that aren't currently processed from the list
			},
			{
				key: 'removeAllFiles',
				value: function removeAllFiles(cancelIfNecessary) {
					// Create a copy of files since removeFile() changes the @files array.
					if (cancelIfNecessary == null) {
						cancelIfNecessary = false;
					}
					for (
						var _iterator17 = this.files.slice(),
							_isArray17 = true,
							_i18 = 0,
							_iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();
						;

					) {
						var _ref16;

						if (_isArray17) {
							if (_i18 >= _iterator17.length) break;
							_ref16 = _iterator17[_i18++];
						} else {
							_i18 = _iterator17.next();
							if (_i18.done) break;
							_ref16 = _i18.value;
						}

						var file = _ref16;

						if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
							this.removeFile(file);
						}
					}
					return null;
				},

				// Resizes an image before it gets sent to the server. This function is the default behavior of
				// `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
				// the resized blob.
			},
			{
				key: 'resizeImage',
				value: function resizeImage(file, width, height, resizeMethod, callback) {
					var _this12 = this;

					return this.createThumbnail(file, width, height, resizeMethod, false, function(dataUrl, canvas) {
						if (canvas === null) {
							// The image has not been resized
							return callback(file);
						} else {
							var resizeMimeType = _this12.options.resizeMimeType;

							if (resizeMimeType == null) {
								resizeMimeType = file.type;
							}
							var resizedDataURL = canvas.toDataURL(resizeMimeType, _this12.options.resizeQuality);
							if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
								// Now add the original EXIF information
								resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
							}
							return callback(Dropzone.dataURItoBlob(resizedDataURL));
						}
					});
				},
			},
			{
				key: 'createThumbnail',
				value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
					var _this13 = this;

					var fileReader = new FileReader();

					fileReader.onload = function() {
						file.dataURL = fileReader.result;

						// Don't bother creating a thumbnail for SVG images since they're vector
						if (file.type === 'image/svg+xml') {
							if (callback != null) {
								callback(fileReader.result);
							}
							return;
						}

						return _this13.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
					};

					return fileReader.readAsDataURL(file);
				},
			},
			{
				key: 'createThumbnailFromUrl',
				value: function createThumbnailFromUrl(
					file,
					width,
					height,
					resizeMethod,
					fixOrientation,
					callback,
					crossOrigin
				) {
					var _this14 = this;

					// Not using `new Image` here because of a bug in latest Chrome versions.
					// See https://github.com/enyo/dropzone/pull/226
					var img = document.createElement('img');

					if (crossOrigin) {
						img.crossOrigin = crossOrigin;
					}

					img.onload = function() {
						var loadExif = function loadExif(callback) {
							return callback(1);
						};
						if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
							loadExif = function loadExif(callback) {
								return EXIF.getData(img, function() {
									return callback(EXIF.getTag(this, 'Orientation'));
								});
							};
						}

						return loadExif(function(orientation) {
							file.width = img.width;
							file.height = img.height;

							var resizeInfo = _this14.options.resize.call(_this14, file, width, height, resizeMethod);

							var canvas = document.createElement('canvas');
							var ctx = canvas.getContext('2d');

							canvas.width = resizeInfo.trgWidth;
							canvas.height = resizeInfo.trgHeight;

							if (orientation > 4) {
								canvas.width = resizeInfo.trgHeight;
								canvas.height = resizeInfo.trgWidth;
							}

							switch (orientation) {
								case 2:
									// horizontal flip
									ctx.translate(canvas.width, 0);
									ctx.scale(-1, 1);
									break;
								case 3:
									// 180° rotate left
									ctx.translate(canvas.width, canvas.height);
									ctx.rotate(Math.PI);
									break;
								case 4:
									// vertical flip
									ctx.translate(0, canvas.height);
									ctx.scale(1, -1);
									break;
								case 5:
									// vertical flip + 90 rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.scale(1, -1);
									break;
								case 6:
									// 90° rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.translate(0, -canvas.height);
									break;
								case 7:
									// horizontal flip + 90 rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.translate(canvas.width, -canvas.height);
									ctx.scale(-1, 1);
									break;
								case 8:
									// 90° rotate left
									ctx.rotate(-0.5 * Math.PI);
									ctx.translate(-canvas.width, 0);
									break;
							}

							// This is a bugfix for iOS' scaling bug.
							drawImageIOSFix(
								ctx,
								img,
								resizeInfo.srcX != null ? resizeInfo.srcX : 0,
								resizeInfo.srcY != null ? resizeInfo.srcY : 0,
								resizeInfo.srcWidth,
								resizeInfo.srcHeight,
								resizeInfo.trgX != null ? resizeInfo.trgX : 0,
								resizeInfo.trgY != null ? resizeInfo.trgY : 0,
								resizeInfo.trgWidth,
								resizeInfo.trgHeight
							);

							var thumbnail = canvas.toDataURL('image/png');

							if (callback != null) {
								return callback(thumbnail, canvas);
							}
						});
					};

					if (callback != null) {
						img.onerror = callback;
					}

					return (img.src = file.dataURL);
				},

				// Goes through the queue and processes files if there aren't too many already.
			},
			{
				key: 'processQueue',
				value: function processQueue() {
					var parallelUploads = this.options.parallelUploads;

					var processingLength = this.getUploadingFiles().length;
					var i = processingLength;

					// There are already at least as many files uploading than should be
					if (processingLength >= parallelUploads) {
						return;
					}

					var queuedFiles = this.getQueuedFiles();

					if (!(queuedFiles.length > 0)) {
						return;
					}

					if (this.options.uploadMultiple) {
						// The files should be uploaded in one request
						return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
					} else {
						while (i < parallelUploads) {
							if (!queuedFiles.length) {
								return;
							} // Nothing left to process
							this.processFile(queuedFiles.shift());
							i++;
						}
					}
				},

				// Wrapper for `processFiles`
			},
			{
				key: 'processFile',
				value: function processFile(file) {
					return this.processFiles([file]);
				},

				// Loads the file, then calls finishedLoading()
			},
			{
				key: 'processFiles',
				value: function processFiles(files) {
					for (
						var _iterator18 = files,
							_isArray18 = true,
							_i19 = 0,
							_iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();
						;

					) {
						var _ref17;

						if (_isArray18) {
							if (_i19 >= _iterator18.length) break;
							_ref17 = _iterator18[_i19++];
						} else {
							_i19 = _iterator18.next();
							if (_i19.done) break;
							_ref17 = _i19.value;
						}

						var file = _ref17;

						file.processing = true; // Backwards compatibility
						file.status = Dropzone.UPLOADING;

						this.emit('processing', file);
					}

					if (this.options.uploadMultiple) {
						this.emit('processingmultiple', files);
					}

					return this.uploadFiles(files);
				},
			},
			{
				key: '_getFilesWithXhr',
				value: function _getFilesWithXhr(xhr) {
					var files = void 0;
					return (files = this.files
						.filter(function(file) {
							return file.xhr === xhr;
						})
						.map(function(file) {
							return file;
						}));
				},

				// Cancels the file upload and sets the status to CANCELED
				// **if** the file is actually being uploaded.
				// If it's still in the queue, the file is being removed from it and the status
				// set to CANCELED.
			},
			{
				key: 'cancelUpload',
				value: function cancelUpload(file) {
					if (file.status === Dropzone.UPLOADING) {
						var groupedFiles = this._getFilesWithXhr(file.xhr);
						for (
							var _iterator19 = groupedFiles,
								_isArray19 = true,
								_i20 = 0,
								_iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();
							;

						) {
							var _ref18;

							if (_isArray19) {
								if (_i20 >= _iterator19.length) break;
								_ref18 = _iterator19[_i20++];
							} else {
								_i20 = _iterator19.next();
								if (_i20.done) break;
								_ref18 = _i20.value;
							}

							var groupedFile = _ref18;

							groupedFile.status = Dropzone.CANCELED;
						}
						if (typeof file.xhr !== 'undefined') {
							file.xhr.abort();
						}
						for (
							var _iterator20 = groupedFiles,
								_isArray20 = true,
								_i21 = 0,
								_iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();
							;

						) {
							var _ref19;

							if (_isArray20) {
								if (_i21 >= _iterator20.length) break;
								_ref19 = _iterator20[_i21++];
							} else {
								_i21 = _iterator20.next();
								if (_i21.done) break;
								_ref19 = _i21.value;
							}

							var _groupedFile = _ref19;

							this.emit('canceled', _groupedFile);
						}
						if (this.options.uploadMultiple) {
							this.emit('canceledmultiple', groupedFiles);
						}
					} else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
						file.status = Dropzone.CANCELED;
						this.emit('canceled', file);
						if (this.options.uploadMultiple) {
							this.emit('canceledmultiple', [file]);
						}
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},
			},
			{
				key: 'resolveOption',
				value: function resolveOption(option) {
					if (typeof option === 'function') {
						for (
							var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1;
							_key3 < _len3;
							_key3++
						) {
							args[_key3 - 1] = arguments[_key3];
						}

						return option.apply(this, args);
					}
					return option;
				},
			},
			{
				key: 'uploadFile',
				value: function uploadFile(file) {
					return this.uploadFiles([file]);
				},
			},
			{
				key: 'uploadFiles',
				value: function uploadFiles(files) {
					var _this15 = this;

					this._transformFiles(files, function(transformedFiles) {
						if (files[0].upload.chunked) {
							// This file should be sent in chunks!

							// If the chunking option is set, we **know** that there can only be **one** file, since
							// uploadMultiple is not allowed with this option.
							var file = files[0];
							var transformedFile = transformedFiles[0];
							var startedChunkCount = 0;

							file.upload.chunks = [];

							var handleNextChunk = function handleNextChunk() {
								var chunkIndex = 0;

								// Find the next item in file.upload.chunks that is not defined yet.
								while (file.upload.chunks[chunkIndex] !== undefined) {
									chunkIndex++;
								}

								// This means, that all chunks have already been started.
								if (chunkIndex >= file.upload.totalChunkCount) return;

								startedChunkCount++;

								var start = chunkIndex * _this15.options.chunkSize;
								var end = Math.min(start + _this15.options.chunkSize, file.size);

								var dataBlock = {
									name: _this15._getParamName(0),
									data: transformedFile.webkitSlice
										? transformedFile.webkitSlice(start, end)
										: transformedFile.slice(start, end),
									filename: file.upload.filename,
									chunkIndex: chunkIndex,
								};

								file.upload.chunks[chunkIndex] = {
									file: file,
									index: chunkIndex,
									dataBlock: dataBlock, // In case we want to retry.
									status: Dropzone.UPLOADING,
									progress: 0,
									retries: 0, // The number of times this block has been retried.
								};

								_this15._uploadData(files, [dataBlock]);
							};

							file.upload.finishedChunkUpload = function(chunk) {
								var allFinished = true;
								chunk.status = Dropzone.SUCCESS;

								// Clear the data from the chunk
								chunk.dataBlock = null;

								for (var i = 0; i < file.upload.totalChunkCount; i++) {
									if (file.upload.chunks[i] === undefined) {
										return handleNextChunk();
									}
									if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
										allFinished = false;
									}
								}

								if (allFinished) {
									_this15.options.chunksUploaded(file, function() {
										_this15._finished(files, '', null);
									});
								}
							};

							if (_this15.options.parallelChunkUploads) {
								for (var i = 0; i < file.upload.totalChunkCount; i++) {
									handleNextChunk();
								}
							} else {
								handleNextChunk();
							}
						} else {
							var dataBlocks = [];
							for (var _i22 = 0; _i22 < files.length; _i22++) {
								dataBlocks[_i22] = {
									name: _this15._getParamName(_i22),
									data: transformedFiles[_i22],
									filename: files[_i22].upload.filename,
								};
							}
							_this15._uploadData(files, dataBlocks);
						}
					});
				},

				/// Returns the right chunk for given file and xhr
			},
			{
				key: '_getChunk',
				value: function _getChunk(file, xhr) {
					for (var i = 0; i < file.upload.totalChunkCount; i++) {
						if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
							return file.upload.chunks[i];
						}
					}
				},

				// This function actually uploads the file(s) to the server.
				// If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
				// files, or individual chunks for chunked upload).
			},
			{
				key: '_uploadData',
				value: function _uploadData(files, dataBlocks) {
					var _this16 = this;

					var xhr = new XMLHttpRequest();

					// Put the xhr object in the file objects to be able to reference it later.
					for (
						var _iterator21 = files,
							_isArray21 = true,
							_i23 = 0,
							_iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();
						;

					) {
						var _ref20;

						if (_isArray21) {
							if (_i23 >= _iterator21.length) break;
							_ref20 = _iterator21[_i23++];
						} else {
							_i23 = _iterator21.next();
							if (_i23.done) break;
							_ref20 = _i23.value;
						}

						var file = _ref20;

						file.xhr = xhr;
					}
					if (files[0].upload.chunked) {
						// Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
						files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
					}

					var method = this.resolveOption(this.options.method, files);
					var url = this.resolveOption(this.options.url, files);
					xhr.open(method, url, true);

					// Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
					xhr.timeout = this.resolveOption(this.options.timeout, files);

					// Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
					xhr.withCredentials = !!this.options.withCredentials;

					xhr.onload = function(e) {
						_this16._finishedUploading(files, xhr, e);
					};

					xhr.onerror = function() {
						_this16._handleUploadError(files, xhr);
					};

					// Some browsers do not have the .upload property
					var progressObj = xhr.upload != null ? xhr.upload : xhr;
					progressObj.onprogress = function(e) {
						return _this16._updateFilesUploadProgress(files, xhr, e);
					};

					var headers = {
						Accept: 'application/json',
						'Cache-Control': 'no-cache',
						'X-Requested-With': 'XMLHttpRequest',
					};

					if (this.options.headers) {
						Dropzone.extend(headers, this.options.headers);
					}

					for (var headerName in headers) {
						var headerValue = headers[headerName];
						if (headerValue) {
							xhr.setRequestHeader(headerName, headerValue);
						}
					}

					var formData = new FormData();

					// Adding all @options parameters
					if (this.options.params) {
						var additionalParams = this.options.params;
						if (typeof additionalParams === 'function') {
							additionalParams = additionalParams.call(
								this,
								files,
								xhr,
								files[0].upload.chunked ? this._getChunk(files[0], xhr) : null
							);
						}

						for (var key in additionalParams) {
							var value = additionalParams[key];
							formData.append(key, value);
						}
					}

					// Let the user add additional data if necessary
					for (
						var _iterator22 = files,
							_isArray22 = true,
							_i24 = 0,
							_iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();
						;

					) {
						var _ref21;

						if (_isArray22) {
							if (_i24 >= _iterator22.length) break;
							_ref21 = _iterator22[_i24++];
						} else {
							_i24 = _iterator22.next();
							if (_i24.done) break;
							_ref21 = _i24.value;
						}

						var _file = _ref21;

						this.emit('sending', _file, xhr, formData);
					}
					if (this.options.uploadMultiple) {
						this.emit('sendingmultiple', files, xhr, formData);
					}

					this._addFormElementData(formData);

					// Finally add the files
					// Has to be last because some servers (eg: S3) expect the file to be the last parameter
					for (var i = 0; i < dataBlocks.length; i++) {
						var dataBlock = dataBlocks[i];
						formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
					}

					this.submitRequest(xhr, formData, files);
				},

				// Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
			},
			{
				key: '_transformFiles',
				value: function _transformFiles(files, done) {
					var _this17 = this;

					var transformedFiles = [];
					// Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
					var doneCounter = 0;

					var _loop = function _loop(i) {
						_this17.options.transformFile.call(_this17, files[i], function(transformedFile) {
							transformedFiles[i] = transformedFile;
							if (++doneCounter === files.length) {
								done(transformedFiles);
							}
						});
					};

					for (var i = 0; i < files.length; i++) {
						_loop(i);
					}
				},

				// Takes care of adding other input elements of the form to the AJAX request
			},
			{
				key: '_addFormElementData',
				value: function _addFormElementData(formData) {
					// Take care of other input elements
					if (this.element.tagName === 'FORM') {
						for (
							var _iterator23 = this.element.querySelectorAll('input, textarea, select, button'),
								_isArray23 = true,
								_i25 = 0,
								_iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();
							;

						) {
							var _ref22;

							if (_isArray23) {
								if (_i25 >= _iterator23.length) break;
								_ref22 = _iterator23[_i25++];
							} else {
								_i25 = _iterator23.next();
								if (_i25.done) break;
								_ref22 = _i25.value;
							}

							var input = _ref22;

							var inputName = input.getAttribute('name');
							var inputType = input.getAttribute('type');
							if (inputType) inputType = inputType.toLowerCase();

							// If the input doesn't have a name, we can't use it.
							if (typeof inputName === 'undefined' || inputName === null) continue;

							if (input.tagName === 'SELECT' && input.hasAttribute('multiple')) {
								// Possibly multiple values
								for (
									var _iterator24 = input.options,
										_isArray24 = true,
										_i26 = 0,
										_iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();
									;

								) {
									var _ref23;

									if (_isArray24) {
										if (_i26 >= _iterator24.length) break;
										_ref23 = _iterator24[_i26++];
									} else {
										_i26 = _iterator24.next();
										if (_i26.done) break;
										_ref23 = _i26.value;
									}

									var option = _ref23;

									if (option.selected) {
										formData.append(inputName, option.value);
									}
								}
							} else if (!inputType || (inputType !== 'checkbox' && inputType !== 'radio') || input.checked) {
								formData.append(inputName, input.value);
							}
						}
					}
				},

				// Invoked when there is new progress information about given files.
				// If e is not provided, it is assumed that the upload is finished.
			},
			{
				key: '_updateFilesUploadProgress',
				value: function _updateFilesUploadProgress(files, xhr, e) {
					var progress = void 0;
					if (typeof e !== 'undefined') {
						progress = (100 * e.loaded) / e.total;

						if (files[0].upload.chunked) {
							var file = files[0];
							// Since this is a chunked upload, we need to update the appropriate chunk progress.
							var chunk = this._getChunk(file, xhr);
							chunk.progress = progress;
							chunk.total = e.total;
							chunk.bytesSent = e.loaded;
							var fileProgress = 0,
								fileTotal = void 0,
								fileBytesSent = void 0;
							file.upload.progress = 0;
							file.upload.total = 0;
							file.upload.bytesSent = 0;
							for (var i = 0; i < file.upload.totalChunkCount; i++) {
								if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
									file.upload.progress += file.upload.chunks[i].progress;
									file.upload.total += file.upload.chunks[i].total;
									file.upload.bytesSent += file.upload.chunks[i].bytesSent;
								}
							}
							file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
						} else {
							for (
								var _iterator25 = files,
									_isArray25 = true,
									_i27 = 0,
									_iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();
								;

							) {
								var _ref24;

								if (_isArray25) {
									if (_i27 >= _iterator25.length) break;
									_ref24 = _iterator25[_i27++];
								} else {
									_i27 = _iterator25.next();
									if (_i27.done) break;
									_ref24 = _i27.value;
								}

								var _file2 = _ref24;

								_file2.upload.progress = progress;
								_file2.upload.total = e.total;
								_file2.upload.bytesSent = e.loaded;
							}
						}
						for (
							var _iterator26 = files,
								_isArray26 = true,
								_i28 = 0,
								_iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();
							;

						) {
							var _ref25;

							if (_isArray26) {
								if (_i28 >= _iterator26.length) break;
								_ref25 = _iterator26[_i28++];
							} else {
								_i28 = _iterator26.next();
								if (_i28.done) break;
								_ref25 = _i28.value;
							}

							var _file3 = _ref25;

							this.emit('uploadprogress', _file3, _file3.upload.progress, _file3.upload.bytesSent);
						}
					} else {
						// Called when the file finished uploading

						var allFilesFinished = true;

						progress = 100;

						for (
							var _iterator27 = files,
								_isArray27 = true,
								_i29 = 0,
								_iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();
							;

						) {
							var _ref26;

							if (_isArray27) {
								if (_i29 >= _iterator27.length) break;
								_ref26 = _iterator27[_i29++];
							} else {
								_i29 = _iterator27.next();
								if (_i29.done) break;
								_ref26 = _i29.value;
							}

							var _file4 = _ref26;

							if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
								allFilesFinished = false;
							}
							_file4.upload.progress = progress;
							_file4.upload.bytesSent = _file4.upload.total;
						}

						// Nothing to do, all files already at 100%
						if (allFilesFinished) {
							return;
						}

						for (
							var _iterator28 = files,
								_isArray28 = true,
								_i30 = 0,
								_iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();
							;

						) {
							var _ref27;

							if (_isArray28) {
								if (_i30 >= _iterator28.length) break;
								_ref27 = _iterator28[_i30++];
							} else {
								_i30 = _iterator28.next();
								if (_i30.done) break;
								_ref27 = _i30.value;
							}

							var _file5 = _ref27;

							this.emit('uploadprogress', _file5, progress, _file5.upload.bytesSent);
						}
					}
				},
			},
			{
				key: '_finishedUploading',
				value: function _finishedUploading(files, xhr, e) {
					var response = void 0;

					if (files[0].status === Dropzone.CANCELED) {
						return;
					}

					if (xhr.readyState !== 4) {
						return;
					}

					if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
						response = xhr.responseText;

						if (
							xhr.getResponseHeader('content-type') &&
							~xhr.getResponseHeader('content-type').indexOf('application/json')
						) {
							try {
								response = JSON.parse(response);
							} catch (error) {
								e = error;
								response = 'Invalid JSON response from server.';
							}
						}
					}

					this._updateFilesUploadProgress(files);

					if (!(200 <= xhr.status && xhr.status < 300)) {
						this._handleUploadError(files, xhr, response);
					} else {
						if (files[0].upload.chunked) {
							files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
						} else {
							this._finished(files, response, e);
						}
					}
				},
			},
			{
				key: '_handleUploadError',
				value: function _handleUploadError(files, xhr, response) {
					if (files[0].status === Dropzone.CANCELED) {
						return;
					}

					if (files[0].upload.chunked && this.options.retryChunks) {
						var chunk = this._getChunk(files[0], xhr);
						if (chunk.retries++ < this.options.retryChunksLimit) {
							this._uploadData(files, [chunk.dataBlock]);
							return;
						} else {
							console.warn('Retried this chunk too often. Giving up.');
						}
					}

					for (
						var _iterator29 = files,
							_isArray29 = true,
							_i31 = 0,
							_iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();
						;

					) {
						var _ref28;

						if (_isArray29) {
							if (_i31 >= _iterator29.length) break;
							_ref28 = _iterator29[_i31++];
						} else {
							_i31 = _iterator29.next();
							if (_i31.done) break;
							_ref28 = _i31.value;
						}

						var file = _ref28;

						this._errorProcessing(
							files,
							response || this.options.dictResponseError.replace('{{statusCode}}', xhr.status),
							xhr
						);
					}
				},
			},
			{
				key: 'submitRequest',
				value: function submitRequest(xhr, formData, files) {
					xhr.send(formData);
				},

				// Called internally when processing is finished.
				// Individual callbacks have to be called in the appropriate sections.
			},
			{
				key: '_finished',
				value: function _finished(files, responseText, e) {
					for (
						var _iterator30 = files,
							_isArray30 = true,
							_i32 = 0,
							_iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();
						;

					) {
						var _ref29;

						if (_isArray30) {
							if (_i32 >= _iterator30.length) break;
							_ref29 = _iterator30[_i32++];
						} else {
							_i32 = _iterator30.next();
							if (_i32.done) break;
							_ref29 = _i32.value;
						}

						var file = _ref29;

						file.status = Dropzone.SUCCESS;
						this.emit('success', file, responseText, e);
						this.emit('complete', file);
					}
					if (this.options.uploadMultiple) {
						this.emit('successmultiple', files, responseText, e);
						this.emit('completemultiple', files);
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},

				// Called internally when processing is finished.
				// Individual callbacks have to be called in the appropriate sections.
			},
			{
				key: '_errorProcessing',
				value: function _errorProcessing(files, message, xhr) {
					for (
						var _iterator31 = files,
							_isArray31 = true,
							_i33 = 0,
							_iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();
						;

					) {
						var _ref30;

						if (_isArray31) {
							if (_i33 >= _iterator31.length) break;
							_ref30 = _iterator31[_i33++];
						} else {
							_i33 = _iterator31.next();
							if (_i33.done) break;
							_ref30 = _i33.value;
						}

						var file = _ref30;

						file.status = Dropzone.ERROR;
						this.emit('error', file, message, xhr);
						this.emit('complete', file);
					}
					if (this.options.uploadMultiple) {
						this.emit('errormultiple', files, message, xhr);
						this.emit('completemultiple', files);
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},
			},
		],
		[
			{
				key: 'uuidv4',
				value: function uuidv4() {
					return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
						var r = (Math.random() * 16) | 0,
							v = c === 'x' ? r : (r & 0x3) | 0x8;
						return v.toString(16);
					});
				},
			},
		]
	);

	return Dropzone;
})(Emitter);

Dropzone.initClass();

Dropzone.version = '5.2.0';

// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// To disable autoDiscover for a specific element, you can set `false` as an option:
//
//     Dropzone.options.myDisabledElementId = false;
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
Dropzone.options = {};

// Returns the options for an element or undefined if none available.
Dropzone.optionsForElement = function(element) {
	// Get the `Dropzone.options.elementId` for this element if it exists
	if (element.getAttribute('id')) {
		return Dropzone.options[camelize(element.getAttribute('id'))];
	} else {
		return undefined;
	}
};

// Holds a list of all dropzone instances
Dropzone.instances = [];

// Returns the dropzone for given element if any
Dropzone.forElement = function(element) {
	if (typeof element === 'string') {
		element = document.querySelector(element);
	}
	if ((element != null ? element.dropzone : undefined) == null) {
		throw new Error(
			"No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone."
		);
	}
	return element.dropzone;
};

// Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.
Dropzone.autoDiscover = true;

// Looks for all .dropzone elements and creates a dropzone for them
Dropzone.discover = function() {
	var dropzones = void 0;
	if (document.querySelectorAll) {
		dropzones = document.querySelectorAll('.dropzone');
	} else {
		dropzones = [];
		// IE :(
		var checkElements = function checkElements(elements) {
			return (function() {
				var result = [];
				for (
					var _iterator32 = elements,
						_isArray32 = true,
						_i34 = 0,
						_iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();
					;

				) {
					var _ref31;

					if (_isArray32) {
						if (_i34 >= _iterator32.length) break;
						_ref31 = _iterator32[_i34++];
					} else {
						_i34 = _iterator32.next();
						if (_i34.done) break;
						_ref31 = _i34.value;
					}

					var el = _ref31;

					if (/(^| )dropzone($| )/.test(el.className)) {
						result.push(dropzones.push(el));
					} else {
						result.push(undefined);
					}
				}
				return result;
			})();
		};
		checkElements(document.getElementsByTagName('div'));
		checkElements(document.getElementsByTagName('form'));
	}

	return (function() {
		var result = [];
		for (
			var _iterator33 = dropzones,
				_isArray33 = true,
				_i35 = 0,
				_iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();
			;

		) {
			var _ref32;

			if (_isArray33) {
				if (_i35 >= _iterator33.length) break;
				_ref32 = _iterator33[_i35++];
			} else {
				_i35 = _iterator33.next();
				if (_i35.done) break;
				_ref32 = _i35.value;
			}

			var dropzone = _ref32;

			// Create a dropzone unless auto discover has been disabled for specific element
			if (Dropzone.optionsForElement(dropzone) !== false) {
				result.push(new Dropzone(dropzone));
			} else {
				result.push(undefined);
			}
		}
		return result;
	})();
};

// Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
// but not correctly.
// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
//
Dropzone.blacklistedBrowsers = [
	// The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
	/opera.*(Macintosh|Windows Phone).*version\/12/i,
];

// Checks if the browser is supported
Dropzone.isBrowserSupported = function() {
	var capableBrowser = true;

	if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
		if (!('classList' in document.createElement('a'))) {
			capableBrowser = false;
		} else {
			// The browser supports the API, but may be blacklisted.
			for (
				var _iterator34 = Dropzone.blacklistedBrowsers,
					_isArray34 = true,
					_i36 = 0,
					_iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();
				;

			) {
				var _ref33;

				if (_isArray34) {
					if (_i36 >= _iterator34.length) break;
					_ref33 = _iterator34[_i36++];
				} else {
					_i36 = _iterator34.next();
					if (_i36.done) break;
					_ref33 = _i36.value;
				}

				var regex = _ref33;

				if (regex.test(navigator.userAgent)) {
					capableBrowser = false;
					continue;
				}
			}
		}
	} else {
		capableBrowser = false;
	}

	return capableBrowser;
};

Dropzone.dataURItoBlob = function(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob
	return new Blob([ab], { type: mimeString });
};

// Returns an array without the rejected item
var without = function without(list, rejectedItem) {
	return list
		.filter(function(item) {
			return item !== rejectedItem;
		})
		.map(function(item) {
			return item;
		});
};

// abc-def_ghi -> abcDefGhi
var camelize = function camelize(str) {
	return str.replace(/[\-_](\w)/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
};

// Creates an element from string
Dropzone.createElement = function(string) {
	var div = document.createElement('div');
	div.innerHTML = string;
	return div.childNodes[0];
};

// Tests if given element is inside (or simply is) the container
Dropzone.elementInside = function(element, container) {
	if (element === container) {
		return true;
	} // Coffeescript doesn't support do/while loops
	while ((element = element.parentNode)) {
		if (element === container) {
			return true;
		}
	}
	return false;
};

Dropzone.getElement = function(el, name) {
	var element = void 0;
	if (typeof el === 'string') {
		element = document.querySelector(el);
	} else if (el.nodeType != null) {
		element = el;
	}
	if (element == null) {
		throw new Error('Invalid `' + name + '` option provided. Please provide a CSS selector or a plain HTML element.');
	}
	return element;
};

Dropzone.getElements = function(els, name) {
	var el = void 0,
		elements = void 0;
	if (els instanceof Array) {
		elements = [];
		try {
			for (
				var _iterator35 = els,
					_isArray35 = true,
					_i37 = 0,
					_iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();
				;

			) {
				if (_isArray35) {
					if (_i37 >= _iterator35.length) break;
					el = _iterator35[_i37++];
				} else {
					_i37 = _iterator35.next();
					if (_i37.done) break;
					el = _i37.value;
				}

				elements.push(this.getElement(el, name));
			}
		} catch (e) {
			elements = null;
		}
	} else if (typeof els === 'string') {
		elements = [];
		for (
			var _iterator36 = document.querySelectorAll(els),
				_isArray36 = true,
				_i38 = 0,
				_iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();
			;

		) {
			if (_isArray36) {
				if (_i38 >= _iterator36.length) break;
				el = _iterator36[_i38++];
			} else {
				_i38 = _iterator36.next();
				if (_i38.done) break;
				el = _i38.value;
			}

			elements.push(el);
		}
	} else if (els.nodeType != null) {
		elements = [els];
	}

	if (elements == null || !elements.length) {
		throw new Error(
			'Invalid `' + name + '` option provided. Please provide a CSS selector, a plain HTML element or a list of those.'
		);
	}

	return elements;
};

// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
Dropzone.confirm = function(question, accepted, rejected) {
	if (window.confirm(question)) {
		return accepted();
	} else if (rejected != null) {
		return rejected();
	}
};

// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
Dropzone.isValidFile = function(file, acceptedFiles) {
	if (!acceptedFiles) {
		return true;
	} // If there are no accepted mime types, it's OK
	acceptedFiles = acceptedFiles.split(',');

	var mimeType = file.type;
	var baseMimeType = mimeType.replace(/\/.*$/, '');

	for (
		var _iterator37 = acceptedFiles,
			_isArray37 = true,
			_i39 = 0,
			_iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();
		;

	) {
		var _ref34;

		if (_isArray37) {
			if (_i39 >= _iterator37.length) break;
			_ref34 = _iterator37[_i39++];
		} else {
			_i39 = _iterator37.next();
			if (_i39.done) break;
			_ref34 = _i39.value;
		}

		var validType = _ref34;

		validType = validType.trim();
		if (validType.charAt(0) === '.') {
			if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
				return true;
			}
		} else if (/\/\*$/.test(validType)) {
			// This is something like a image/* mime type
			if (baseMimeType === validType.replace(/\/.*$/, '')) {
				return true;
			}
		} else {
			if (mimeType === validType) {
				return true;
			}
		}
	}

	return false;
};

// Augment jQuery
if (typeof jQuery !== 'undefined' && jQuery !== null) {
	jQuery.fn.dropzone = function(options) {
		return this.each(function() {
			return new Dropzone(this, options);
		});
	};
}

if ( true && module !== null) {
	module.exports = Dropzone;
} else {
	window.Dropzone = Dropzone;
}

// Dropzone file status codes
Dropzone.ADDED = 'added';

Dropzone.QUEUED = 'queued';
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
Dropzone.ACCEPTED = Dropzone.QUEUED;

Dropzone.UPLOADING = 'uploading';
Dropzone.PROCESSING = Dropzone.UPLOADING; // alias

Dropzone.CANCELED = 'canceled';
Dropzone.ERROR = 'error';
Dropzone.SUCCESS = 'success';

/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */

// Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
var detectVerticalSquash = function detectVerticalSquash(img) {
	var iw = img.naturalWidth;
	var ih = img.naturalHeight;
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = ih;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);

	var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
		data = _ctx$getImageData.data;

	// search image edge pixel position in case it is squashed vertically.

	var sy = 0;
	var ey = ih;
	var py = ih;
	while (py > sy) {
		var alpha = data[(py - 1) * 4 + 3];

		if (alpha === 0) {
			ey = py;
		} else {
			sy = py;
		}

		py = (ey + sy) >> 1;
	}
	var ratio = py / ih;

	if (ratio === 0) {
		return 1;
	} else {
		return ratio;
	}
};

// A replacement for context.drawImage
// (args are for source and destination).
var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
	var vertSquashRatio = detectVerticalSquash(img);
	return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};

// Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html

var ExifRestore = (function() {
	function ExifRestore() {
		_classCallCheck(this, ExifRestore);
	}

	_createClass(ExifRestore, null, [
		{
			key: 'initClass',
			value: function initClass() {
				this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			},
		},
		{
			key: 'encode64',
			value: function encode64(input) {
				var output = '';
				var chr1 = undefined;
				var chr2 = undefined;
				var chr3 = '';
				var enc1 = undefined;
				var enc2 = undefined;
				var enc3 = undefined;
				var enc4 = '';
				var i = 0;
				while (true) {
					chr1 = input[i++];
					chr2 = input[i++];
					chr3 = input[i++];
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output =
						output +
						this.KEY_STR.charAt(enc1) +
						this.KEY_STR.charAt(enc2) +
						this.KEY_STR.charAt(enc3) +
						this.KEY_STR.charAt(enc4);
					chr1 = chr2 = chr3 = '';
					enc1 = enc2 = enc3 = enc4 = '';
					if (!(i < input.length)) {
						break;
					}
				}
				return output;
			},
		},
		{
			key: 'restore',
			value: function restore(origFileBase64, resizedFileBase64) {
				if (!origFileBase64.match('data:image/jpeg;base64,')) {
					return resizedFileBase64;
				}
				var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
				var segments = this.slice2Segments(rawImage);
				var image = this.exifManipulation(resizedFileBase64, segments);
				return 'data:image/jpeg;base64,' + this.encode64(image);
			},
		},
		{
			key: 'exifManipulation',
			value: function exifManipulation(resizedFileBase64, segments) {
				var exifArray = this.getExifArray(segments);
				var newImageArray = this.insertExif(resizedFileBase64, exifArray);
				var aBuffer = new Uint8Array(newImageArray);
				return aBuffer;
			},
		},
		{
			key: 'getExifArray',
			value: function getExifArray(segments) {
				var seg = undefined;
				var x = 0;
				while (x < segments.length) {
					seg = segments[x];
					if ((seg[0] === 255) & (seg[1] === 225)) {
						return seg;
					}
					x++;
				}
				return [];
			},
		},
		{
			key: 'insertExif',
			value: function insertExif(resizedFileBase64, exifArray) {
				var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
				var buf = this.decode64(imageData);
				var separatePoint = buf.indexOf(255, 3);
				var mae = buf.slice(0, separatePoint);
				var ato = buf.slice(separatePoint);
				var array = mae;
				array = array.concat(exifArray);
				array = array.concat(ato);
				return array;
			},
		},
		{
			key: 'slice2Segments',
			value: function slice2Segments(rawImageArray) {
				var head = 0;
				var segments = [];
				while (true) {
					var length;
					if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 218)) {
						break;
					}
					if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 216)) {
						head += 2;
					} else {
						length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
						var endPoint = head + length + 2;
						var seg = rawImageArray.slice(head, endPoint);
						segments.push(seg);
						head = endPoint;
					}
					if (head > rawImageArray.length) {
						break;
					}
				}
				return segments;
			},
		},
		{
			key: 'decode64',
			value: function decode64(input) {
				var output = '';
				var chr1 = undefined;
				var chr2 = undefined;
				var chr3 = '';
				var enc1 = undefined;
				var enc2 = undefined;
				var enc3 = undefined;
				var enc4 = '';
				var i = 0;
				var buf = [];
				// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if (base64test.exec(input)) {
					console.warn(
						"There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."
					);
				}
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
				while (true) {
					enc1 = this.KEY_STR.indexOf(input.charAt(i++));
					enc2 = this.KEY_STR.indexOf(input.charAt(i++));
					enc3 = this.KEY_STR.indexOf(input.charAt(i++));
					enc4 = this.KEY_STR.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					buf.push(chr1);
					if (enc3 !== 64) {
						buf.push(chr2);
					}
					if (enc4 !== 64) {
						buf.push(chr3);
					}
					chr1 = chr2 = chr3 = '';
					enc1 = enc2 = enc3 = enc4 = '';
					if (!(i < input.length)) {
						break;
					}
				}
				return buf;
			},
		},
	]);

	return ExifRestore;
})();

ExifRestore.initClass();

/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */

// @win window reference
// @fn function reference
var contentLoaded = function contentLoaded(win, fn) {
	var done = false;
	var top = true;
	var doc = win.document;
	var root = doc.documentElement;
	var add = doc.addEventListener ? 'addEventListener' : 'attachEvent';
	var rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';
	var pre = doc.addEventListener ? '' : 'on';
	var init = function init(e) {
		if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
			return;
		}
		(e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) {
			return fn.call(win, e.type || e);
		}
	};

	var poll = function poll() {
		try {
			root.doScroll('left');
		} catch (e) {
			setTimeout(poll, 50);
			return;
		}
		return init('poll');
	};

	if (doc.readyState !== 'complete') {
		if (doc.createEventObject && root.doScroll) {
			try {
				top = !win.frameElement;
			} catch (error) {}
			if (top) {
				poll();
			}
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		return win[add](pre + 'load', init, false);
	}
};

// As a single function to be able to write tests.
Dropzone._autoDiscoverFunction = function() {
	if (Dropzone.autoDiscover) {
		return Dropzone.discover();
	}
};
contentLoaded(window, Dropzone._autoDiscoverFunction);

function __guard__(value, transform) {
	return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}
function __guardMethod__(obj, methodName, transform) {
	if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
		return transform(obj, methodName);
	} else {
		return undefined;
	}
}

SapphireWidgets.Dropzone = Dropzone;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/05-components/v3-pat/expandable-link/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/expandable-link/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ExpandableLink */
(function ($, window, SapphireWidgets) {
	const create = widgetID => {
		const $elementWrapper = $(`#${widgetID}`);

		if ($elementWrapper.parent('.ExpandableList').hasClass('HideWhenEmpty')) {
			const text = $elementWrapper.find('.ExpandableLinkWrapper_content').text();

			if (text.length === 0) $elementWrapper.parent('.ExpandableList').hide();
		}

		bindEvents(widgetID);
	};

	const bindEvents = widgetID => {
		$(`#${widgetID} .ExpandableLinkWrapper_Header`).click(() => openClose(`#${widgetID}`));
	};

	const openClose = elementID => $(elementID).toggleClass('active');

	SapphireWidgets.ExpandableLink = {
		create
	};
})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js":
/*!********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component FullScreenTabsWrapper */
SapphireWidgets.FullScreenTabsWrapper = () => {
	$(document).ready(function() {
		$('.TabWrapper').click(function() {
			$(this)
				.siblings()
				.removeClass('Active');
			$(this).addClass('Active');
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/generic-gallery/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/generic-gallery/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component GenericGallery */
(function($, window, document, SapphireWidgets) {
	var allGenericGalleries = [];

	var create = function(config) {
		bindGenericGallery(config);
		if (osAjaxBackend) {
			osAjaxBackend.BindAfterAjaxRequest(function() {
				bindGenericGallery(config);
			});
		} else {
			$(window).load(function() {
				osAjaxBackend.BindAfterAjaxRequest(function() {
					bindGenericGallery(config);
				});
			});
		}
	};

	var bindGenericGallery = function(config) {
		for (var i = 0; i < allGenericGalleries.length; i++) {
			if (allGenericGalleries[i].config.widgetId === config.widgetId) {
				allGenericGalleries.splice(i, 1);
			}
		}
		window[config.widgetId] = new GenericGallery(config);
		allGenericGalleries.push(window[config.widgetId]);
	};

	var GenericGallery = function(config) {
		var _this = this;
		this.config = config;
		this.genericGalleryResizeTimer = 0;
		this.$widget = $('#' + this.config.widgetId).css('display', 'block');
		this.equalHeight = this.config.equalHeight;
		if (
			this.$widget.find('.GenericGallery-content > span').length === 1 &&
			this.$widget.find('.GenericGallery-content > span').hasClass('ListRecords')
		) {
			this.$gallery = this.$widget.find('.GenericGallery-content > span.ListRecords');
		} else {
			this.$gallery = this.$widget.find('.GenericGallery-content');
		}
		this.$galleryItems = this.$gallery.children();
		this.$galleryItems.each(function() {
			if (!$(this).hasClass('GenericGallery-item')) {
				$(this).wrap('<div class="GenericGallery-item"></div>');
			}
		});
		$(function() {
			_this.calculate(0);
		});
	};

	GenericGallery.prototype.calculate = function(timeout) {
		var _this = this;
		window.clearTimeout(this.genericGalleryResizeTimer);
		this.genericGalleryResizeTimer = window.setTimeout(function() {
			var widgetWidth = _this.$widget.outerWidth(true);
			var perLine;
			if (widgetWidth >= 1900) {
				perLine = _this.config.itemsDesktopHD;
			} else if (widgetWidth >= 1600) {
				perLine = _this.config.itemsDesktopBig;
			} else if (widgetWidth >= 1366) {
				perLine = _this.config.itemsDesktop;
			} else if (widgetWidth >= 1024) {
				perLine = _this.config.itemsDesktopSmall;
			} else if (widgetWidth >= 420) {
				perLine = _this.config.itemsTablet;
			} else {
				perLine = _this.config.itemsPhone;
			}

			var itemWidth = 100 / perLine;

			var marginLeft = _this.$gallery.find('.GenericGallery-item').css('margin-left');

			_this.$gallery.find('.GenericGallery-item').each(function(index, el) {
				if ($(el).find('.GenericGallery-item--triple').length > 0) {
					$(el).css('width', itemWidth * 3 + '%');
				} else if ($(el).find('.GenericGallery-item--double').length > 0) {
					$(el).css('width', 'calc(' + itemWidth * 2 + '%)');
				} else {
					$(el).css('width', 'calc(' + itemWidth + '% - ' + marginLeft + ')');
				}
				if (_this.config.itemsBorder === 'Right') {
					if ((index + 1) % perLine === 0) {
						$(el).css({ borderRight: 0 });
					} else {
						$(el).css({ borderRight: '' });
					}
				}
				$(el).css('opacity', 1);
				$(el)
					.find('> span')
					.css('opacity', 1);
				$(el).addClass(_this.config.itemsBgColor);
			});

			if (_this.config.itemsBorder === 'Right') {
				_this.$gallery
					.find('.GenericGallery-item')
					.last()
					.css({ borderRight: 0 });
			}

			if (_this.config.equalHeight) {
				_this.sameHeight();
			}
		}, timeout);
	};

	GenericGallery.prototype.sameHeight = function() {
		this.$gallery.find('.GenericGallery-item').css('min-height', 'auto');
		var maxHeight = Math.max.apply(
			null,
			this.$gallery
				.find('.GenericGallery-item')
				.map(function() {
					return $(this).outerHeight(false);
				})
				.get()
		);
		this.$gallery.find('.GenericGallery-item').css('min-height', maxHeight);
	};

	SapphireWidgets.GenericGallery = {
		create: create,
		all: function() {
			return allGenericGalleries;
		},
	};
})(jQuery, window, document, SapphireWidgets);

$(window)
	.off('resize.GenericGallery')
	.on('resize.GenericGallery', function() {
		var allGenericGalleries = SapphireWidgets.GenericGallery.all();
		allGenericGalleries.forEach(function(element) {
			element.calculate(200);
		});
	});


/***/ }),

/***/ "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component HorizontalToolbar */
(function ($, window, SapphireWidgets) {

	const create = () => {
		$(document).ready(() => init());
		$(window).load(() => {
			$('.MenuItemWrapper.Active')[0].scrollIntoView({
				behavior: 'auto',
				block: 'end'
			});
		});
	}

	const init = () => {

		handleArrows();

		$('.Toolbar__Items').scroll(() => {
			handleArrows()
		});

		$('.Toolbar__rightBtn').click(function () {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll + 50);
			if (currentScroll == sideWidth) {
				$('.Toolbar__rightBtn').addClass('Disabled');
			}
			if (currentScroll != 50) {
				$('.Toolbar__leftBtn').removeClass('Disabled');
			}
		});

		$('.Toolbar__leftBtn').click(function () {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll - 50);
			if (currentScroll != sideWidth) {
				$('.Toolbar__rightBtn').removeClass('Disabled');
			}
			if (currentScroll == 50) {
				$('.Toolbar__leftBtn').addClass('Disabled');
			}
		});

		$(window).on('resize.toolbar', () => {
			handleArrows();
		});

	};


	handleArrows = () => {
		let currentScroll = $('.Toolbar__Items').scrollLeft();
		let menuWidth = $('.Toolbar__Items .ListRecords').width();
		let externalWidth = $('.Toolbar__Items').width();
		var maxScrolll = menuWidth - externalWidth;

		if (externalWidth > menuWidth) {
			$('.Toolbar__leftBtn').hide();
			$('.Toolbar__rightBtn').hide();
			$('.Toolbar_container').addClass('Toolbar_container--noarrows');
		} else {
			$('.Toolbar__leftBtn').show();
			$('.Toolbar__rightBtn').show();
			$('.Toolbar_container').removeClass('Toolbar_container--noarrows');
		}

		if (currentScroll === 0) {
			$('.Toolbar__leftBtn').addClass('Disabled');
		} else {
			$('.Toolbar__leftBtn').removeClass('Disabled');
		}

		if (currentScroll >= maxScrolll) {
			$('.Toolbar__rightBtn').addClass('Disabled');
		} else {
			$('.Toolbar__rightBtn').removeClass('Disabled');
		}

	}


	SapphireWidgets.HorizontalToolbar = {
		create
	};

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/hour-picker/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/hour-picker/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component HourPicker */
(function($, window, SapphireWidgets) {
	class HourPicker {
		constructor(config) {
			// Options used by jQuery Timerpicker (External Lib)
			this.options = {
				...config,
			};

			this.onComponentInit();
		}

		isComponentValid() {
			let valid = true;
			let message = `Component HourPicker (${this.options.widgetId}):`;

			if (!this.$input.length || this.$input.length > 1) {
				message = `${message} needs one - and just one - INPUT element!`;
				valid = false;
			}

			if (!valid) console.error(message);

			return valid;
		}

		setComponentPosition() {
			const $widget = $('.ui-timepicker-container');
			const labelLeft = this.$label.offset().left;
			const labelWidth = this.$label.width();
			const labelOuterWidth = this.$label.outerWidth();
			const widgetOuterWidth = $widget.outerWidth();
			const widgetMinWidth = +$widget.css('min-width').replace('px', '');
			const isOutsideWindow =
				labelLeft + labelOuterWidth > $(window).scrollLeft() + $(window).width() - widgetOuterWidth;

			$widget.css({
				left: () => {
					let value = labelLeft - (widgetMinWidth - labelWidth) / 2;

					if (isOutsideWindow) value = labelLeft + labelWidth - widgetOuterWidth;
					else if (value < 0) value = labelLeft;

					return value;
				},
			});
		}

		setElementClass(selector, className) {
			return className ? $(selector).addClass(className) : false;
		}

		defineTimeFormat() {
			let format = [];
			let amPm = '';

			format.push(this.options.is24hFormat ? 'HH' : 'hh');
			if (this.options.showMinutes) format.push('mm');
			if (this.options.showSeconds) format.push('ss');
			if (!this.options.is24hFormat) amPm = ' p';

			return `${format.join(':')}${amPm}`;
		}

		convertTime12to24(value) {
			const [time, modifier] = value.split(' ');
			let [hours, minutes = '00', seconds = '00'] = time.split(':');

			if (hours === '12') hours = '00';
			if (modifier === 'PM') hours = parseInt(hours, 10) + 12;

			return `${hours}:${minutes}:${seconds}`;
		}

		convertTimeFormatToMask(value = '') {
			return value.replace(/[a-zA-Z]+/g, '--');
		}

		onChangeEvent(value = '') {
			let model = '01-01-1900 00:00:00'; //i.e. null
			let label = this.convertTimeFormatToMask(this.options.timeFormat);

			if (value && !!value.trim()) {
				model = this.options.is24hFormat ? value : this.convertTime12to24(value);
				label = value;
			}

			if (this.options.isNotifyEnabled) OsNotifyWidget(this.options.hourPickerFakeNotifyId, model);
			if (this.options.isTextTriggerable) this.$label.text(label);

			this.$model.val(model);
			this.$model.change();

			return;
		}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$model = this.$component.find('.HourPicker__Placeholder input[type="text"]');
			this.$input = this.$component.find('.HourPicker__Displayed .HourPicker__InputValue');
			this.$element = this.$input;

			this.options.timeFormat = this.defineTimeFormat();

			if (!this.isComponentValid()) return;
			else {
				const $container = this.$component.find('div.HourPicker');

				if (this.options.isTextTriggerable) {
					$container.addClass('HourPicker--textTrigger');

					this.$label = $container.find('.HourPicker__Displayed .HourPicker__LabelValue');
					this.$element = this.$label;

					this.$label.text(this.convertTimeFormatToMask(this.options.timeFormat));

					this.$label.on('click', () => {
						this.$label.timepicker().open();

						this.setComponentPosition();
					});
				}

				if (this.options.isClearable) {
					this.$buttonClear = $container.find('.HourPicker__Displayed .HourPicker__ButtonClear');

					this.$buttonClear.on('click', () => {
						this.$input.val('');
						this.onChangeEvent();
					});
				}

				this.$element.timepicker({
					...this.options,
					change: time => this.onChangeEvent(time ? $().timepicker.formatTime(this.options.timeFormat, time) : null),
				});

				this.setElementClass('.ui-timepicker-container', this.options.currentLocale === 'AR' ? 'rtl' : 'ltr');

				this.$input.prop('readonly', !this.options.isTypeEnabled);
				this.$input.prop('placeholder', this.options.timeFormat);
			}
		}
	}

	const create = config => (window[config.widgetId] = new HourPicker(config));

	SapphireWidgets.HourPicker = {
		create,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/input-with-clear/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/input-with-clear/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {

  class InputWithClear {

    constructor(config) {
      this.config = config;
      this.$widget = $(`#${config.widgetId}`);
      this.$input = this.$widget.find('input[type]');
      this.$clear = this.$widget.find('.InputWithClear-clear');
      this.$notifyLink = this.$widget.find('.InputWithClear-notify-link');
      this.$widgetShield = this.$widget.find('.InputWithClear--shield');
      this.onInit();
    }

    onInit() {
      this.$input.on('focus', () => {
        this.$clear.show();
      });
      this.$input.on('blur', () => {
        if (this.$input.val() === '') {
          window.setTimeout(() => {
            if ($('.daterangepicker:visible').length === 1) {
              return false;
            }
            this.$clear.hide();
            this.$notifyLink.trigger('click');
          }, 100);
        };
      });
      this.$clear.on('click', () => {
        this.$input.val('');
        this.$clear.hide();
        this.$notifyLink.trigger('click');
      });
      if (this.config.hasShield) {
        window.setTimeout(() => {
          this.$widgetShield.hide();
        }, this.config.shieldTimeout);
        if (this.config.shieldTimeout > 0) {
          this.$widgetShield.on('click', () => {
            this.$clear.hide();
          });
        }
      }
    }
  }

  const create = config => (window[config.widgetId] = new InputWithClear(config));

  SapphireWidgets.InputWithClear = {
    create
  };

})();

/***/ }),

/***/ "./src/components/05-components/v3-pat/location-box/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/location-box/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LocationBox */
SapphireWidgets.LocationBox = function(clickedElementId) {
	if ($('#' + clickedElementId + '').hasClass('On')) {
		$('.DisableRoom').each(function() {
			$(this)
				.removeClass('Off')
				.removeClass('On');
			$(this)
				.parent('.RoomBox')
				.css({
					opacity: '1',
				})
				.removeClass('Selected');
		});
	} else {
		$('#' + clickedElementId + '')
			.addClass('On')
			.removeClass('Off')
			.parent('.RoomBox')
			.css({
				opacity: '1',
			})
			.addClass('Selected');

		$('.DisableRoom:not(#' + clickedElementId + ')').each(function() {
			$(this).addClass('Off');
			$(this).removeClass('On');
		});

		$('.DisableRoom.Off')
			.parent('.RoomBox')
			.css({
				opacity: '0.25',
			})
			.removeClass('Selected');
	}
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/main-interactive-card/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/main-interactive-card/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MainInteractiveCard */
(function ($, window, document, SapphireWidgets) {
	var allMainInteractiveCards = [];
	var defaultDuration = 300;

	var create = function (config) {
		for (var i = 0; i < allMainInteractiveCards.length; i++) {
			if (allMainInteractiveCards[i].config.widgetId === config.widgetId) {
				allMainInteractiveCards.splice(i, 1);
			}
		}
		window[config.widgetId] = new MainInteractiveCard(config);
		allMainInteractiveCards.push(window[config.widgetId]);

		if (!!!SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded && !!osAjaxBackend) {
			osAjaxBackend.BindAfterAjaxRequest(function () {
				var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
				allMainInteractiveCards.forEach(function (element) {
					element.handleHeaderWithAbsoluteButtons();
				});
			});
			SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded = true;
		}
	};

	var MainInteractiveCard = function (config) {
		var _this = this;
		this.config = config;
		this.isLockedOnClose = false;
		this.isOpen = config.isOpen;
		this.isEnabled = config.isEnabled;
		this.isSelectable = config.isSelectable;
		this.allowOpening = config.allowOpening;
		this.gradientWhenOpen = config.gradientWhenOpen;
		this.allowMultipleOpen = config.allowMultipleOpen;
		this.emitNotifyOnOpen = config.emitNotifyOnOpen;
		this.hideActionsOnOpen = config.hideActionsOnOpen;
		this.hideCaptionOnOpen = config.hideCaptionOnOpen;
		this.hideTitleOnOpen = config.hideTitleOnOpen;
		this.hideSubTitleOnOpen = config.hideSubTitleOnOpen;
		this.headerHeightWhenOpen = config.headerHeightWhenOpen;
		this.MainInteractiveCardFakeNotifyId = config.mainInteractiveCardFakeNotifyId;

		this.$widget = $('#' + config.widgetId);
		this.$widget.css('display', 'block');
		this.$card = this.$widget.find('> .MainInteractiveCard');
		this.$header = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header');
		this.$headerText = this.$header.find('.MainInteractiveCard-header-text');
		this.$body = this.$widget.find('> .MainInteractiveCard > div > .MainInteractiveCard-body');
		this.$actions = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-actions');
		this.$caption = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-caption');
		this.$title = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-title');
		this.$subTitle = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-subtitle');
		this.$selectTrigger = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header > .MainInteractiveCard-header-selectable > .MainInteractiveCard-header-selectable-trigger');
		this.$selectPlaceholder = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-selectable-placeholder');
		this.$triggerPlaceholder = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header-triggerAction-placeholder');

		if (this.$triggerPlaceholder.find('a').length === 1) {
			this.$trigger = this.$triggerPlaceholder.find('a');
		}

		if (this.isOpen) {
			this.open(false, -1);
			this.$card.addClass('forceOpen');
		}

		this.$card.addClass(this.headerHeightWhenOpen + 'Header');

		if (this.allowOpening) {
			this.$card.addClass('allowOpening');
		}

		if (this.gradientWhenOpen) {
			this.$card.addClass('gradientWhenOpen');
		}

		this.attachEvents();

		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation, index) {
				_this.handleHeaderWithAbsoluteButtons();
			});
		});

		observer.observe(document.getElementById(config.widgetId), {
			childList: true,
			subtree: true,
			attributes: false,
		});
	};

	MainInteractiveCard.prototype.handleHeaderWithAbsoluteButtons = function () {
		var _this = this;
		if (!!this.$body.find('> div .MainInteractiveCard-absolute-actions').length && this.isOpen) {
			var absoluteActionsWidth = Math.max.apply(Math, this.$body.find('> div .MainInteractiveCard-absolute-actions').map(function () {
				return $(this).outerWidth(true);
			}).get());
			var headerMaxWidth = this.$header.width() - absoluteActionsWidth;
			if (headerMaxWidth > 10) {
				this.$headerText.css({
					maxWidth: headerMaxWidth + 'px'
				});
			}
			this.$body.find('> div .MainInteractiveCard-absolute-actions .MainInteractiveCard--close').off('click').on('click', function (e) {
				e.preventDefault();
				_this.close();
			});
		} else {
			this.$headerText.css({
				maxWidth: '99%'
			});
			if (this.$widget.find('iframe').length === 1) {
				setTimeout(function () {
					if (!!_this.$widget.find('iframe')[0] && !!_this.$widget.find('iframe')[0].contentWindow && _this.$widget.find('iframe')[0].contentWindow.SapphireWidgets && _this.$widget.find('iframe')[0].contentWindow.SapphireWidgets.ResizeParentIframe) {
						_this.$widget.find('iframe')[0].contentWindow.SapphireWidgets.ResizeParentIframe.resize();
					}
				}, 500);
			}
		}
	};

	MainInteractiveCard.prototype.attachEvents = function () {
		var _this = this;
		this.$header.find('.MainInteractiveCard--open:not([disabled])').off('click').on('click', function (e) {
			e.preventDefault();
			_this.open(true);
		});
		this.$header.find('.MainInteractiveCard--close').off('click').on('click', function (e) {
			e.preventDefault();
			_this.close();
		});
		if (this.allowOpening) {
			this.$headerText.off('click').on('click', function (evt) {
				if ($(evt.target).hasClass('Button')) {
					// the user clicked on a Button inside the header, nothing to do here
				} else {
					if (_this.isOpen) {
						if (_this.$widget.find('iframe').length === 1) {
							// do not close when and iframe exists
						} else if (
							_this.$actions.find('a').length > 0 &&
							_this.$actions.find('.MainInteractiveCard--close').length > 0
						) {
							// do not close when the card has actions
						} else {
							_this.close();
						}
					} else {
						_this.open(true);
					}
				}
			});
		}
		if (this.isSelectable) {
			this.$selectTrigger.off('click').on('click', function (e) {
				if (_this.$selectPlaceholder.find('a').length === 1) {
					_this.$selectPlaceholder.find('a').click();
				} else {
					console.warn('You need 1 link in this placeholder.');
				}
			});
		}
	};

	MainInteractiveCard.prototype.open = function (sendNotify, duration) {
		var duration = duration || defaultDuration;
		this.isOpen = true;
		this.$card.addClass('isOpen');
		if (this.hideActionsOnOpen) {
			this.$actions.css('display', 'none');
		}
		if (this.hideTitleOnOpen) {
			this.$title.css('display', 'none');
		}
		if (this.hideSubTitleOnOpen) {
			this.$subTitle.css('display', 'none');
		}
		if (this.hideCaptionOnOpen) {
			this.$caption.css('display', 'none');
		}
		if (this.emitNotifyOnOpen) {
			if (sendNotify) {
				OsNotifyWidget(this.MainInteractiveCardFakeNotifyId, 'open');
			}
			this.$body.css('display', 'block');
		} else if (this.$trigger) {
			this.$trigger.click();
			this.$body.css('display', 'block');
		} else {
			if (duration > 0) {
				this.$body.slideDown(duration);
			} else {
				this.$body.css('display', 'block');
			}
		}
		if (this.$widget.find('iframe').length === 1 && !this.$widget.find('iframe').hasClass('cke_wysiwyg_frame')) {
			var iframeContents = this.$widget.find('iframe').contents();
			iframeContents.find('.MainInteractiveCard-iframe-actions').css('visibility', 'visible');
		} else {
			this.handleHeaderWithAbsoluteButtons();
		}
		if (!this.allowMultipleOpen) {
			allMainInteractiveCards.forEach(item => (item !== this && item.allowOpening ? item.close(duration) : null));
		}
	};

	MainInteractiveCard.prototype.close = function (duration) {
		var self = this;
		var duration = duration || defaultDuration;
		this.isOpen = false;
		this.$card.removeClass('isOpen');
		if (this.$widget.find('iframe').length === 1 && !this.$widget.find('iframe').hasClass('cke_wysiwyg_frame')) {
			this.$widget.find('iframe').contents().find('.MainInteractiveCard-iframe-actions').css('visibility', 'hidden');
		}
		this.$body.slideUp(duration, function () {
			if (self.$card.hasClass('forceOpen')) {
				self.$card.removeClass('forceOpen');
			}
		});
		if (this.hideActionsOnOpen) {
			this.$actions.show();
		}
		if (this.hideTitleOnOpen) {
			this.$title.css('display', 'block');
		}
		if (this.hideSubTitleOnOpen) {
			this.$subTitle.css('display', 'block');
		}
		if (this.hideCaptionOnOpen) {
			this.$caption.css('display', 'block');
		}
		this.$headerText.css({
			maxWidth: '99%'
		});
	};

	MainInteractiveCard.prototype.isOpen = function () {
		return this.isOpen;
	};

	SapphireWidgets.MainInteractiveCard = {
		create: create,
		all: function () {
			return allMainInteractiveCards;
		},
	};
})(jQuery, window, document, SapphireWidgets);

$(window).load(function () {
	if (!!$('.MainInteractiveCard').length) {
		if (!!!SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded) {
			osAjaxBackend.BindAfterAjaxRequest(function () {
				var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
				allMainInteractiveCards.forEach(function (element) {
					element.handleHeaderWithAbsoluteButtons();
				});
			});
			SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded = true;
		}
	}

	setTimeout(function () {
		var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
		allMainInteractiveCards.forEach(function (element) {
			element.handleHeaderWithAbsoluteButtons();
		});
	}, 1000);

});

/***/ }),

/***/ "./src/components/05-components/v3-pat/menu-bar/scripts.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/menu-bar/scripts.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MenuBar */
SapphireWidgets.MenuBar = function(config) {
	$(function() {
		var $menuWidget = $('#' + config.menuWidget);

		var menuResider = function() {
			var navWidth = 0;
			var availabeEspace = $menuWidget.find('.Menubar_item').width();

			$menuWidget.find('.Menubar_item .MenuItem').each(function() {
				navWidth += $(this).outerWidth(true);
			});

			if (navWidth > availabeEspace) {
				var lastItem = $menuWidget.find('.Menubar_item .MenuItem').last();
				lastItem.attr('data-width', lastItem.outerWidth(true));
				lastItem.prependTo($menuWidget.find('.Menubar__extraContainer'));
				menuResider();
			} else {
				var firstMoreElement = $menuWidget.find('.Menubar__extraContainer .MenuItem').first();
				if (navWidth + firstMoreElement.data('width') < availabeEspace) {
					firstMoreElement.insertAfter($menuWidget.find('.Menubar_item .MenuItem').last());
					menuResider();
				}
			}

			if (!$menuWidget.find('.Menubar__extraContainer').is(':empty')) {
				$menuWidget.find('.Menubar_extraItem').addClass('show');
			} else {
				$menuWidget.find('.Menubar_extraItem').removeClass('show');
			}
		};

		$menuWidget.find('.MenuItem').click(function() {
			if (
				!$(this)
					.parent()
					.hasClass('Menubar__extraContainer')
			) {
				if (!$(this).hasClass('active') && !$(this).hasClass('activeIndicator')) {
					$(this).addClass('active');
					$menuWidget.find('.activeIndicator').addClass('shadow');
					$(this)
						.find('.MenuItem_subItems')
						.toggleClass('show');
				} else if (!$(this).hasClass('active') && $(this).hasClass('activeIndicator')) {
					$(this).addClass('active');
					$(this)
						.find('.MenuItem_subItems')
						.toggleClass('show');
				}
			} else {
				$(this)
					.find('.MenuItem_subItems')
					.toggleClass('show');
			}
		});

		$menuWidget.find('.Menubar_extraItem .icon').click(function() {
			$menuWidget.find('.Menubar__extraContainer ').toggleClass('show');
		});

		$(document).mouseup(e => {
			var $menu = $menuWidget.find('.MenuItem.active');
			var $moreOptions = $menuWidget.find('.Menubar_extraItem');

			// if the target of the click isn't the menu or a descendant of the menu
			if ($menu.length > 0) {
				if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
					$menu.find('.MenuItem_subItems').removeClass('show');
					$('.activeIndicator').removeClass('shadow');
					$menuWidget.find('.MenuItem.active').removeClass('active');
				}
			}

			if (!$moreOptions.is(e.target) && $moreOptions.has(e.target).length === 0) {
				$moreOptions.find('.Menubar__extraContainer').removeClass('show');
				$('.activeIndicator').removeClass('shadow');
			}
		});

		$(window).on('resize load', function() {
			menuResider();
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/multiple-selection-button/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/multiple-selection-button/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MultipleSelectionButton */
SapphireWidgets.MultipleSelectionButton = function(WrapperId) {
	var $widget = $(WrapperId);
	var $control = $widget.find('input[type="checkbox"]');

	if ($(WrapperId + ' input[type="checkbox"]').is(':disabled')) {
		$(WrapperId).addClass('disabled');
	} else {
		$(WrapperId).removeClass('disabled');
	}

	if ($(WrapperId + ' input[type="checkbox"]').is(':checked')) {
		$(WrapperId).addClass('active');
	} else {
		$(WrapperId).removeClass('active');
	}

	$widget.find('input[type="checkbox"]').change(function() {
		if ($(this).is(':checked')) {
			$(this)
				.parent()
				.parent()
				.addClass('active');
		} else {
			$(this)
				.parent()
				.parent()
				.removeClass('active');
		}
	});

	$widget.find('.MultipleSelectionButton-label').click(function() {
		// $control.prop("checked", !$control.prop("checked"));
		$control[0].click();
		setTimeout(function() {
			if ($control.is(':checked')) {
				$widget.addClass('active');
			} else {
				$widget.removeClass('active');
			}
		}, 10);
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/confirmation-panel.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/confirmation-panel.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ConfirmationPanel3Options ConfirmationPanel same javascript code*/

SapphireWidgets.ConfirmationPanel = {
	isAnyPanelOpened: function() {
		return $('body').hasClass('PanelOpened') && $('.PanelContainer:visible').length;
	},

	togglePanel: function(PanelId) {
		if (!OsValidatorOnSubmit()) return;

		if (!SapphireWidgets.ConfirmationPanel.isAnyPanelOpened()) {
			$('body').addClass('PanelOpened');
			$('#' + PanelId).fadeIn(140);

			setTimeout(function() {
				$('#' + PanelId)
					.find('.PanelContainer')
					.slideToggle(150);
			}, 100);
		}
	},

	closePanel: function(PanelId) {
		$('body').removeClass('PanelOpened');
		$('#' + PanelId).fadeOut(140);

		setTimeout(function() {
			$('#' + PanelId)
				.find('.PanelContainer')
				.slideUp(150);
		}, 100);
	},

	setPanelBehavior: function() {
		$('.Panel[panel-trigger-elementid]').each(function() {
			var this_panel = $(this);
			$('#' + this_panel.attr('panel-trigger-elementid') + '')
				.off('click')
				.on('click', function() {
					SapphireWidgets.ConfirmationPanel.togglePanel(this_panel.attr('id'));
					return false;
				});
		});
	},
};

$(document).ready(function() {
	SapphireWidgets.ConfirmationPanel.setPanelBehavior();
	if (osAjaxBackend.EventHandlers.AfterAjaxRequest.toString().indexOf('setPanelBehavior') == -1) {
		osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.ConfirmationPanel.setPanelBehavior);
	}
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/panel-by-id-notify.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/panel-by-id-notify.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PanelByIDNotify */
var panelNotifyWidget;
SapphireWidgets.PanelByIdNotify = {
	isAnyPanelOpenedDeprecated: function() {
		return $('body').hasClass('PanelOpened');
	},
	togglePanelByNotify: function(Id) {
		if (!isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeIn(140);

			try {
				if (justDragged == false) {
					$('.PanelContainer')
						.css('margin-left', panelMarginLeft)
						.css('left', panelLeft)
						.addClass(panelArrowClass);
				}
			} catch (e) {
				console.log(e);
			}

			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideDown(150);
			}, 100);
		} else {
			$('body').removeClass('PanelOpened');
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeOut(140);
			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideUp(150);
			}, 100);
		}
	},
	togglePanelNotifyById: function(Id) {
		$('body').toggleClass('PanelOpened');
		$('#' + Id)
			.parents('.ToggleButton')
			.parent()
			.children('.Panel')
			.fadeToggle(140);

		panelNotifyWidget = $('#' + Id)
			.parents('.ToggleButton')
			.attr('NotifyId');

		setTimeout(function() {
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.children('.PanelContainer')
				.slideToggle(150);
		}, 100);
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/panel-by-id.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/panel-by-id.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PanelByID */
SapphireWidgets.PanelById ={
	isAnyPanelOpenedDeprecated:function () {
		return $('body').hasClass('PanelOpened');
	},
	
	togglePanelById:function (Id) {
		if (!this.isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('body').css('overflow-y', 'hidden');
	
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeIn(140);
	
			try {
				if (typeof justDragged !== 'undefined') {
					if (justDragged == false) {
						$('.PanelByIdNew_PanelContainer')
							.css('margin-left', panelMarginLeft)
							.css('left', panelLeft)
							.addClass(panelArrowClass);
					}
				}
			} catch (e) {
				console.log(e);
			}
	
			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideDown(150);
				$('#' + Id)
					.parents('.ToggleButton')
					.click();
			}, 100);
		} else {
			$('body').removeClass('PanelOpened');
			$('body').css('overflow-y', 'scroll');
	
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeOut(140);
			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideUp(150);
				$('#' + Id)
					.parents('.ToggleButton')
					.click();
			}, 100);
		}
	}
}



/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/popup-menu.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/popup-menu.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PopUpMenu */

SapphireWidgets.PopUpMenu = {
	menuPosition: function (id, Context) {
		/* Hide any other menus on page and set button as collapsed. */
		$('.popup-menu:visible').hide();

		//var _this = $(this);
		var _this = $('#' + id);
		var Xx = 0;
		var Yy = 0;
		var Ww = 0;
		var Hh = 0;

		_this.children('.button-expand:visible').hide();

		/* Get the menu element. */
		var _el = _this.next('.popup-menu');

		/* Display the menu. */
		_el.show();

		/* Set button collapse. */
		_this.children('.button-collapse').show();

		/* Get the dimensions of the button. */
		buttonHh = _this.outerHeight();
		buttonWw = _this.outerWidth();

		var buttonY = _this.position().top + buttonHh;
		var buttonX = _this.offset().left;
		//var buttonX = _this.position().left;

		/* Get the distance of menu button and the parent element */
		var popupParentXx = _this.offset().left - _this.position().left;

		var popupXx = _el.offset().left;
		var popupWw = _el.outerWidth();

		Xx = Math.abs(buttonX - $('body').scrollLeft() - popupParentXx);
		Yy = Math.abs(buttonHh - buttonY - $('body').scrollTop());

		/* Check if clicked position plus the popup width exceed the window width. */
		if (buttonX + popupWw - $('body').scrollLeft() > $(Context).width()) {
			Xx = buttonX - popupWw - $('body').scrollLeft() - popupParentXx + buttonWw;
			//Xx = ($(window).width() - popupWw) - $('body').scrollLeft();
		}

		/* Set menu position. */
		_el.css({
			left: Xx + 'px',
			top: buttonY + 'px'
		});

		/* Refresh value */
		popupXx = _el.offset().left;

		var _balloonEl = _el.children('.popup-menu-balloon');

		var _balloonXx = _balloonEl.offset().left;
		var _balloonWw = _balloonEl.outerWidth();
		var _balloonPosXx = Math.abs(buttonX - Xx - popupParentXx);

		/* Is the balloon icon positioned out of the popup menu? */
		if (_balloonPosXx + Xx + _balloonWw > Xx + popupWw) {
			_balloonPosXx = _balloonPosXx - _balloonWw;
		}

		/* Set position of the balloon effect. */
		_balloonEl.css('left', _balloonPosXx + 'px');
	},
	menuEvents: function (Context) {
		$('.popup-button')
			.off('click')
			.on('click', function (e) {
				var id = $(this).attr('id');
				SapphireWidgets.PopUpMenu.menuPosition(id, Context);

				/*e.stopPropagation();*/

				/* Prevent link submission */
				return false;
			});

		/* v *** Hide popup when click outside *** v */
		function PMClickOutside(event) {
			if (event.hasOwnProperty('target')) {
				var target = $(event.target);
				/*if ((target.parents().index($('a[sapphirehospital], .HospitalPopUp')) == -1)) {}*/
				if (
					!$(event.target).closest(
						'.popup-button, .popup-menu, .os-internal-ui-autocomplete, .os-internal-ui-menu-item, .os-internal-ui-corner-all, ui-autocomplete-item'
					).length
				) {
					$('.popup-menu:visible').hide();
					$('.button-collapse:visible').hide();
					$('.button-expand').show();
				}
			}
		}

		var _PMIsDrag = false;
		var _PMIsClick = false;
		$(document).on('touchstart', function (event) {
			_PMIsDrag = false;
			_PMIsClick = true;
		});
		$(document).on('touchmove', function (event) {
			_PMIsDrag = true;
		});
		$(document).on('click', function (event) {
			PMClickOutside(event);
			_PMIsDrag = false;
			_PMIsClick = false;
		});
		$(document).on('touchend', function (event) {
			if (!_PMIsDrag && _PMIsClick) {
				PMClickOutside(event);
			}
			_PMIsDrag = false;
			_PMIsClick = false;
		});

		$('.button-collapse').on('click', function (event) {
			$('body').trigger('click');
			return false;
		});
		/* ^ *** Hide popup when click outside *** ^ */
	}
};

/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/sapphire-panel.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/sapphire-panel.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphirePanel */
SapphireWidgets.SapphirePanel = {
	checkOpenPanel: function() {
		return $('body').hasClass('SapphirePanelOpen') && $('.SapphirePanel_Container:visible').length;
	},

	toggleSapphirePanel: function(PanelId) {
		if (!OsValidatorOnSubmit()) {
			return;
		}

		if (!SapphireWidgets.SapphirePanel.checkOpenPanel()) {
			$('body').addClass('SapphirePanelOpen');
			$('#' + PanelId).fadeIn(140);

			setTimeout(function() {
				$('#' + PanelId)
					.find('.SapphirePanel_Container')
					.slideToggle(150);
			}, 100);
		}
	},

	closeSapphirePanel: function(PanelId) {
		$('body').removeClass('SapphirePanelOpen');
		$('#' + PanelId).fadeOut(140);

		setTimeout(function() {
			$('#' + PanelId)
				.find('.SapphirePanel_Container')
				.slideUp(150);
		}, 100);
	},

	setPanelBehavior: function() {
		$('.Panel[panel-trigger-elementid]').each(function() {
			var this_panel = $(this);
			$('#' + this_panel.attr('panel-trigger-elementid') + '')
				.off('click')
				.on('click', function() {
					SapphireWidgets.SapphirePanel.toggleSapphirePanel(this_panel.attr('id'));
					return false;
				});
		});
	},
};

$(document).ready(function() {
	SapphireWidgets.SapphirePanel.setPanelBehavior();

	if (osAjaxBackend.EventHandlers.AfterAjaxRequest.toString().indexOf('setPanelBehavior') == -1) {
		osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.SapphirePanel.setPanelBehavior);
	}
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/scripts.js":
/*!**************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/scripts.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./confirmation-panel */ "./src/components/05-components/v3-pat/panel/confirmation-panel.js");
__webpack_require__(/*! ./panel-by-id */ "./src/components/05-components/v3-pat/panel/panel-by-id.js");
//require('./panel-by-id-notify');
__webpack_require__(/*! ./popup-menu */ "./src/components/05-components/v3-pat/panel/popup-menu.js");
__webpack_require__(/*! ./sapphire-panel */ "./src/components/05-components/v3-pat/panel/sapphire-panel.js");



/***/ }),

/***/ "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/patient-call-cancel/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PatientCallCancel */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		var interval;
		var timeCounter;
		var $widget = $('#' + config.widgetId).find('.PatientCallCancel');
		var $countdown = $widget.find('.PatientCallCancel-counter');
		var $label = $widget.find('.PatientCallCancel-label');

		var setState = function(state_in, text_in) {
			//js-idle, js-calling
			$widget.find('> div').prop('class', state_in);
			$label.text(text_in);
		};

		var callPatient = function($widget) {
			setState('js-calling', config.txtCallPatient);
			if (config.showCountdown) {
				$countdown.text(config.txtCallingIn + ' ' + config.timeToCancel);
			} else {
				$countdown.text(config.txtCallingIn);
			}
			startCounter();
		};

		var startCounter = function() {
			timeCounter = config.timeToCancel;
			interval = window.setInterval(updateCounter, 1000);
		};

		var updateCounter = function() {
			timeCounter--;
			if (timeCounter === 0) {
				clearInterval(interval);
				var notification = '';
				OsNotifyWidget(config.patientCallFakeNotifyId, notification);
			}
			if (config.showCountdown) {
				$countdown.text(config.txtCallingIn + ' ' + timeCounter);
			} else {
				$countdown.text(config.txtCallingIn);
			}
		};

		$widget.find('.PatientCallCancel-cancel--label').text(config.txtCancel);

		setState('js-idle', config.txtCallPatient);

		$widget.on('click', '.js-idle .PatientCallCancel-label', function() {
			callPatient($widget);
		});

		$widget.on('click', '.js-idle .PatientCallCancel-icon', function() {
			callPatient($widget);
		});

		$widget.on('click', '.js-calling .PatientCallCancel-cancel', function() {
			timeCounter = config.timeToCancel;
			$countdown.text(timeCounter);
			clearInterval(interval);
			setState('js-idle', config.txtCallPatient);
		});
	};

	SapphireWidgets.PatientCallCancel = {
		create: create,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/person-card/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/person-card/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PersonCard */
$(document).ready(function() {
	var PersonCardEvent = function() {
		$('.PersonCard__title, .PersonCard__content')
			.off('click')
			.on('click', function() {
				$header = $(this).closest('.PersonCard_header');
				$content = $header.next();
				if ($content.children().length > 0) {
					$content.slideToggle(500);
					if ($('.PersonCard.IsOpen').length > 0) {
						$(this)
							.closest('.PersonCard')
							.removeClass('IsOpen');
					} else {
						$(this)
							.closest('.PersonCard')
							.addClass('IsOpen');
					}
				}
			});
	};

	$('.StopPropagation').click(function(event) {
		event.stopPropagation();
	});

	PersonCardEvent();

	osAjaxBackend.BindAfterAjaxRequest(PersonCardEvent);
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/prescription-card/scripts.js":
/*!**************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/prescription-card/scripts.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PrescriptionCard */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(`#${config.widgetId}`).click(() => {
			showMore($(`#${config.widgetId}`));
		});
	};

	const showMore = element => {
		const parents = element.parents('.PrescriptionCard');

		if (parents.find('.ExpanDiv').hasClass('IsOpen')) {
			parents.find('.ExpanDiv').removeClass('IsOpen');

			element.text('See More');
		} else {
			parents.find('.ExpanDiv').addClass('IsOpen');

			element.text('See Less');
		}
	};

	SapphireWidgets.PrescriptionCard = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/prescription-expandable/scripts.js":
/*!********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/prescription-expandable/scripts.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PrescriptionExpandable */
(function($, window, SapphireWidgets) {
	function PrescriptionExpandableObj() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			// if($(ob).hasClass("isLinkEpandable")){
			if ($(ob).hasClass('PrescriptionExpandable_header__LinksDiv')) {
				var Section = $(ob)
					.parent()
					.parent()
					.parent();
			} else {
				var Section = $(ob).parent();
			}

			var SectionContent = Section.children('.PrescriptionExpandable_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function() {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		}

		// ajax refres function
		that.ajaxRefresh = function() {
			// remove click events
			$('.PrescriptionExpandable_header').off();

			// add stop prepagation
			$(
				'.PrescriptionExpandable_header input, .PrescriptionExpandable_header select, .PrescriptionExpandable_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// each all sections
			$('.SectionPrescriptionExpandableArea').each(function() {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = { client: stat, server: stat };
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.PrescriptionExpandable_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function() {
			// each all sections to create array stat
			$('.SectionPrescriptionExpandableArea').each(function() {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[$(this).attr('id')] = { client: stat, server: stat };
			});

			$('.PrescriptionExpandable_header').each(function() {
				if ($(this).hasClass('NotExpandable')) {
					$(this).on('click', function(e) {
						e.preventDefault();
					});
				} else if ($(this).hasClass('isLinkEpandableClick')) {
					$(this)
						.find('.PrescriptionExpandable_header__LinksDiv')
						.on('click', function(e) {
							clickEvents(this);
						});
				} else {
					$(this).on('click', function(e) {
						clickEvents(this);
					});
				}
			});

			// add stop prepagation
			$(
				'.PrescriptionExpandable_header input, .PrescriptionExpandable_header select, .PrescriptionExpandable_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const create = () => {
		SilkUI.SectionExpandable = new PrescriptionExpandableObj();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on WebPatterns/Content/SectionExpandable');
	};

	SapphireWidgets.PrescriptionExpandable = {
		create,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/sapphire-header/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sapphire-header/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphireHeader */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {
		window[config.widgetId] = new SapphireHeader(config);
		SapphireWidgets.SapphireHeader.widgetId = config.widgetId;
	};

	var handleDemographics = function () {
		window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
	};

	var SapphireHeader = function (config) {
		var _this = this;
		this.config = config;
		this.isConfidential = config.isConfidential;
		this.$widget = $('#' + config.widgetId);
		this.$widget.css({
			display: 'block'
		});
		this.$header = this.$widget.find('.SapphireHeader');
		this.$demographic = this.$widget.find('.SapphireHeader-demographics');
		this.$information = this.$widget.find('.SapphireHeader-information');
		this.$additionalTrigger = this.$widget.find('.SapphireHeader-additional-trigger');
		this.$additionalContent = this.$widget.find('.SapphireHeader-additional-content');
		this.handleResize();
		this.attachEvents();
		$(function () {
			setTimeout(function () {
				_this.handleDemographics();
			}, 500);
		});
	};

	SapphireHeader.prototype.getConfig = function () {
		return this.config;
	};

	SapphireHeader.prototype.handleResize = function () {
		var _this = this;
		$(window).resize(function () {
			_this.handleDemographics();
		});
	};

	SapphireHeader.prototype.attachEvents = function () {
		var _this = this;
		this.$additionalTrigger.on('click', function () {
			if (_this.$header.hasClass('isOpen')) {
				_this.$header.removeClass('isOpen');
			} else {
				_this.$header.addClass('isOpen');
			}
		});
	};

	SapphireHeader.prototype.handleDemographics = function () {
		var _this = this;
		this.$demographic.find('.Demographic-item').css('display', 'none');
		this.$additionalTrigger.hide();
		this.$additionalContent.empty();
		var demographicWidth = this.$demographic.outerWidth(true);
		var itemsTotal = 0;
		this.$demographic.find('.Demographic-item').each(function (index) {
			itemsTotal += parseInt($(this).outerWidth(true), 10);
			if (itemsTotal + 60 < demographicWidth) {
				$(this).css('display', 'inline-block');
			} else {
				$(this).clone().css('display', 'inline-block').appendTo(_this.$additionalContent);
				_this.$additionalTrigger.show();
			}
		});
		if (this.$additionalContent.find('.Demographic-item').length === 0) {
			this.$header.removeClass('isOpen');
		}
	};

	SapphireHeader.prototype.showAdditional = function () {
		return this.$header.addClass('isOpen');
	};

	SapphireHeader.prototype.hideAdditional = function () {
		return this.$header.removeClass('isOpen');
	};

	SapphireWidgets.SapphireHeader = {
		create: create,
		handleDemographics: handleDemographics,
	};

})(jQuery, window, document, SapphireWidgets);

$(window).load(function () {
	if (!!$('.SapphireHeader-demographics').length) {
		osAjaxBackend.BindAfterAjaxRequest(function () {
			window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
		});
	}
});

/***/ }),

/***/ "./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphireRadioButton */
SapphireWidgets.SapphireRadioButton = widgetId => {
	var $widget = $('#' + widgetId);
	var $control = $widget.find('input[type="radio"]');
	var name = $control.prop('name');

	$control.click(function() {
		$widget.removeClass('active');
		$('input[type="radio"][name="' + name + '"]').each(function() {
			$(this)
				.closest('.ButtonRadioInp')
				.removeClass('active');
		});
		if ($(this).is(':checked')) {
			$widget.addClass('active');
		} else {
			$widget.removeClass('active');
		}
	});

	$widget.find('.ButtonRadioInp_radioText').click(function() {
		if (
			$(this)
				.closest('.ButtonRadioInp')
				.hasClass('disabled')
		) {
			return false;
		}
		$control.trigger('click');
		$control.trigger('click');
		if ($control.is(':checked')) {
			$widget.addClass('active');
		} else {
			$widget.removeClass('active');
		}
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/section-expandable-custom/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/section-expandable-custom/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SectionExpandable */
(function ($, window, SapphireWidgets) {

	function SectionExpandableCustom() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			var Section = $(ob).parent();
			var SectionContent = Section.children('.SectionExpandableCustom_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				if ($('.Page').hasClass('ie8') || $('.Page').hasClass('ie9')) {
					SectionContent.height('auto');
					SectionContent.css('overflow', 'visible');
				}

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function () {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		}

		// ajax refres function
		that.ajaxRefresh = function () {
			// remove click events
			$('.SectionExpandable_headerCustom').off();

			// add stop prepagation
			$('.SectionExpandable_headerCustom input, .SectionExpandable_headerCustom select, .SectionExpandable_headerCustom a').click(function (event) {
				event.stopPropagation();
			});

			// add new click events
			$('.SectionExpandable_headerCustom').on('click', function () {
				clickEvents(this);
			});

			// each all sections
			$('.SectionExpandableCustom').each(function () {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = {
						client: stat,
						server: stat,
					};
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.SectionExpandableCustom_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function () {
			// each all sections to create array stat
			$('.SectionExpandableCustom').each(function () {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[$(this).attr('id')] = {
					client: stat,
					server: stat,
				};

				if ($(this).hasClass('HideWhenEmpty') && $(this).find('.SectionExpandableCustom_content').text().length === 0) {
					$(this).hide();
				}

				// hack to display a message when SectionExpandableCustom has no child items
				var isEmpty = true;
				$(this).find('.SectionExpandableCustom_content div, .SectionExpandableCustom_content span').not('.SectionExpandableCustom_content--empty').each(function () {
					if ($(this).text().length > 0) {
						isEmpty = false;
						return false;
					}
				});
				if (!isEmpty) {
					$(this).find('.SectionExpandableCustom_content--empty').css({
						display: 'none',
					});
				}



				var $expandableInstance = $(this);
				var $toggler = $(this).find('> .SectionExpandable_headerCustom .SectionExpandable-toggler');
				if ($toggler.length === 1) {
					var $togglerState = false;
					$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelshow]').data('labelshow'));
					$toggler.off('click').on('click', function (evt) {
						evt.stopPropagation();
						$togglerState = !$togglerState;
						if ($togglerState) {
							$expandableInstance.find('.SectionExpandable-toggled').show();
							$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelhide]').data('labelhide'));
						} else {
							$expandableInstance.find('.SectionExpandable-toggled').hide();
							$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelshow]').data('labelshow'));
						}
					});
				}








			});

			// add click events
			$('.SectionExpandable_headerCustom').off("click").on('click', function () {
				clickEvents(this);
			});

			// add stop prepagation
			$('.SectionExpandable_headerCustom input, .SectionExpandable_headerCustom select, .SectionExpandable_headerCustom a').click(function (event) {
				event.stopPropagation();
			});

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const create = () => {
		SilkUI.SectionExpandable = new SectionExpandableCustom();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on SilkUIFramework/Content/SectionExpandable');
	};

	SapphireWidgets.SectionExpandable = {
		create,
	};

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/section-expandable-inside/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/section-expandable-inside/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SectionExpandableInside */
(function($, window, SapphireWidgets) {
	function SectionExpandableInside() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			var Section = $(ob).parent();
			var SectionContent = Section.children('.SectionExpandableInside_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function() {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		}

		// ajax refres function
		that.ajaxRefresh = function() {
			// remove click events
			$('.SectionExpandableInside .SectionExpandableInside_header').off();

			// add stop prepagation
			$(
				'.SectionExpandableInside .SectionExpandableInside_header input, .SectionExpandableInside .SectionExpandableInside_header select, .SectionExpandableInside .SectionExpandableInside_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// add new click events
			$('.SectionExpandableInside .SectionExpandableInside_header').on('click', function() {
				clickEvents(this);
			});

			// each all sections
			$('.SectionExpandableInside').each(function() {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = { client: stat, server: stat };
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.SectionExpandableInside_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function() {
			// each all sections to create array stat
			$('.SectionExpandableInside').each(function() {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[$(this).attr('id')] = { client: stat, server: stat };
			});

			// add click events
			$('.SectionExpandableInside .SectionExpandableInside_header').off("click").on('click', function() {
				clickEvents(this);
			});

			// add stop prepagation
			$(
				'.SectionExpandableInside .SectionExpandableInside_header input, .SectionExpandableInside .SectionExpandableInside_header select, .SectionExpandableInside .SectionExpandableInside_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const setOpenCloseClass = id => {
		id.click(function() {
			if (id.parent().hasClass('expanded')) {
				$(this)
					.find('.HeaderIcon')
					.removeClass('open');
				$(this)
					.find('.HeaderIcon')
					.addClass('closed');
			} else {
				$(this)
					.find('.HeaderIcon')
					.removeClass('closed');
				$(this)
					.find('.HeaderIcon')
					.addClass('open');
			}
		});
	};

	const create = () => {
		SilkUI.SectionExpandable = new SectionExpandableInside();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on SilkUIFramework/Content/SectionExpandable');
	};

	SapphireWidgets.SectionExpandableInside = {
		create,
		setOpenCloseClass,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/select-system/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/select-system/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SelectSystem */
SapphireWidgets.SelectSystem = config => {
	$(function () {
		var WidgetId = config.WidgetId; //Combo Box Id to be used.
		var Class = config.Class; //All Combo boxes with this class will be be transformed.
		var NoResultsText = config.NoResultsText; //Text to display when there are no results.
		var inputType = config.InpuType; //Options: FIlters, Dropdown, Select2
		var Prompt = config.Prompt; //Prompt in search
		var Select2Type = config.SelectType; // Type of select2 configuration
		var HasSearch = config.HasSearch; // has search
		var OnSelectingJS = config.OnSelectingJS;
		var OnUnSelectingJS = config.OnUnSelectingJS;
		var MaximumLength = config.MaximumLength;
		var SelectedValue = config.SelectedValue;
		var allowClear = config.allowClear;
		//  Select2 Ajax Configuration
		var AjaxURL = config.AjaxURL;
		var AjaxDelay = config.AjaxDelay;
		var PaginationSize = config.PaginationSize;
		var MinimumInputLenght = config.MinimumInputLenght;
		var SearchTerm = config.SearchTerm;
		var SearchExtraParam1 = config.SearchExtraParam1;
		var PageTerm = config.PageTerm;
		var AmountPage = config.PageAmount;
		var isMultiple = config.isMultiple;
		var Select2Options = {};
		var $WidgetIdentifier;

		/*  
          Change select2 search display 
              -Multiple Select2 search UI like Single Select2
      */
		$.fn.select2.amd.define(
			'SearchLikeSingle',
			[
				'select2/utils',
				'select2/dropdown',
				'select2/dropdown/attachBody',
				'select2/dropdown/attachContainer',
				'select2/dropdown/search',
				'select2/dropdown/minimumResultsForSearch',
			],
			function (Utils, Dropdown, AttachBody, AttachContainer, Search, minimumResultsForSearch) {
				let dropdownSearch = Utils.Decorate(Dropdown, Search);
				dropdownSearch.prototype.render = function () {
					var $rendered = Dropdown.prototype.render.call(this);
					// Add ability for a placeholder in the search box
					let placeholder = this.options.get('placeholderForSearch') || '';
					var $search = $(
						'<span class="select2-search select2-search--dropdown">' +
						'<input class="select2-search__field" placeholder="' +
						placeholder +
						'" type="search"' +
						' tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off"' +
						' spellcheck="false" role="textbox" />' +
						'</span>'
					);

					this.$searchContainer = $search;
					this.$search = $search.find('input');
					$search.addClass('MultipleSelect');

					$rendered.prepend($search);
					$search.parent().addClass('MultipleSelect');
					return $rendered;
				};

				// Decorate the dropdown+search with the containers
				let adapter = Utils.Decorate(dropdownSearch, AttachContainer);
				adapter = Utils.Decorate(adapter, AttachBody);

				return adapter;
			}
		);

		/**
		 * Default Configuration needed to associate the widget to the select2 plugin
		 */
		if (WidgetId === '' && Class != '') {
			$WidgetIdentifier = $('.' + Class);
		} else {
			$WidgetIdentifier = $('#' + WidgetId);
		}
		Select2Options.containerCssClass = 'select-hide ' + inputType;

		//  Select2Options.dropdownParent= $('#'+ParentDiv);

		var formatResult = function (result) {
			var $selectedOptionsValue = $WidgetIdentifier.find(':selected');
			var selectedOptions = $selectedOptionsValue.length;
			var totalOptions = $WidgetIdentifier.find('option').length;
			var selectAllOpt = $WidgetIdentifier.find('option:first-child:selected').length;
			var activeValues = '';
			var allOptExceptAll = $WidgetIdentifier.find(':selected:not(".SelectedAll")').length;
			var $allOptExceptAllObj = $WidgetIdentifier.find(':selected:not(".SelectedAll")');

			if (selectedOptions === totalOptions) {
				if (totalOptions - 1 > 3) {
					return 'All Selected';
				} else {
					$allOptExceptAllObj.each(function () {
						activeValues = activeValues + ' ' + $(this)[0].innerText;
					});
					activeValues = activeValues.replace(/,\s*$/, '');
					return activeValues;
				}
			} else {
				var totalopt = totalOptions - 1;
				if (selectedOptions > 3) {
					return selectedOptions + ' of ' + totalopt + ' selected';
				} else {
					if (selectedOptions > 0) {
						$selectedOptionsValue.each(function () {
							activeValues = activeValues + ' ' + $(this)[0].innerText + ', ';
						});
						activeValues = activeValues.replace(/,\s*$/, '');
						return activeValues;
					} else {
						return 'Select an option';
					}
				}
			}
		};

		if (NoResultsText != '') {
			Select2Options.formatNoMatches = function () {
				return NoResultsText;
			};
		}

		if (inputType != '') {
			Select2Options.dropdownCssClass = inputType;
		}

		if (allowClear === 'True') {
			Select2Options.allowClear = true;
		}

		if (MaximumLength != '') {
			Select2Options.maximumInputLength = MaximumLength;
		}

		if (Prompt != '') {
			Select2Options.placeholder = Prompt;
		} else {
			Select2Options.placeholder = {
				id: '-1', // the value of the option
				text: 'Select an option',
			};
		}

		if (Select2Type === '3') {
			// Select2 Ajax
			Select2Options = {};
			/* Select2Options.containerCssClass=':all';*/

			Select2Options.allowClear = false;
			Select2Options.templateSelection = function (repo) {
				return repo.full_name || repo.text;
			};
			Select2Options.templateResult = function (repo) {
				if (repo.loading) {
					return repo.text;
				}
				var markup = '<div class=""Clearfix"">' + '<div class=""ThemeGrid_Width12"">' + repo.text + '</div>';
				if (repo.description) {
					markup += '<div class=""OSAutoMarginTop"">' + repo.description + '</div>';
				}
				markup += '</div>';
				return markup;
			};

			(Select2Options.ajax = {
				url: AjaxURL,
				dataType: 'json',
				delay: AjaxDelay,
				data: function (params) {
					var Select2AjaxOpt = {};
					var SplitParameter = SearchExtraParam1.split(',');
					Select2AjaxOpt.SearchTerm = params.term;
					Select2AjaxOpt.Page = params.page || 1;
					Select2AjaxOpt.PageAmount = AmountPage;

					SplitParameter.forEach(function (el) {
						var splitText = el.split(':');
						Select2AjaxOpt[splitText[0]] = splitText[1];
					});

					return Select2AjaxOpt;
				},
				processResults: function (data, params) {
					params.page = params.page || 1;
					return {
						results: data.items,
						pagination: {
							more: params.page * PaginationSize < data.total_count,
						},
					};
				},
				cache: true,
			}),
			(Select2Options.minimumInputLength = MinimumInputLenght);
			Select2Options.escapeMarkup = function (markup) {
				return markup;
			};
			if (config.isMultiple) {
				Select2Options.multiple = true;
				Select2Options.containerCssClass = 'Select2Ajax Multiple';
				Select2Options.dropdownCssClass = 'Select2Ajax Multiple';
			} else {
				Select2Options.multiple = false;
				Select2Options.containerCssClass = 'Select2Ajax';
				Select2Options.dropdownCssClass = 'Select2Ajax';
			}

			Select2Options.minimumResultsForSearch = 0;
			Select2Options.tags = true;
			Select2Options.closeOnselect = true;
			Select2Options.placeholder = Prompt;
		}

		if (Select2Type === '2') {
			//Select2 with CheckBox

			var isAllSelected = false;
			if ($WidgetIdentifier[0].options.length === $WidgetIdentifier[0].selectedOptions.length) {
				isAllSelected = true;
			}

			if (WidgetId != '') {
				option = new Option('Select All', 'All', true, isAllSelected);
				$WidgetIdentifier.prepend(option);
				$WidgetIdentifier.find('option:first-child').addClass('SelectedAll');
			}
			Select2Options.multiple = true;
			Select2Options.closeOnSelect = false;
			Select2Options.allowHtml = false;
			Select2Options.tags = false;

			if (HasSearch === 'True') {
				Select2Options.dropdownAdapter = $.fn.select2.amd.require('SearchLikeSingle');
			} else {
				Select2Options.minimumResultsForSearch = -1;
			}

			Select2Options.containerCssClass = 'MultipleSelect';
			Select2Options.dropdownCssClass = 'MultipleSelect';
			Select2Options.templateSelection = formatResult;
		}

		if (Select2Type === '6') {
			// Select2 HtmlOptions
			Select2Options = {};
			var dataHtmlOption = [];
			$WidgetIdentifier.find('option').each(function (key, value) {
				var optionObject = {
					id: $(this).val(),
					text: $(this).text(),
					html: $(this).text(),
				};
				dataHtmlOption.push(optionObject);
			});

			Select2Options.containerCssClass = 'customSelect';
			Select2Options.dropdownCssClass = 'dropdownCustom';
			Select2Options.data = dataHtmlOption;
			Select2Options.escapeMarkup = function (markup) {
				return markup;
			};

			if (SelectedValue != '') {
				$WidgetIdentifier.val(SelectedValue).trigger('change');
			} else {
				$WidgetIdentifier.val('').trigger('change');
			}
		}

		if (Select2Type === '1') {
			// Select2 TagCustom
			Select2Options.tags = true;
			Select2Options.containerCssClass = 'tagCustom';
			Select2Options.dropdownCssClass = 'tagCustom';
			Select2Options.TokenSeparatos = [',', ' '];
			Select2Options.createSearchChoice = function (term, data) {
				if (
					$(data).filter(function () {
						return this.text.localeCompare(term) === 0;
					}).length === 0
				) {
					return {
						id: term,
						text: term,
					};
				}
			};
		}

		if (Select2Type === '5') {
			// Select2 TagMultiple
			Select2Options.tags = true;
			Select2Options.containerCssClass = 'tagSystem';
			Select2Options.dropdownCssClass = 'tagSystem';
			Select2Options.createTag = function (params) {
				var term = $.trim(params.term);
				if (term === '') {
					return null;
				}
				return {
					id: '#' + term,
					text: term,
					newTag: true, // add additional parameters
				};
			};
		}

		if (HasSearch === 'False') {
			Select2Options.minimumResultsForSearch = -1;
		}

		if (OnUnSelectingJS != '' || OnSelectingJS != '') {
			$WidgetIdentifier
				.select2(Select2Options)
				.on('select2:unselecting', function (e) {
					$(this).data('unselecting', true);
					OnUnSelectingJS;
				})
				.on('select:selecting', function (e) {
					OnSelectingJS;
				})
				.on('select:opening', function (e) {
					if ($(this).data('unselecting')) {
						$(this).removeData('unselecting');
						e.preventDefault();
					}
				})
				.on('select:open', function (evt) {
					evt.preventDefault();
				})
				.on('select2:close', function (evt) {
					evt.preventDefault();
				});
		} else {
			if (Select2Type === '2') {
				$WidgetIdentifier.select2(Select2Options);
				var idwidget = '#' + WidgetId;

				$WidgetIdentifier.on('select2:select', function (e) {
					UnselectedId = e.params.data.id;
					if (UnselectedId === 'All') {
						var selectedItems = [];
						var allOptions = $(idwidget + ' option');
						allOptions.each(function () {
							selectedItems.push($(this).val());
						});
						$WidgetIdentifier.select2('destroy');
						$WidgetIdentifier.val(selectedItems).trigger('change');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
					} else {
						var selectedOptions = $WidgetIdentifier.find('option:selected').length;
						var totalOptions = $WidgetIdentifier.find('option').length;
						if (selectedOptions === totalOptions - 1 && $(idwidget + ' >  option:selected:first-child').length === 0) {
							var selectedItems = [];
							var allOptions = $(idwidget + ' option');
							allOptions.each(function () {
								selectedItems.push($(this).val());
							});
							$WidgetIdentifier.select2('destroy');
							$WidgetIdentifier.val(selectedItems).trigger('change');
							$WidgetIdentifier.select2(Select2Options);
							$WidgetIdentifier.select2('open');
						}
					}
				});

				$WidgetIdentifier.on('select2:unselect', function (e) {
					UnselectedId = e.params.data.id;
					if (UnselectedId === 'All') {
						$(idwidget + ' > option').removeAttr('selected');
						$WidgetIdentifier.select2('destroy');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
						$(idwidget)
							.val('')
							.trigger('change');
						//$(idwidget +' > option').attr('selected', "selected");
					} else {
						$(idwidget + ' > option:first-child').removeAttr('selected');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
					}
				});
			} else {
				$WidgetIdentifier.select2(Select2Options);
			}
		}
	});
};

/***/ }),

/***/ "./src/components/05-components/v3-pat/shift-container/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/shift-container/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ShiftContainer */
(function ($, window, document, SapphireWidgets) {

	let shiftTimelineResizeTimer;
	let $shiftContainerId = $();

	const create = shiftContainerId => {

		// $('.ShiftCard_timeLine').css('visibility', 'hidden');

		$('.ShiftExpandable_container .ActionsMenu ').css('display', 'none');

		$shiftContainerId = $(shiftContainerId);

		hasScrollBar();
		handleShiftTable();

		// setTimeout(function () {
		// 	$('.ShiftCard_timeLine').css('visibility', 'visible');
		// 	$('.ShiftExpandable_container .ActionsMenu ').css('display', 'block');
		// }, 1500);

		$('.ShiftExpandable__arrow').off('mousedown').on('mousedown', function () {
			setTimeout(function () {
				redrawShiftTimeline();
			}, 1500);
		});

	};

	const handleShiftTable = () => {
		$('.ShiftExpandable').each(function (index, el) {
			var $elFlag = $(this).parent().find('.FlagLine');
			var $elFlagTime = $(this).parent().find('.FlagLine_time');
			var $columnFlag = $elFlag.data('column');
			var $minutesFlag = $elFlag.data('minutes');
			var $slots = $(this).closest('.ShiftContainer').find('.ShiftContainer_header').find('.ShiftCellContent');
			var $slotWidth = Math.round($slots.eq(0).width());
			var minutesPosition = ($minutesFlag * $slotWidth) / 60;

			// handle current time flog horizontal positioning
			var slotsPosition = [];
			$slots.each(function (index, el) {
				slotsPosition.push($(this).position().left);
			});
			$elFlag.css('left', slotsPosition[$columnFlag - 1] + minutesPosition);
			$elFlag.css('display', 'block');
			if ($columnFlag === $slots.length) {
				$elFlagTime.css({
					right: '1px',
					left: 'auto',
				});
			}

			// handle cells that might span over several slots
			$(this).find('.ShiftCard').each(function (index, elRow) {
				var rowHasSpannedCell = false;
				$(elRow).find('.ShiftCellContent').each(function (index, elCell) {
					var colspan = $(elCell).data('colspan');
					if (colspan === slotsPosition.length || rowHasSpannedCell) {
						$(elCell).css({
							display: 'inline-block',
							flex: '1 1 auto',
						});
					} else if (colspan > 1) {
						rowHasSpannedCell = true;
						$(elCell).css({
							display: 'inline-block',
							flex: 'none',
							width: +(slotsPosition[colspan] - slotsPosition[0]) + 'px',
						});
					}
				});
			});

			// handle horizontal scroll behavior
			if (el.scrollWidth > el.clientWidth) {
				$(el).width(el.scrollWidth);
				$(this).closest('.ShiftContainer').find('.ShiftContainer_header').width(el.scrollWidth);
			} else {
				$(el).width('auto');
				$(this).closest('.ShiftContainer').find('.ShiftContainer_header').width('auto');
			}
		});
	};

	const hasScrollBar = () => {
		var $ScrollableDiv = $shiftContainerId.find('.ShiftExpandable_container');
		if ($shiftContainerId.find('.ShiftExpandable_container').length > 0) {
			if ($ScrollableDiv.get(0).scrollHeight > $ScrollableDiv.height()) {
				var $lastCell = $shiftContainerId.find('.IsTimer:last-child');
				$lastCell.css('padding-right', '7px');
			}
		}
	};

	const redrawShiftTimeline = () => {
		clearTimeout(shiftTimelineResizeTimer);
		shiftTimelineResizeTimer = setTimeout(function () {
			hasScrollBar();
			handleShiftTable();
		}, 400);
	};

	const checkScroll = () => {
		var hContent = $('.Content').height();
		var hWindow = $(window).height();

		if (hContent > hWindow) redrawShiftTimeline();
	};

	SapphireWidgets.ShiftContainer = {
		create,
		checkScroll,
		redrawShiftTimeline
	};
})(jQuery, window, document, SapphireWidgets);


$(window).off('resize.GenericGallery').on('resize.GenericGallery', function () {

	$('.ShiftCard_timeLine').css('visibility', 'hidden');
	$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');

	SapphireWidgets.ShiftContainer.redrawShiftTimeline();

	osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.ShiftContainer.redrawShiftTimeline);

	setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 1000);

	setTimeout(function () {
		$('.ShiftCard_timeLine').css('visibility', 'visible');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
	}, 1500);

});

$(window).load(function () {
	if (!!$('.ShiftContainer').length) {

		$('.ShiftCard_timeLine').css('visibility', 'hidden');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');

		setTimeout(function () {
			SapphireWidgets.ShiftContainer.redrawShiftTimeline();
		}, 400);

		setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 500);

		setTimeout(function () {
			$('.ShiftCard_timeLine').css('visibility', 'visible');
			$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
		}, 600);

		$('.navigation-control-item').off('click').on('click', function () {
			$('.ShiftCard_timeLine').css('visibility', 'hidden');
			$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');
		});

		//Verify the scroll if tooltip opened
		$('.ShiftExpandable_container').on('scroll', function () {
			if ($('.tooltipster-base').is(':visible')) {
				$('.tooltipster-base').css('visibility', 'hidden');
			}
		});

		osAjaxBackend.BindAfterAjaxRequest(function () {

			setTimeout(function () {
				SapphireWidgets.ShiftContainer.redrawShiftTimeline();
			}, 400);

			setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 500);

			setTimeout(function () {
				$('.ShiftCard_timeLine').css('visibility', 'visible');
				$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
			}, 600);

			// SapphireWidgets.ShiftContainer.redrawShiftTimeline;

		});

	}
});

/***/ }),

/***/ "./src/components/05-components/v3-pat/sidebar/sidebar-structure.js":
/*!**************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sidebar/sidebar-structure.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ISidebar */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {
		window[config.widgetId] = new Sidebar(config);
		SapphireWidgets.Sidebar.widgetId = config.widgetId;
	};

	var close = function () {
		window[SapphireWidgets.Sidebar.widgetId].close();
	};

	var Sidebar = function (config) {
		var _this = this;
		this.isExpandable = config.isExpandable;
		this.$widget = $('#' + config.widgetId);
		this.$sidebar = this.$widget.find('.ISidebar');
		this.$sidebarMenu = this.$widget.find('.ISidebar-menu');
		this.$sidebarMenuItem = this.$widget.find('.SidebarMenuItem');
		this.$sidebarShield = this.$widget.find('.ISidebar-shield');
		this.$sidebarContent = this.$widget.find('.ISidebar-content');
		this.$sidebarContent.find('> div').each(function () {
			if ($(this).hasClass('PH') && $(this).text() === '') {
				$(this).remove();
			}
		});
		this.attachEvents();
		if (!this.isExpandable) {
			this.openMenuItem(0);
		}
		$(function () {
			window.parent.$('.lds-ring').fadeOut();
			if (!this.isExpandable) {
				$('input[type="text"]:visible').eq(0).focus();
			}
		});
		$(window).unload(function () {
			window.parent.$('.lds-ring').fadeOut();
		});
	};

	Sidebar.prototype.attachEvents = function () {
		var _this = this;
		this.$sidebarMenu.on('click', function (evt) {
			evt.stopPropagation();
			if (!_this.$sidebar.hasClass('open')) {
				_this.openMenuItem(0);
			}
		});
		this.$sidebarMenuItem.on('click', function () {
			var selectedPosition = $(this).index();
			_this.openMenuItem(selectedPosition);
		});
		this.$sidebarShield.on('click', function () {
			_this.close();
		});
		this.$sidebar.on('click', '.SearchSideBarFields .ButtonGroup_button:first-child', function () {
			_this.$sidebar
				.find('.FieldsSlider')
				.addClass('Tab1')
				.removeClass('Tab2');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
		this.$sidebar.on('click', '.SearchSideBarFields .ButtonGroup_button:last-child', function () {
			_this.$sidebar
				.find('.FieldsSlider')
				.addClass('Tab2')
				.removeClass('Tab1');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
	};

	Sidebar.prototype.openMenuItem = function (selectedPosition) {
		var _this = this;
		this.$sidebar
			.find('.SidebarMenuItem')
			.removeClass('active')
			.eq(selectedPosition)
			.addClass('active');
		this.$sidebar
			.find('.ISidebar-content > .ISidebar-content-panel')
			.hide()
			.eq(selectedPosition)
			.show();
		this.$sidebar.addClass('open');
		if (window.parent.length && this.isExpandable) {
			window.parent.SapphireWidgets.LayoutBase.openSidebarIframe(0);
		}
		if (this.$sidebarContent.find('.TextInput:visible').length > 0) {
			this.setFieldFocus(this.$sidebarContent.find('.TextInput:visible').eq(0));
		}
	};

	Sidebar.prototype.setFieldFocus = function ($input) {
		window.setTimeout(function () {
			$input.click().select();
		}, 250);
	};

	Sidebar.prototype.close = function () {
		var _this = this;
		if (window.parent.length) {
			window.parent.SapphireWidgets.LayoutBase.closeSidebarIframe(0);
		}
		if (this.isExpandable) {
			this.$sidebar.removeClass('open');
			this.$sidebar.find('.SidebarMenuItem').removeClass('active');
			this.$sidebar.find('.ISidebar-content > .ISidebar-content-panel').hide();
		}
	};

	SapphireWidgets.Sidebar = {
		create: create,
		close: close,
	};
})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/spinner-horizontal/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/spinner-horizontal/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SpinnerHorizontal */
SapphireWidgets.SpinnerHorizontal = {
	increment: function (elementId, minValue, maxValue, triggerOnChange) {
		var _element = $(elementId).find('input[type="number"]').first();
		if (_element.val() == undefined || _element.val() == '' || isNaN(parseFloat(_element.val()))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
		} else {
			if (parseFloat(_element.val()) < maxValue) {
				_element.val(parseFloat(_element.val()) + 1);
				if (triggerOnChange) {
					_element.trigger('change');
				}
				$(elementId).find('a.Minus').removeAttr('disabled');
			}
			if (parseFloat(_element.val()) >= maxValue) {
				$(elementId).find('a.Plus').attr('disabled', 'disabled');
			}
		}
	},
	decrement: function (elementId, minValue, triggerOnChange) {
		var _element = $(elementId)
			.find('input[type="number"]')
			.first();
		if (_element.val() == undefined || _element.val() == '' || isNaN(parseFloat(_element.val()))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
		} else {
			if (parseFloat(_element.val()) > minValue) {
				_element.val(parseFloat(_element.val()) - 1);
				if (triggerOnChange) {
					_element.trigger('change');
				}
				$(elementId)
					.find('a.Plus')
					.removeAttr('disabled');
			}
			if (parseFloat(_element.val()) <= minValue) {
				$(elementId)
					.find('a.Minus')
					.attr('disabled', 'disabled');
			}
		}
	},
};

/***/ }),

/***/ "./src/components/05-components/v3-pat/spinner-vertical/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/spinner-vertical/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SpinnerVertical */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		$(document).ready(function() {
			var MinValue = ' + MinValue + ';

			$(`#${config.widgetID} .SpinnerInputVertical input`).on('blur keyup input', function() {
				var CurrentInputValue = $(`#${config.widgetID} .SpinnerInputVertical input`).val();

				if (CurrentInputValue < MinValue) {
					$(`#${config.widgetID}`)
						.find('.MinusVertical')
						.addClass('DisabledSpin');
				} else {
					$(`#${config.widgetID}`)
						.find('.MinusVertical')
						.removeClass('DisabledSpin');
				}
			});

			if ($(`#${config.widgetID} .SpinnerInputVertical input`).val() <= MinValue) {
				$(`#${config.widgetID}`)
					.find('.MinusVertical')
					.addClass('DisabledSpin');
			}

			if (config.isCursorOnFocus) {
				$('body').on('focus', `#${config.inputID} input`, function() {
					var that = this;

					setTimeout(function() {
						that.selectionStart = that.selectionEnd = 100000;
					}, 300);
				});
			}
		});
	};

	const increment = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput) => {
		let _element = $(elementId)
			.find('input[type="text"], input[type="number"]')
			.first();
		var forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		var currentValue = parseFloat(_element.val());
		var incrementUnit = 1;
		var isDecimals = currentValue % 1 != 0;

		$(elementId)
			.find('.MinusVertical')
			.removeClass('DisabledSpin');

		if (parseFloat(currentValue) < minValue) {
			$(elementId)
				.find('a.MinusVertical')
				.addClass('DisabledSpin');
		} else {
			$(elementId)
				.find('a.MinusVertical')
				.removeClass('DisabledSpin');
		}

		if (!forceInteger) {
			if (isDecimals) {
				incrementUnit = parseFloat(0.1);
			}
		}
		if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
			if (triggerOnInput) {
				_element.trigger('input');
			}
		} else {
			if (parseFloat(currentValue) < maxValue) {
				if (currentValue === 0 && !forceInteger) {
					incrementUnit = parseFloat(0.1);
				}
				_element.val(parseFloat((currentValue + incrementUnit).toFixed(1)));
				if (triggerOnChange) {
					_element.trigger('change');
				}
				if (triggerOnInput) {
					_element.trigger('input');
				}
				$(elementId)
					.find('a.MinusVertical')
					.removeAttr('disabled');
			} else {
				$(elementId)
					.find('a.PlusVertical')
					.attr('disabled', 'disabled');
			}
		}

		checkSpinnerVerticalDisabledStatus(elementId, parseFloat(_element.val()), minValue, maxValue);
	};

	const decrement = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput) => {
		var _element = $(elementId)
			.find('input[type="text"], input[type="number"]')
			.first();
		var forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		var currentValue = parseFloat(_element.val());
		var incrementUnit = 1;
		var isDecimals = currentValue % 1 != 0;
		if (!forceInteger) {
			if (isDecimals) {
				incrementUnit = parseFloat(0.1);
			}
		}
		if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
			if (triggerOnInput) {
				_element.trigger('input');
			}
		} else {
			if (parseFloat(currentValue) > minValue) {
				if (currentValue === 1 && !forceInteger) {
					incrementUnit = parseFloat(0.1);
				}
				_element.val(parseFloat((currentValue - incrementUnit).toFixed(1)));
				if (triggerOnChange) {
					_element.trigger('change');
				}
				if (triggerOnInput) {
					_element.trigger('input');
				}
				$(elementId)
					.find('a.PlusVertical')
					.removeAttr('disabled');
			} else {
				$(elementId)
					.find('a.MinusVertical')
					.attr('disabled', 'disabled');
			}
		}

		checkSpinnerVerticalDisabledStatus(elementId, parseFloat(_element.val()), minValue, maxValue);
	};

	const checkSpinnerVerticalDisabledStatus = (elementId, valueToCheck, minValue, maxValue) => {
		if (valueToCheck <= minValue) {
			$(elementId)
				.find('a.MinusVertical')
				.attr('disabled', 'disabled');
		} else {
			$(elementId)
				.find('a.MinusVertical')
				.removeAttr('disabled');
		}
		if (valueToCheck >= maxValue) {
			$(elementId)
				.find('a.PlusVertical')
				.attr('disabled', 'disabled');
		} else {
			$(elementId)
				.find('a.PlusVertical')
				.removeAttr('disabled');
		}
	};

	SapphireWidgets.SpinnerVertical = {
		create,
		increment,
		decrement,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/split-button/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/split-button/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SplitButton */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		window[config.widgetId] = new SplitButton(config);
	};

	var SplitButton = function(config) {
		var _this = this;
		this.config = config;
		this.$widget = $('#' + this.config.widgetId);
		this.$button = this.$widget.find('.SplitButton-button');
		this.$buttonLink = this.$button.find('> a');
		this.$trigger = this.$widget.find('.SplitButton-trigger');
		this.$actions = this.$widget.find('.SplitButton-actions');
		if (!!this.$actions.text()) {
			this.$widget.find('> .SplitButton').addClass('hasTrigger');
			this.buildActionsTrigger();
		}
	};

	SplitButton.prototype.buildActionsTrigger = function() {
		var _this = this;
		var classList = this.$buttonLink[0].classList.value;
		this.$trigger.addClass(classList);
		$(function() {
			// inside a document ready due to sapphire popup binded events
			// console.log(_this.config.widgetId, _this.$trigger.hasClass('tooltipstered'));
			if (!_this.$trigger.hasClass('tooltipstered')) {
				_this.$trigger.tooltipster({
					arrow: true,
					content: $('<section/>').append(_this.$actions.clone(true)),
					trigger: _this.config.triggerEvent,
					position: _this.config.position,
					maxWidth: _this.config.maxWidth,
					theme: 'tooltipster-splitbutton Padding-' + _this.config.padding,
				});
				_this.$actions.remove();
			}
		});
	};

	SapphireWidgets.SplitButton = {
		create: create,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/ssd-component-block/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/ssd-component-block/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var milisecondpassed = 0;
var stoptimer = true;
var myTimout  = null;

function onKeydownFunction() {
    milisecondpassed = 0;
  
    stoptimer=true;
    clearInterval(myTimout);
    myTimout = null;
  };
  
  function onKeyUpFunction(elementToClick) {
  stoptimer = false;
  
  if(milisecondpassed == 0 && myTimout==null){
      myTimout = setInterval(
        function() {
          milisecondpassed+=100;
         
          if (milisecondpassed >= 400 && stoptimer==false) {
            milisecondpassed = 0;
            stoptimer=true;
            clearInterval(myTimout);
            myTimout = null;
            elementToClick.click();
          
          }
          else{
            if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
            }
          }
        }, 100);
        if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
        }
    }
    else{
        if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
        }   
    }
};

if(typeof(ssdComponent) === 'undefined') {

    ssdComponent = {
        length: 0,
        numberOfActive: 0,
        isRTL: false,
        id: '',
        toDestroy: false,
        onBlurDestroy: function() {
            if (ssdComponent.id != '') {
                var _ssdComponent = $('#' + ssdComponent.id);
                var _wrapper = $('[data-ssd-placeholder=' + ssdComponent.id + ']');
                if (ssdComponent.toDestroy) {
                    _wrapper.find('.SSDListRefreshHandler').find('a.to-destroy').click();
                    _wrapper.remove();
                }
                else {
                     var _wrapper = $('[data-ssd-placeholder=' + ssdComponent.id + ']');
                    _wrapper.find('input').val('');
                    ssdComponent.blur();
                }
            }
        },
        focus: function(ssdComponentWidget) {
            var _ssdComponentWidget = $(ssdComponentWidget).children('div.SSD-Wrapper:not(.Selected)');
            
            if(!_ssdComponentWidget.length)
                return; //If this SSD-Wrapper is already Selected, return.
            
            if(ssdComponent.numberOfActive)
                ssdComponent.blur(); //Blurs the other focused SSD's.
            
            ssdComponent.numberOfActive++;
            if(!_ssdComponentWidget.parent().hasClass('SSDPopup')){
                _ssdComponentWidget.children('.SSD-Component')
                .css({
                    'width': function() {
                        return $(this).outerWidth();
                    },
                    'top': function() {
                        return this.getBoundingClientRect().top + $(document).scrollTop();
                    },
                    'left': function() {
                        if(ssdComponent.isRTL)
                            return 'auto';
                        return this.getBoundingClientRect().left;
                    },
                    'right': function() {
                        if(ssdComponent.isRTL)
                            return $(window).width() - $(this).outerWidth() - this.getBoundingClientRect().left;
                        return 'auto';
                    }
                })
                .children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .siblings('.SSD-List').attr('current-focus', 0);
            }
            else{
                _ssdComponentWidget.children('.SSD-Component')
                .css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .siblings('.SSD-List').attr('current-focus', 0);
            }
            
            if(!_ssdComponentWidget.parent().hasClass('SSDPopup')){
                _ssdComponentWidget.closest('form').append(_ssdComponentWidget);
            }
            _ssdComponentWidget.addClass('Positioned');
            
            setTimeout(
                function() {
                    _ssdComponentWidget.addClass('Selected');
                }
                , 1
            );
            
        },
        
        
        
        blur: function() {
            if(!ssdComponent.numberOfActive)
                return;
            
            var _wrapper = $('div.SSD-Wrapper.Positioned.Selected');
            
            _wrapper.each(function() {
                var parent = $('#' + $(this).attr('data-ssd-placeholder'));
                parent.append($(this));
            });
            
            _wrapper.removeClass('Positioned')
            .children('.SSD-Component')
                .css({
                    'width': '',
                    'top': '',
                    'left': '',
                    'right': ''
                })
                .removeClass('Searching Fixed KeyboardNav')
            .children('.SSD-Bar').css({
                'width': ''
            });
                
            setTimeout(
                function() {
                    _wrapper.removeClass('Selected')
                    .find('.SSD-Bar').each(function() {
                        ssdComponent.tabsClear(this);
                    });
                }
                , 1
            );
                
            ssdComponent.numberOfActive--;
            $(".SSD_ListRecords span, .SSD_ListLine.ShowMore, .SSD_DeleteOnBlur").remove();
        },
        resize: function() {
            if(!ssdComponent.numberOfActive)
                return; //If there's no SSD active, there's no need to resize it.
            
            var _ssdWrapper = $('div.SSD-Wrapper.Selected').first();
            var _ssdComponentWidget = $('#' + _ssdWrapper.attr('data-ssd-placeholder'))[0];
            var _ssdComponent = _ssdWrapper.children('.SSD-Component');
            
            if (typeof _ssdComponentWidget.getBoundingClientRect !== "undefined") {
                _ssdComponent.css({
                    'width': function() {
                        return $(_ssdComponentWidget).width();
                    }/*,
                    'top': function() {
                        return _ssdComponentWidget.getBoundingClientRect().top + $(document).scrollTop();
                    },
                    'left': function() {
                        if(ssdComponent.isRTL)
                            return 'auto';
                        return _ssdComponentWidget.getBoundingClientRect().left;
                    },
                    'right': function() {
                        if(ssdComponent.isRTL)
                            return $(window).width() - $(_ssdComponentWidget).outerWidth() - _ssdComponentWidget.getBoundingClientRect().left;
                        return 'auto';
                    }*/
                }).children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).closest('.SSD-Component').innerWidth();
                    }
                });
            }
        },
        tabSelect: function(ssdComponentWidget, ssdBar, selectedTab, isInputEvent) {
            var _selectedTab = $(selectedTab);

            if(ssdComponent.numberOfActive == 0) {
                ssdComponent.focus(ssdComponentWidget);
            }
            
            if(!_selectedTab.is('.Selected')) {
                ssdComponent.tabsClear(ssdBar);
                _selectedTab.addClass('Selected');
            }
            
            ssdComponent.focusSelectedTab(ssdBar,isInputEvent);
        },
        focusSelectedTab: function(ssdBar,isInputEvent) {
            // Selected tab is the Search input?
            if(ssdBar.children('.SearchInput-Container.Selected').length) {
                var elementToClick = ssdBar.siblings('.SSDListRefreshHandler').find('a:not(.to-destroy)');
                
                if(isInputEvent){
                    onKeyUpFunction(elementToClick);
                }
                else{
                    elementToClick.click();
                }
                ssdBar.find('.InputPlaceholder input[type="text"]:not(:focus)').first().select().focus();
                return;
            }
            
            // Selected tab is the Short list?
            if(ssdBar.children('.ShortListSelector-Container.Selected').length) {
                ssdBar.find('.ShortListSelector-Container > a').focus();
                return;
            }
        },
        /*
         * Method being called by user action js_ssdComponent_focusCurrentRow
         */
        focusCurrentRow: function() {
            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            var _ssdList = _ssdComponent.find('.SSD-List');
            var _currentFocus = _ssdList.attr('current-focus');

            _ssdComponent.addClass('KeyboardNav');
            _ssdList.find('span.SSD_ListRecords > span:nth-child(' + _currentFocus + ')').addClass('focus');
        },
        tabsClear: function(ssdBar) {
            $(ssdBar).children().removeClass('Selected');
        },
        searchIcon: function(event) {
            ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, $(event.data.ssdBar).children('.SearchInput-Container'),false);
        },
        /*
         * @name inputEvent
         * @description 
         */
        inputEvent: function(event) {
            var _inputContainer = $(event.data.input).closest('.SearchInput-Container');
            
            ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, _inputContainer,true);
            
            if($(event.data.input).val() == '') {
                _inputContainer.closest('.SSD-Component').removeClass('Searching');
            }
            else {
                _inputContainer.closest('.SSD-Component').addClass('Searching');
            }
        },
        keydownEvent: function(event) {
           onKeydownFunction();          
          
        },
        keyboardHandler: function(event) {
            if(event.key == "Shift" || event.key == "Control")
                return;

            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            var _ssdList = _ssdComponent.find('.SSD-List');

            if(event.key == "Enter" && _ssdList.find('.SSD_ListLine.ShowMore.focus').length)
                return;

            if(event.key == "Tab") {
                _ssdComponent.addClass('KeyboardNav');
                return;
            }
            
            if(event.key == "ArrowUp" || event.key == "ArrowDown") {
                var _currentFocus = _ssdList.attr('current-focus');
                var _selectedElement = $(null);
                
                if(_ssdList.find('.SSD_ListLine.ShowMore.focus').length) {
                    _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore.focus');
                }
                else if(_currentFocus > 0) {
                    _selectedElement = _ssdList.find('span.SSD_ListRecords > span:nth-child(' + _currentFocus + ')');
                }
                
                _ssdComponent.addClass('KeyboardNav')
                
                if(event.key == "ArrowUp") {
                    if(_selectedElement.length) {
                        
                        if(_selectedElement.is('.SSD_ListLine.ShowMore.focus')) {
                            _selectedElement.removeClass('focus');
                            _selectedElement = _ssdList.find('span.SSD_ListRecords > span:last-child');
                        }
                        else {
                            _selectedElement = _selectedElement.removeClass('focus').prev();
                        }

                        _currentFocus--;
                    }
                    else {
                        _currentFocus = _ssdList.find('span.SSD_ListRecords > span').length;

                        if(_ssdList.find('.SSD_ListLine.ShowMore').length) {
                            _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore');
                            _currentFocus++;
                        }
                        else {
                            _selectedElement = _ssdList.find('span.SSD_ListRecords > span:last-child');
                        }
                    }
                }
                
                if(event.key == "ArrowDown") {
                    if(_selectedElement.length) {
                        
                        if(_selectedElement.is('.SSD_ListLine.ShowMore.focus')) {
                            _selectedElement.removeClass('focus');
                            _selectedElement = $(null);
                        }
                        else {
                            _selectedElement = _selectedElement.removeClass('focus').next();
                            
                            if(!_selectedElement.length && _ssdList.find('.SSD_ListLine.ShowMore').length) {
                                _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore');
                            }
                        }
                        
                        _currentFocus++;
                    }
                    else {
                        _selectedElement = _ssdList.find('span.SSD_ListRecords > span:first-child');
                        _currentFocus = 1;
                    }
                }
                
                _selectedElement.addClass('focus');
                
                if(!_selectedElement.length) {
                    ssdComponent.focusSelectedTab(_ssdComponent.find('.SSD-Bar'),false);
                    _currentFocus = 0;
                }
                else if (!_selectedElement.find('.SSD_ListLine.Disabled').length){
                    _selectedElement.find('.ExpandControl > a').focus();
                }
                else {
                    _ssdList.find('a.OtherControlLink').focus();
                }
                
                _ssdList.attr('current-focus', _currentFocus);

                return;
            }
            
            ssdComponent.clearKeyboardNavStatus(_ssdComponent);
        },
        clearKeyboardNavStatus: function(ssdComponent) {
            var _ssdComponent = $(ssdComponent);
            var _ssdList = _ssdComponent.find('.SSD-List');

            if(_ssdList.find('.SSD_ListLine.ShowMore.focus').length)
                return;

            _ssdComponent.removeClass('KeyboardNav');
            _ssdList.attr('current-focus', 0)
                .find('span.SSD_ListRecords > span.focus').removeClass('focus')
                .find('.ExpandControl > a').blur();
        },
        scrollHandler: function() {
            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 1024){
                if(_ssdComponent[0].getBoundingClientRect().top > $(".toolbar-wrapper.Fixed").outerHeight()) {
                    _ssdComponent.removeClass('Fixed');
                    return;
                }else{
                    $('.SSD-Wrapper.Selected > .SSD-Component.Fixed > .SSD-Bar').css('top', $(".toolbar-wrapper.Fixed").outerHeight() + 'px'); 
                    
                    
                }
            }else{
                /*Not Mobile apply fixed behaviour*/
                if(_ssdComponent[0].getBoundingClientRect().top > ($('.TopPatientHeader').outerHeight(true) + $('.Header').outerHeight(true) + $(".toolbar-wrapper").outerHeight()+ $('.CTTASLevelAssessmentMainContainer').outerHeight(true) )) {
                    _ssdComponent.removeClass('Fixed');
                    return;
                }else{
                    $('.SSD-Wrapper.Selected > .SSD-Component.Fixed > .SSD-Bar').css('top',($('.TopPatientHeader').outerHeight(true) + $('.Header').outerHeight(true) + $(".toolbar-wrapper").outerHeight() + $('.CTTASLevelAssessmentMainContainer').outerHeight(true)) + 'px'); 
                }
            }


            _ssdComponent.addClass('Fixed');
        },
        destroy: function(_inputId) { /* Used to destroy a specific ssd component by receive the input identifier as parameter and determine the wrapper to remove. */
            $('[data-ssd-placeholder=' + ssdComponent.id + ']').remove();
        },
        init: function(ssdComponentWidget,_toDestroy) {
            ssdComponent.length++;
            ssdComponent.numberOfActive = 0;
            ssdComponent.isRTL = $('html').is('.rtl');
            ssdComponent.toDestroy = _toDestroy;
            if (typeof ssdComponentWidget != 'undefined') {
                ssdComponent.id = $(ssdComponentWidget).attr('id');
            }
            var _ssdComponentWidget = $(ssdComponentWidget);
            var _ssdComponent = _ssdComponentWidget.find('.SSD-Component');
            var _ssdBar = _ssdComponent.children('.SSD-Bar').first();
            var _searchIcon = _ssdBar.find('.SearchIcon').first();
            var _input = _ssdBar.find('input[type="text"]').first();
            var _clearControl = _ssdBar.find('.ClearControl').first();
            
            _searchIcon.off('click').on('click', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar
            }, ssdComponent.searchIcon);
            
            _ssdBar.children('div').off('click').on('click', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar
            }, function(event) {
                ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, this,false);
            });
            
            _clearControl.off('click').on('click', ssdComponent.onBlurDestroy);
            
            _input.off('keyup').on('keyup', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar,
                input: _input
            }, ssdComponent.inputEvent);
            
            _input.off('keydown').on('keydown', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar,
                input: _input
            }, ssdComponent.keydownEvent);
            
            $(_ssdComponent).off('click').on('click', {
                ssdComponent: _ssdComponent
            }, function(event) {
                ssdComponent.clearKeyboardNavStatus(event.data.ssdComponent);
            });
        }
    }
}

$(document).ready(function() {
    $(window).on('resize', function(event) {
        ssdComponent.resize();
    });
    
    $(document).on('click', function(event) {
        if(!$(event.target).is(':visible')) { /* Clicks on hidden elements are dismissed. */
            return;
        }
        
        var e = $(event.target).closest('.SSD-Component');
        
        if(!e.length) { // User clicked outside the SSD-Component?
            ssdComponent.onBlurDestroy();
        }
    });
    
    $(document).on('keydown', function(event) {
        if(ssdComponent.numberOfActive > 0) {
            if(event.keyCode == "27") { // User hit Escape
                ssdComponent.onBlurDestroy();
            }
            if(event.key == "ArrowUp" || event.key == "ArrowDown") {
                event.preventDefault();
            }
        }
    });
    
    $(document).on('keyup', function(event) {
        if(ssdComponent.numberOfActive > 0) { // If there's an SSD component active, go for Keyboard handler
            ssdComponent.keyboardHandler(event);
        }
    });
    
    $(document).on('scroll', function() {
        if(ssdComponent.numberOfActive > 0) { // If there's an SSD component active, go for scroll handler
            ssdComponent.scrollHandler();
        }
    });
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/ssd-list-line/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/ssd-list-line/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SSDListLine */
SapphireWidgets.SSDListLine = {
	toggle: (lineId, lineHandler = '') => {
		var _line = $(lineId).is('.SSD_ListLine')
			? $(lineId)
			: $(lineId)
					.children('.SSD_ListLine')
					.first();

		if (!_line.length) return;

		var _expandControl = $('.expand-control-custom-width');

		if (_expandControl.length != 0) {
			_expandControl.removeClass('expand-control-custom-width');
			_expandControl.css('width', '');
		}

		if (!_line.is('.Active')) {
			var _lineHeader = _line
				.closest('div.SelectableList, .SelectableList-ListRecords')
				.find('div.SelectableList-Line.Active')
				.not(_line);

			_lineHeader.find('a[hide-action]').click();
			_lineHeader
				.removeClass('Active')
				.children('span')
				.hide(200);
			_line.addClass('Active');

			if ($(lineHandler).length) {
				$(lineHandler).click();
			}
		} else {
			_line.removeClass('Active');
		}
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/tabs-extended/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabs-extended/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabsExtended */
SapphireWidgets.TabsExtended = function() {
	$('.Tabs_Extended .Tabs_header > .Tabs__tab').each(function() {
		if ($(this).text() === '') {
			$(this).remove();
		}
	});

	$('.Tabs_Extended .Tabs_header .Tabs__tab:not(.active)')
		.off('mousedown')
		.on('mousedown', function(evt) {
			var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
			$tabsExtended.removeClass('isClosed');
		});

	$('.Tabs_Extended.HideActiveOnClick .Tabs_header')
		.off('mousedown')
		.on('mousedown', '.Tabs__tab.active', function(evt) {
			var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
			var $tabsBody = $tabsExtended.find('.Tabs_body');

			if ($tabsBody.hasClass('Tabs_body--closed')) {
				$tabsBody.removeClass('Tabs_body--closed');
				$tabsExtended.removeClass('isClosed');
			} else {
				$tabsBody.addClass('Tabs_body--closed');
				$tabsExtended.addClass('isClosed');
			}
		});

	$('.Tabs_Extended--disabled').each(function(index, el) {
		$(el)
			.parent()
			.css('cursor', 'default')
			.off('click');
	});

	$('.Tabs_Extended').each(function(index, el) {
		if ($(el).hasClass('Tabs_Extended--closedonstart')) {
			$(el)
				.find('.Tabs_body')
				.addClass('Tabs_body--closed');
			$(el).addClass('isClosed');
			$(el).removeClass('Tabs_Extended--closedonstart');
		}
		$(el)
			.off('click')
			.on('click', '.Tabs_Extended--close', function(evt) {
				$(evt.target)
					.closest('.Tabs_body')
					.addClass('Tabs_body--closed');
			});
	});
};

$(document).ready(function() {
	SapphireWidgets.TabsExtended();
	osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.TabsExtended);
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js":
/*!**********************************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TriggerIframeTooltip */

(function ($, window, document, SapphireWidgets) {

  var create = function (config) {
    var $elementId = $('#' + config.elementId);
    $elementId.addClass('tooltip');

    var extraDataParams = 'data-iframetooltiptriggerid="' + config.elementId + '"';
    var widgetNotifyDiv = $.find('[data-iframetooltiptriggerid="' + config.elementId + '"]');
    if (widgetNotifyDiv.length === 1) {
      extraDataParams += " data-iframetooltipnotifyid=" + $(widgetNotifyDiv).data('iframetooltipnotifyid');
    }

    $elementId.tooltipster({
      contentAsHTML: true,
      theme: config.theme,
      interactive: true,
      position: config.positionId,
      trigger: config.triggerId,
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      zindex: config.zindex,
      content: '<iframe src="' + config.URL + '" style="border:none" id="tooltipster-frame" ' + extraDataParams + '></iframe>',
      functionReady: function (instance, helper) {
        $(helper).css({
          'visibility': 'hidden'
        });
        setTimeout(function () {
          $('.tooltipster-base').css({
            'visibility': 'visible'
          });
        }, 500);
      }
    });
  }

  SapphireWidgets.TriggerIframeTooltip = {
    create
  }

})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/globals.js":
/*!***********************************!*\
  !*** ./src/components/globals.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

//SapphireWidgets = window.SapphireWidgets = window.SapphireWidgets || {};


/***/ }),

/***/ "./src/components/index.scss":
/*!***********************************!*\
  !*** ./src/components/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzIHN5bmMgXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzAwLXNldHRpbmdzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2FwcGhpcmUtcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tY2FyZC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtaGVhZGVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC90cmlnZ2VyLWlmcmFtZS10b29sdGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0I7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG9CQUFvQiwyQkFBMkI7UUFDL0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsbUJBQW1CLGNBQWM7UUFDakM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQixzQkFBc0I7UUFDdkM7UUFDQTtRQUNBO1FBQ0EsUUFBUTtRQUNSO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFVBQVU7UUFDVjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxjQUFjLHdDQUF3QztRQUN0RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxTQUFTO1FBQ1Q7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxlQUFlO1FBQ2Y7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQSxzQ0FBc0MsdUJBQXVCOzs7UUFHN0Q7UUFDQTs7Ozs7Ozs7Ozs7O0FDeHhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JCQSxtQkFBTyxDQUFDLDREQUF5Qjs7QUFFakM7QUFDQTtBQUNBLFdBQVcsNkRBQThDOzs7Ozs7Ozs7Ozs7QUNKekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEOzs7Ozs7Ozs7OztBQ2xFQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOzs7O0FBSUEsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQy9RRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ1BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDeE9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBLGdDQUFnQztBQUNoQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2REQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxzRUFBc0U7QUFDdEUsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN4Y0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDYTs7QUFFYjtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYsYUFBYTtBQUNwRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFVBQVUsU0FBUyxhQUFhO0FBQzNDO0FBQ0EseUNBQXlDLFVBQVUsc0JBQXNCLGFBQWE7O0FBRXRGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxpREFBaUQsWUFBWTs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQWlEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04seURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLDJEQUEyRDs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxzRUFBc0U7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1IsT0FBTztBQUNQLE1BQU07O0FBRU47O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hEOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsb0JBQW9CLGFBQWE7QUFDakM7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sd0RBQXdELFVBQVU7QUFDbEU7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUFLO0FBQ2I7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EseURBQXlELDJCQUEyQjtBQUNwRjtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1NEhBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsU0FBUywyREFBMkQsU0FBUztBQUNyRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQ3ZCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixnQ0FBZ0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDLE1BQU07QUFDTixpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7Ozs7Ozs7Ozs7O0FDOUlGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUN6RkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCOztBQUVoRTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxpQkFBaUIsRUFBRSxLQUFLO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdEpEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEk7Ozs7Ozs7Ozs7O0FDckREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGLENBQUMsRTs7Ozs7Ozs7Ozs7QUM1UUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ25ERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckRELG1CQUFPLENBQUMsK0ZBQXNCO0FBQzlCLG1CQUFPLENBQUMsaUZBQWU7QUFDdkI7QUFDQSxtQkFBTyxDQUFDLCtFQUFjO0FBQ3RCLG1CQUFPLENBQUMsdUZBQWtCOzs7Ozs7Ozs7Ozs7O0FDSjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbkVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzlCRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdCQUFnQjtBQUN4QixrQkFBa0IsZ0JBQWdCO0FBQ2xDLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2QkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2QyxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDaExEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOzs7Ozs7Ozs7QUFTQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUN0TkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkMsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3BMRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLDJDQUEyQztBQUMzQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixFOzs7Ozs7Ozs7OztBQzdZQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUEsR0FBRzs7QUFFSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ2xIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLEU7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxnQkFBZ0I7QUFDekIsa0NBQWtDLGdCQUFnQjs7QUFFbEQ7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUosYUFBYSxnQkFBZ0I7QUFDN0IsVUFBVSxnQkFBZ0I7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMzS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM1Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7Ozs7QUFJVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0I7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiw4STs7O0FBR0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsaVI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFNBQVM7QUFDVCxxQ0FBcUM7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7OztBQzFmRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzFERDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ3pDRDs7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoiZGV2LmFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjAxMWYxZmIwNmIzMWZkOWMzNjUzXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9hcHAuanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAuanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJyZXF1aXJlKCcuL2NvbXBvbmVudHMvaW5kZXguc2NzcycpO1xyXG5cclxuLy9JbXBvcnQgYWxsIEpTIGZpbGVzXHJcbmNvbnN0IHJlcXVpcmVBbGwgPSByID0+IHIua2V5cygpLmZvckVhY2gocik7XHJcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCB0cnVlLCAvXFwuanMkLykpO1xyXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vMDAtc2V0dGluZ3MvY29uZmlnLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1iYXNlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1zdWItbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZGF0ZXRpbWUtcmFuZ2UtcGlja2VyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcGRvd24tY2F0ZWdvcmllcy9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL3BsdWdpbi5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC13aXRoLWNsZWFyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xvY2F0aW9uLWJveC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L21haW4taW50ZXJhY3RpdmUtY2FyZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1oZWFkZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zaGlmdC1jb250YWluZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGxpdC1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC90cmlnZ2VyLWlmcmFtZS10b29sdGlwLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanNcIixcblx0XCIuL2dsb2JhbHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2dsb2JhbHMuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvY29tcG9uZW50cyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLmpzJFwiOyIsIlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xyXG4iLCIvKiBDb21wb25lbnQgTGF5b3V0QmFzZSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTGF5b3V0QmFzZShjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIG9wZW5TaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLm9wZW5TaWRlYmFySWZyYW1lKGR1cmF0aW9uKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmNsb3NlU2lkZWJhcklmcmFtZShkdXJhdGlvbik7XHJcblx0fTtcclxuXHJcblx0dmFyIHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xyXG5cdFx0dmFyICR0YXJnZXRFbGVtZW50ID0gJGVsZW1lbnQ7XHJcblx0XHRpZiAoISEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWw7XHJcblx0XHRcdHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS53aWRnZXRJZF0uZ2V0VGhyZXNob2xkcygpLnNlY29uZGFyeVRocmVzaG9sZCA+IDApIHtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCk7XHJcblx0XHRcdFx0XHR2YXIgdGFyZ2V0RWxlbWVudE9mZnNldFRvcCA9ICR0YXJnZXRFbGVtZW50Lm9mZnNldCgpLnRvcDtcclxuXHRcdFx0XHRcdHZhciBkaXNjb3VudDtcclxuXHRcdFx0XHRcdGlmICghISQoJy5MYXlvdXRCYXNlLWVtZXJnZW5jeScpLnRleHQoKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gMTUwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGlzY291bnQgPSAzOTA7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSAyMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRkaXNjb3VudCA9IDI2MDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQkKCdib2R5LCBodG1sJykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgLSBkaXNjb3VudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBMYXlvdXRCYXNlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyID0gMDtcclxuXHRcdHRoaXMuaGFzSGVhZGVyID0gY29uZmlnLmhhc0hlYWRlcjtcclxuXHRcdHRoaXMuaXNFeHBhbmRhYmxlID0gY29uZmlnLmlzRXhwYW5kYWJsZTtcclxuXHRcdHRoaXMuaXNUb3BXaW5kb3cgPSB3aW5kb3cudG9wID09PSB3aW5kb3cuc2VsZiA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdyYXBwZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtV3JhcHBlcicpO1xyXG5cdFx0dGhpcy4kc3BhY2VyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXNwYWNlcicpO1xyXG5cdFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtQ29udGVudCcpO1xyXG5cdFx0dGhpcy4kbWFpbk1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtTWFpbk1lbnUnKTtcclxuXHRcdHRoaXMuJGhlYWRlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1oZWFkZXInKTtcclxuXHRcdHRoaXMuJGhlYWRlckJvZHkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWJvZHknKTtcclxuXHRcdHRoaXMuJHByaW1hcnlNZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXByaW1hcnktbWVudScpO1xyXG5cdFx0dGhpcy4kZW1lcmdlbmN5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWVtZXJnZW5jeScpO1xyXG5cdFx0dGhpcy4kc2Vjb25kYXJ5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpO1xyXG5cdFx0dGhpcy4kc2Vjb25kYXJ5TWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnktbWVudScpO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1pZnJhbWVzaWRlYmFyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJBZGRpdGlvbmFsQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC1jb250ZW50Jyk7XHJcblx0XHR0aGlzLiR0b3BmaXhlZENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtdG9wZml4ZWRjb250ZW50Jyk7XHJcblx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtYm90dG9tZml4ZWRjb250ZW50Jyk7XHJcblx0XHR0aGlzLiRtYWluQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpO1xyXG5cdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSAwO1xyXG5cdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSAwO1xyXG5cdFx0Ly8gdGhpcy5yZWZlcmVuY2VIZWlnaHQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZXR1cFdpbmRvd0V2ZW50cygpO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyk7XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdMYXlvdXRCYXNlJyk7XHJcblx0XHRcdGlmIChfdGhpcy5pc1RvcFdpbmRvdykge1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKCk7XHJcblx0XHRcdC8vIF90aGlzLnJlZmVyZW5jZUhlaWdodCA9ICQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQ7XHJcblx0XHR9KVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnNldHVwV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLnVwZGF0ZVRocmVzaG9sZHMoKTtcclxuXHRcdFx0X3RoaXMuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dFRvcFBhZGRpbmcoKTtcclxuXHRcdFx0X3RoaXMuaGFuZGxlTGF5b3V0Qm90dG9tUGFkZGluZygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoX3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyKTtcclxuXHRcdFx0X3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCc9PT09PScpO1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCd3aW5kb3cnLCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdzY3JvbGxoZWlnaHQnLCAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0KTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygncmVmZXJlbmNlSGVpZ2h0JywgX3RoaXMucmVmZXJlbmNlSGVpZ2h0KTtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlTGF5b3V0VG9wUGFkZGluZygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVPcHRpb25hbENvbnRhaW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLiRlbWVyZ2VuY3kubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChzY3JvbGxUb3AgKyB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgPiB0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5hZGRDbGFzcygnaXNGaXhlZCcpO1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0aGlzLmNvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdFx0XHR3aWR0aDogdGhpcy4kaGVhZGVyLndpZHRoKCksXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSB0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LnJlbW92ZUNsYXNzKCdpc0ZpeGVkJyk7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5sZW5ndGggPT09IDEgJiYgdGhpcy4kc2Vjb25kYXJ5LnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNjcm9sbFRvcCArIHRoaXMuY29udGVudFRocmVzaG9sZCArICh0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMCkgPiB0aGlzLnNlY29uZGFyeVRocmVzaG9sZCkge1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5hZGRDbGFzcygnaXNGaXhlZCcpLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6IHRoaXMuY29udGVudFRocmVzaG9sZCArICh0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMCksXHJcblx0XHRcdFx0XHR3aWR0aDogdGhpcy4kaGVhZGVyLndpZHRoKCksXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5CdXR0b24uU2Vjb25kLCAuQnV0dG9uLlRoaXJkJykubm90KCcuUGFuZWwgLkJ1dHRvbi5TbWFsbCwgLlBhbmVsIC5CdXR0b24uVGhpcmQnKS5hZGRDbGFzcygnU21hbGwnKTtcclxuXHRcdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHR2YXIgdGFyZ2V0VG9vbGJhcldpZHRoID0gJCgnLlNhcHBoaXJlSGVhZGVyJykub3V0ZXJXaWR0aCh0cnVlKSAqIDAuNjY7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLlRvb2xiYXInKS53aWR0aCh0YXJnZXRUb29sYmFyV2lkdGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ25vVG9vbGJhcicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLiRwcmltYXJ5TWVudS5jc3MoJ29wYWNpdHknLCAwKTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IHRoaXMuJHNlY29uZGFyeS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHJcblx0XHRcdFx0Ly8gLy9cclxuXHRcdFx0XHQvLyB2YXIgY3VycmVudEhlaWdodCA9ICQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQ7XHJcblx0XHRcdFx0Ly8gdmFyIGNvbXBlbnNhdGlvbiA9IHRoaXMucmVmZXJlbmNlSGVpZ2h0IC0gY3VycmVudEhlaWdodDtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhjb21wZW5zYXRpb24pO1xyXG5cclxuXHRcdFx0XHQvLyBpZiAoY29tcGVuc2F0aW9uIDw9IDApIHtcclxuXHRcdFx0XHQvLyBcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblx0XHRcdFx0Ly8gfSBlbHNlIHtcclxuXHRcdFx0XHQvLyBcdHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCBjb21wZW5zYXRpb24pO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LnJlbW92ZUNsYXNzKCdpc0ZpeGVkJykuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLkJ1dHRvbi5TZWNvbmQsIC5CdXR0b24uVGhpcmQnKS5yZW1vdmVDbGFzcygnU21hbGwnKTtcclxuXHRcdFx0XHR0aGlzLiRwcmltYXJ5TWVudS5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuY3NzKHtcclxuXHRcdFx0XHRcdGhlaWdodDogJ3Vuc2V0JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLlRvb2xiYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLiRzZWNvbmRhcnlNZW51LnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5DbGluaWNpYW5Xb3JrQXJlYS1jb2x1bW5zLWJpZycpLmNzcygnbWFyZ2luLXRvcCcsICd1bnNldCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuQ2xpbmljaWFuV29ya0FyZWEtY29sdW1ucy1iaWcnKS5jc3MoJ21hcmdpbi10b3AnLCAtdGhpcy4kc2Vjb25kYXJ5Lm91dGVySGVpZ2h0KHRydWUpKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnlNZW51LmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd0cmFuc3BhcmVudCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlTGF5b3V0VG9wUGFkZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwYWRkaW5nVG9wID0gdGhpcy5jb250ZW50VGhyZXNob2xkICsgdGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgKyB0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeTtcclxuXHRcdHRoaXMuJHNwYWNlci5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdGhlaWdodDogcGFkZGluZ1RvcCxcclxuXHRcdH0sIDAsICdsaW5lYXInKTtcclxuXHRcdGlmICh0aGlzLiR0b3BmaXhlZENvbnRlbnQubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHRoaXMuJHRvcGZpeGVkQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdHdpZHRoOiAkKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpLndpZHRoKCksXHJcblx0XHRcdFx0dG9wOiB0aGlzLnRvcGZpeGVkQ29udGVudFRocmVzaG9sZCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy4kYm90dG9tZml4ZWRDb250ZW50Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRpZiAoJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCA+ICQoJ2JvZHknKS5oZWlnaHQoKSkge1xyXG5cdFx0XHRcdHZhciBib3R0b21GaXhlZEhlaWdodCA9IHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0XHR0aGlzLiR3cmFwcGVyLmFkZENsYXNzKCdoYXNGaXhlZEJvdHRvbScpLmNzcygncGFkZGluZy1ib3R0b20nLCBib3R0b21GaXhlZEhlaWdodCArICdweCcpO1xyXG5cdFx0XHRcdHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdFx0d2lkdGg6ICQoJy5MYXlvdXRCYXNlLU1haW5Db250ZW50Jykub3V0ZXJXaWR0aCh0cnVlKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAnJ1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUudXBkYXRlVGhyZXNob2xkcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYWluTWVudUhlaWdodCA9IHRoaXMuJG1haW5NZW51Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgaGVhZGVyQm9keUhlaWdodCA9IHRoaXMuJGhlYWRlckJvZHkub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgdGhpcy4kaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgdG9wZml4ZWRDb250ZW50SGVpZ2h0ID0gdGhpcy4kdG9wZml4ZWRDb250ZW50Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgcHJpbWFyeU1lbnVIZWlnaHQgPSB0aGlzLiRwcmltYXJ5TWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGVtZXJnZW5jeUhlaWdodCA9IHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQ7XHJcblx0XHR0aGlzLmNvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQ7XHJcblx0XHR0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCA9IG1haW5NZW51SGVpZ2h0ICsgaGVhZGVyQm9keUhlaWdodCArIHRvcGZpeGVkQ29udGVudEhlaWdodCArIHByaW1hcnlNZW51SGVpZ2h0O1xyXG5cdFx0dGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodCArIGVtZXJnZW5jeUhlaWdodDtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5nZXRUaHJlc2hvbGRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dG9wZml4ZWRDb250ZW50VGhyZXNob2xkOiB0aGlzLnRvcGZpeGVkQ29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0Y29udGVudFRocmVzaG9sZDogdGhpcy5jb250ZW50VGhyZXNob2xkLFxyXG5cdFx0XHRlbWVyZ2VuY3lUaHJlc2hvbGQ6IHRoaXMuZW1lcmdlbmN5VGhyZXNob2xkLFxyXG5cdFx0XHRzZWNvbmRhcnlUaHJlc2hvbGQ6IHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkLFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5vcGVuU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbl9pbikge1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb25faW4gPj0gMCA/IGR1cmF0aW9uX2luIDogMTAwO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0XHQkKCcudG9vbHRpcHN0ZXJlZCcpLnRvb2x0aXBzdGVyKCdoaWRlJyk7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uX2luKSB7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbl9pbiA+PSAwID8gZHVyYXRpb25faW4gOiAxMDA7XHJcblx0XHR2YXIgdGFyZ2V0V2lkdGggPSB0aGlzLmlzRXhwYW5kYWJsZSA/IDQwIDogMjYyO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0d2lkdGg6IHRhcmdldFdpZHRoLFxyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZSA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0Y2xvc2VTaWRlYmFySWZyYW1lOiBjbG9zZVNpZGViYXJJZnJhbWUsXHJcblx0XHRvcGVuU2lkZWJhcklmcmFtZTogb3BlblNpZGViYXJJZnJhbWUsXHJcblx0XHRzY3JvbGxUb0VsZW1lbnQ6IHNjcm9sbFRvRWxlbWVudCxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBMYXlvdXRCbGFuayAqL1xyXG4kKGZ1bmN0aW9uKCkge1xyXG5cdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50KSB7XHJcblx0XHRpZiAoISEkKHRoaXMuZnJhbWVFbGVtZW50KS5jbG9zZXN0KCcuTWFpbkludGVyYWN0aXZlQ2FyZCcpLmxlbmd0aCkge1xyXG5cdFx0XHQkKCcuTGF5b3V0QmxhbmsuUGFnZScpLmFkZENsYXNzKCdNYWluSW50ZXJhY3RpdmVDYXJkJyk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IExheW91dFBvcHVwICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIHBvcHVwV2lkdGg7XHJcblx0dmFyIHBvcHVwTWluV2lkdGg7XHJcblx0dmFyIHBvcHVwSGVpZ2h0O1xyXG5cdHZhciBwb3B1cE1pbkhlaWdodDtcclxuXHR2YXIgcG9wdXBNYXhIZWlnaHQ7XHJcblx0dmFyIHBvcHVwV2lkdGhQZXJjZW50YWdlO1xyXG5cdHZhciBsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyO1xyXG5cclxuXHR2YXIgJHBvcHVwID0gJCgnLkxheW91dFBvcHVwJyk7XHJcblx0dmFyICRvc1BvcHVwID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJyk7XHJcblx0dmFyICRvc1BvcHVwQ29udGVudCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50Lm9zLWludGVybmFsLXVpLXdpZGdldC1jb250ZW50Jyk7XHJcblx0dmFyICRvdmVybGF5ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktd2lkZ2V0LW92ZXJsYXknKTtcclxuXHR2YXIgcG9wdXBTaXplO1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHBvcHVwU2l6ZSA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuUG9wdXBTaXplO1xyXG5cclxuXHRcdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ0xheW91dFBvcHVwJyk7IC8vIGJlY2F1c2UgZGF0ZXRpbWVyYW5nZXBpY2tlciBpcyBhdHRhY2hlZCB0byBib2R5XHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2gpIHtcclxuXHRcdFx0XHQkcG9wdXAuYWRkQ2xhc3MoJ2lzVG91Y2gnKTtcclxuXHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2lzVG91Y2gnKTsgLy8gYmVjYXVzZSBzZWxlY3QyIGlzIGF0dGFjaGVkIHRvIGJvZHlcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcblx0XHRcdFx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uLCBpbmRleCkge1xyXG5cdFx0XHRcdFx0cmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuXHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdFx0c3VidHJlZTogdHJ1ZSxcclxuXHRcdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQodGhpcy5mcmFtZUVsZW1lbnQpLmNzcyh7XHJcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmVzaXplRGlhbG9nKCk7XHJcblx0XHRcdFx0cmVzaXplQ29udGVudCgpO1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0XHR9LCAxNTApO1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3cpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cucGFyZW50KS5vZmYoJ3Jlc2l6ZS5MYXlvdXRQb3B1cCcpLm9uKCdyZXNpemUuTGF5b3V0UG9wdXAnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJlZHJhd0RpYWxvZ1dpbmRvdygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVkcmF3RGlhbG9nV2luZG93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KGxheW91dFBvcHVwUmVzaXplVGltZXIpO1xyXG5cdFx0bGF5b3V0UG9wdXBSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXNpemVEaWFsb2coKTtcclxuXHRcdFx0cmVzaXplQ29udGVudCgpO1xyXG5cdFx0fSwgMzAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZXNpemVEaWFsb2cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5oYXNDbG9zZSkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctdGl0bGViYXInKS5zaG93KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvdy50b3AuJCgnYm9keScpLmhhc0NsYXNzKCdMYXlvdXRCYXNlJykpIHtcclxuXHRcdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0XHRvdmVyZmxvd1k6ICdoaWRkZW4nXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRvdmVybGF5LndpZHRoKCcxMDAlJyk7XHJcblxyXG5cdFx0dmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93LnBhcmVudCkuaGVpZ2h0KCk7XHJcblx0XHR2YXIgd2luZG93V2lkdGggPSAkKHdpbmRvdy5wYXJlbnQpLndpZHRoKCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwU2l6ZSA9PT0gJ1NtYWxsJykge1xyXG5cdFx0XHRwb3B1cFdpZHRoID0gcGFyc2VJbnQod2luZG93V2lkdGggKiAwLjMzKTtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IDQwMDtcclxuXHRcdH0gZWxzZSBpZiAocG9wdXBTaXplID09PSAnTWVkaXVtJykge1xyXG5cdFx0XHRzd2l0Y2ggKFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuUG9wdXBXaWR0aCkge1xyXG5cdFx0XHRcdGNhc2UgJ1hTbWFsbCc6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gMjAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdTbWFsbCc6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gMzAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjM7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdNZWRpdW0nOlxyXG5cdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDYwMDtcclxuXHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC42O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSA3MDA7XHJcblx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuNztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9wdXBXaWR0aCA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaCA/IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC44KSA6IHBhcnNlSW50KHdpbmRvd1dpZHRoICogcG9wdXBXaWR0aFBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRwb3B1cE1pbkhlaWdodCA9IDIwMDtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2ggPyBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjkpIDogcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC43KTtcclxuXHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzRml4ZWRIZWlnaHQpIHtcclxuXHRcdFx0XHRwb3B1cEhlaWdodCA9IHBvcHVwTWF4SGVpZ2h0O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBvcHVwSGVpZ2h0ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJykub3V0ZXJIZWlnaHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JG9zUG9wdXBDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0bWF4SGVpZ2h0OiBwb3B1cE1heEhlaWdodCArICdweCcsXHJcblx0XHRcdFx0bWluSGVpZ2h0OiBwb3B1cE1pbkhlaWdodCArICdweCcsXHJcblx0XHRcdFx0aGVpZ2h0OiBwb3B1cEhlaWdodCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmIChwb3B1cFNpemUgPT09ICdMYXJnZScpIHtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC44KTtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRvc1BvcHVwLmNzcyh7XHJcblx0XHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cdFx0XHRsZWZ0OiAnNTAlJyxcclxuXHRcdFx0dG9wOiAnNTAlJyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcclxuXHRcdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRcdG1pbldpZHRoOiBwb3B1cE1pbldpZHRoICsgJ3B4JyxcclxuXHRcdFx0d2lkdGg6IHBvcHVwV2lkdGggKyAncHgnLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVzaXplQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciAkYm9keSA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpO1xyXG5cdFx0dmFyIGNvbnRlbnRTY3JvbGxUb3AgPSAkYm9keS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnICYmICQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Ly8gc2tpcCB0aGUgcmVzZXQgb2YgLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkYm9keS5jc3Moe1xyXG5cdFx0XHRcdGhlaWdodDogJ2F1dG8nXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBpbnRyb0hlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faW50cm8nKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgYm9keUhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpWzBdLnNjcm9sbEhlaWdodCB8fCAwO1xyXG5cdFx0dmFyIGZvb3RlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fZm9vdGVyJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGNvbnRlbnRIZWlnaHQgPSBoZWFkZXJIZWlnaHQgKyBpbnRyb0hlaWdodCArIGJvZHlIZWlnaHQgKyBmb290ZXJIZWlnaHQgKyA0MDtcclxuXHRcdHZhciBkaWFsb2dIZWlnaHQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdGlmIChwb3B1cFNpemUgPT09ICdTbWFsbCcpIHtcclxuXHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodChjb250ZW50SGVpZ2h0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChjb250ZW50SGVpZ2h0IDwgZGlhbG9nSGVpZ2h0ICYmIFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gZGlhbG9nSGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSA0MDtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA8IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPCBwb3B1cE1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmVyZW5jZSA9IHBvcHVwTWluSGVpZ2h0IC0gY29udGVudEhlaWdodDtcclxuXHRcdFx0XHRcdCRib2R5LmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZXJlbmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA+PSBkaWFsb2dIZWlnaHQgJiYgU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBkaWFsb2dIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIDQwO1xyXG5cdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0ID49IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdGlmIChjb250ZW50SGVpZ2h0ID4gcG9wdXBNYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQocG9wdXBNYXhIZWlnaHQpO1xyXG5cdFx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBwb3B1cE1heEhlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gNDA7XHJcblx0XHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignVW5leHBlY3RlZCBjb21iaW5hdGlvbi4uLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSGFuZGxlIHdoZW4gRGF0ZVRpbWVSYW5nZVBpY2tlciBpcyBvcGVuZWRcclxuXHRcdHZhciBkYXRlUmFuZ2VQaWNrZXIgPSAkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKTtcclxuXHRcdGlmIChkYXRlUmFuZ2VQaWNrZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVuY2UgPSBkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gZGlhbG9nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBib2R5SGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JykuaGVpZ2h0KGJvZHlIZWlnaHQgKyBkaWZmZXJlbmNlICsgNDApO1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQkYm9keS5zY3JvbGxUb3AoY29udGVudFNjcm9sbFRvcCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaW5jcmVhc2VIZWlnaHQgPSBmdW5jdGlvbiAoZGlmZXJlbmNlKSB7XHJcblx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCRvc1BvcHVwQ29udGVudC5oZWlnaHQoKSArIGRpZmVyZW5jZSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2Nyb2xsVG9FbGVtZW50ID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XHJcblx0XHR2YXIgJHRhcmdldEVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHRcdGlmICghISR0YXJnZXRFbGVtZW50Lmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbDtcclxuXHRcdFx0c2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGludHJvSGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19pbnRybycpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRCb2R5U2Nyb2xsID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JylbMF0uc2Nyb2xsVG9wIHx8IDA7XHJcblx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3AgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCArIGN1cnJlbnRCb2R5U2Nyb2xsIC0gMjA7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3ApO1xyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0cmVzaXplRGlhbG9nLFxyXG5cdFx0cmVzaXplQ29udGVudCxcclxuXHRcdGluY3JlYXNlSGVpZ2h0LFxyXG5cdFx0cmVkcmF3RGlhbG9nV2luZG93LFxyXG5cdFx0c2Nyb2xsVG9FbGVtZW50XHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcbiQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghISQoJy5MYXlvdXRQb3B1cCcpLmxlbmd0aCkge1xyXG5cdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0b3ZlcmZsb3dZOiAnc2Nyb2xsJ1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgQWN0aW9uc01lbnUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyICR0cmlnZ2VyRWxlbWVudCA9ICQoJyMnICsgY29uZmlnLnRyaWdnZXJFbGVtZW50KTtcclxuXHRcdHZhciAkY29udGVudEVsZW1lbnQgPSAkKCcjJyArIGNvbmZpZy5jb250ZW50RWxlbWVudCk7XHJcblxyXG5cdFx0aWYgKCRjb250ZW50RWxlbWVudC50ZXh0KCkubGVuZ3RoIDwgMSkge1xyXG5cdFx0XHQkdHJpZ2dlckVsZW1lbnQuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGluc2lkZSBhIGRvY3VtZW50IHJlYWR5IGR1ZSB0byBzYXBwaGlyZSBwb3B1cCBiaW5kZWQgZXZlbnRzXHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuXHRcdFx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJykge1xyXG5cdFx0XHRcdFx0c3dpdGNoIChjb25maWcucG9zaXRpb24pIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2xlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdyaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbS1sZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdib3R0b20tcmlnaHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tcmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2JvdHRvbS1sZWZ0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAndG9wLWxlZnQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcC1yaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1yaWdodCc6XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAndG9wLWxlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkdHJpZ2dlckVsZW1lbnQudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0Y29udGVudDogJCgnPHNlY3Rpb24vPicpLmFwcGVuZCgkY29udGVudEVsZW1lbnQuY2xvbmUodHJ1ZSkpLFxyXG5cdFx0XHRcdFx0dHJpZ2dlcjogY29uZmlnLnRyaWdnZXJFdmVudCxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcclxuXHRcdFx0XHRcdG1heFdpZHRoOiBjb25maWcubWF4V2lkdGgsXHJcblx0XHRcdFx0XHR0aGVtZTpcclxuXHRcdFx0XHRcdFx0J3Rvb2x0aXBzdGVyLWxvY2F0aW9uLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmxvY2F0aW9uICtcclxuXHRcdFx0XHRcdFx0JyBBY3Rpb25zTWVudS10b29sdGlwIFBhZGRpbmctLScgK1xyXG5cdFx0XHRcdFx0XHRjb25maWcucGFkZGluZyArXHJcblx0XHRcdFx0XHRcdCcgQm9yZGVyLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmJvcmRlcixcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQWN0aW9uc01lbnUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEFjdGlvbnNTdWJNZW51IC0gQERlcHJlY2F0ZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLkFjdGlvbnNTdWJNZW51ID0gZnVuY3Rpb24oSWNvbklkKSB7XHJcblx0aWYgKCQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpLmhhc0NsYXNzKCdTdWJNZW51QmxvY2snKSkge1xyXG5cdFx0JCgnLlBhdGllbnRIZWFkZXJBY3Rpb25zX19zdWJNZW51JykucmVtb3ZlQ2xhc3MoJ1N1Yk1lbnVCbG9jaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKEljb25JZClcclxuXHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdC5maW5kKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKVxyXG5cdFx0XHQuYWRkQ2xhc3MoJ1N1Yk1lbnVCbG9jaycpO1xyXG5cdH1cclxufTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgY2xhc3MgRGF0YVRhYmxlcyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICB0aGlzLiR3aWRnZXQgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9YCk7XHJcbiAgICAgIHRoaXMuJHRhYmxlID0gdGhpcy4kd2lkZ2V0LmZpbmQoJ3RhYmxlJyk7XHJcbiAgICAgIHRoaXMuJHRhYmxlLmFkZENsYXNzKGNvbmZpZy5iYXNlU3R5bGUpO1xyXG4gICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuXHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAuLi50aGlzLmNvbmZpZyxcclxuICAgICAgICBmaXhlZENvbHVtbnM6IHRydWUsXHJcbiAgICAgICAgaW5mbzogZmFsc2UsXHJcbiAgICAgICAgb3JkZXJpbmc6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2luZzogZmFsc2UsXHJcbiAgICAgICAgc2Nyb2xsQ29sbGFwc2U6IHRydWUsXHJcbiAgICAgICAgc2Nyb2xsWDogdHJ1ZSxcclxuICAgICAgICBzZWFyY2hpbmc6IGZhbHNlLFxyXG4gICAgICB9XHJcblxyXG4gICAgICAkKCgpID0+IHtcclxuICAgICAgICB0aGlzLiR0YWJsZS5EYXRhVGFibGUodGhpcy5vcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgY29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBEYXRhVGFibGVzKGNvbmZpZykpO1xyXG5cclxuICBTYXBwaGlyZVdpZGdldHMuRGF0YVRhYmxlcyA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH07XHJcblxyXG59KSgpOyIsIi8qIENvbXBvbmVudCBEYXRlVGltZVJhbmdlUGlja2VyICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzID0gW107XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhbGxEYXRlVGltZVJhbmdlUGlja2Vyc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgRGF0ZVRpbWVSYW5nZVBpY2tlcihjb25maWcpO1xyXG5cdFx0YWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblx0fTtcclxuXHJcblx0dmFyIERhdGVUaW1lUmFuZ2VQaWNrZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHRoaXMuY3VycmVudExvY2FsZSA9IGNvbmZpZy5jdXJyZW50TG9jYWxlO1xyXG5cclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnRGF0ZVRpbWVSYW5nZVBpY2tlcicpO1xyXG5cdFx0dGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2xlYXInKTtcclxuXHRcdHRoaXMuJGxhYmVsID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWxhYmVsJyk7XHJcblxyXG5cdFx0dGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnYXR0YWNoZWRJbnB1dCcpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJHdpZGdldC5maW5kKFxyXG5cdFx0XHRcdCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1wbGFjZWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXSdcclxuXHRcdFx0KTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkID0gdGhpcy4kd2lkZ2V0LmZpbmQoXHJcblx0XHRcdFx0Jy5EYXRlVGltZVJhbmdlUGlja2VyLWRpc3BsYXllZCBpbnB1dFt0eXBlPVwidGV4dFwiXSdcclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5hbGxvd3NUeXBpbmcpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncmVhZG9ubHknLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCcjJyArIGNvbmZpZy5pbnB1dElkKTtcclxuXHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5hbGxvd3NUeXBpbmcpIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudExvY2FsZSA9PT0gJ0FSJykge1xyXG5cdFx0XHRtb21lbnQubG9jYWxlKCdhci1rdycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvcHRpb25zID0ge307XHJcblx0XHRvcHRpb25zLnN0YXJ0RGF0ZSA9IGNvbmZpZy5zdGFydERhdGU7XHJcblx0XHRvcHRpb25zLnNpbmdsZURhdGVQaWNrZXIgPSBjb25maWcuc2luZ2xlRGF0ZVBpY2tlcjtcclxuXHRcdG9wdGlvbnMuYXV0b0FwcGx5ID0gY29uZmlnLmF1dG9BcHBseTtcclxuXHRcdG9wdGlvbnMuYXV0b1VwZGF0ZUlucHV0ID0gY29uZmlnLmF1dG9VcGRhdGVJbnB1dDtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlciA9IGNvbmZpZy50aW1lUGlja2VyO1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VyMjRIb3VyID0gY29uZmlnLnRpbWVQaWNrZXIyNEhvdXI7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXJJbmNyZW1lbnQgPSBjb25maWcudGltZVBpY2tlckluY3JlbWVudDtcclxuXHRcdG9wdGlvbnMuc2hvd0Ryb3Bkb3ducyA9IGNvbmZpZy5oYXNEcm9wZG93bnM7XHJcblx0XHRvcHRpb25zLmRyb3BzID0gY29uZmlnLmRyb3BzO1xyXG5cdFx0b3B0aW9ucy5vcGVucyA9IGNvbmZpZy5vcGVucztcclxuXHJcblx0XHR2YXIgc3RyaW5nQ29ubmVjdGlvbiA9ICdbLCBhdF0nO1xyXG5cclxuXHRcdGlmIChjb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZIEhIOk1NJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWSBISDpNTScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZIEhIOm1tJztcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dCA/XHJcblx0XHRcdFx0XHQnRCBNTU0gWVlZWScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBISDptbScgOlxyXG5cdFx0XHRcdFx0J0QgTU1NJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIEhIOm1tJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZIGhoOm1tIEEnO1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0ID9cclxuXHRcdFx0XHRcdCdEIE1NTSBZWVlZJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIGhoOm1tIEEnIDpcclxuXHRcdFx0XHRcdCdEIE1NTScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBoaDptbSBBJztcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCdvbmx5RGF0ZScpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVknO1xyXG5cdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dCA/XHJcblx0XHRcdFx0J0QgTU1NIFlZWVknIDpcclxuXHRcdFx0XHQnRCBNTU0nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzV2Vla0RheU5hbWVXaGVuVGV4dCA/XHJcblx0XHRcdCdkZGRbLCBdJyArIHRoaXMuY29uZmlnLmZvcm1hdExhYmVsIDpcclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWw7XHJcblxyXG5cdFx0b3B0aW9ucy5sb2NhbGUgPSB7XHJcblx0XHRcdGRpcmVjdGlvbjogY29uZmlnLmN1cnJlbnRMb2NhbGUgPT09ICdBUicgPyAncnRsJyA6ICdsdHInLFxyXG5cdFx0XHRmb3JtYXQ6IHRoaXMuY29uZmlnLmZvcm1hdElucHV0LFxyXG5cdFx0XHRjYW5jZWxMYWJlbDogJ0NhbmNlbCcsXHJcblx0XHRcdGFwcGx5TGFiZWw6ICdBcHBseScsXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChjb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCd0ZXh0VHJpZ2dlcicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuZW5kRGF0ZSAmJiBjb25maWcuZW5kRGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMuZW5kRGF0ZSA9IGNvbmZpZy5lbmREYXRlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbmZpZy5tYXhEYXRlICYmIGNvbmZpZy5tYXhEYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5tYXhEYXRlID0gY29uZmlnLm1heERhdGU7XHJcblx0XHR9XHJcblx0XHRpZiAoY29uZmlnLm1pbkRhdGUgJiYgY29uZmlnLm1pbkRhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLm1pbkRhdGUgPSBjb25maWcubWluRGF0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLkRpc2FibGVkV2Vla0RheXMpIHtcclxuXHRcdFx0dmFyIGRpc2FibGVkV2Vla0RheXMgPSBjb25maWcuRGlzYWJsZWRXZWVrRGF5cy5zcGxpdCgnLCcpO1xyXG5cdFx0XHRvcHRpb25zLmlzSW52YWxpZERhdGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG5cdFx0XHRcdHJldHVybiBkaXNhYmxlZFdlZWtEYXlzLmluY2x1ZGVzKFxyXG5cdFx0XHRcdFx0bW9tZW50KGRhdGUpXHJcblx0XHRcdFx0XHQuZGF5KClcclxuXHRcdFx0XHRcdC50b1N0cmluZygpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiRpbnB1dC5kYXRlcmFuZ2VwaWNrZXIob3B0aW9ucywgZnVuY3Rpb24gKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgbGFiZWwpIHtcclxuXHRcdFx0Ly8gYWZ0ZXIgYSBzZWxlY3Rpb24gaXMgbWFkZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gbm93IHdlIGhhdmUgYSBwcm9wZXIgaW5zdGFuY2VcclxuXHRcdHRoaXMucGlja2VyID0gdGhpcy4kaW5wdXQuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XHJcblxyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKHRoaXMucGlja2VyLmNvbnRhaW5lcik7XHJcblxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcuY3NzQ2xhc3MpIHtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuYWRkQ2xhc3ModGhpcy5jb25maWcuY3NzQ2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJHRpbWVIb2xkZXIgPSB0aGlzLiRjYWxlbmRhci5maW5kKCcuY2FsZW5kYXItdGltZScpO1xyXG5cdFx0dGhpcy4kYnV0dG9uc0hvbGRlciA9IHRoaXMuJGNhbGVuZGFyLmZpbmQoJy5kcnAtYnV0dG9ucycpO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0dGhpcy4kYnV0dG9uc0hvbGRlci5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5pc0VtcHR5U3RhcnREYXRlKSB7XHJcblx0XHRcdHRoaXMuY2xlYXIoZmFsc2UpO1xyXG5cdFx0fSBlbHNlIGlmIChjb25maWcuaXNFbXB0eVN0YXJ0SG91cikge1xyXG5cdFx0XHR0aGlzLmlzRW1wdHlIb3VyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuZW5hYmxlZCkge1xyXG5cdFx0XHR0aGlzLm5hdGl2ZUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLmN1c3RvbUV2ZW50cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kY2xlYXIuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dC5vZmYoJ2NsaWNrIGZvY3VzIGtleWRvd24ga2V5dXAnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLmhhbmRsZUN1c3RvbVZhbGlkYXRpb24oKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVDdXN0b21WYWxpZGF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVycm9yTWVzc2FnZSA9IHRoaXMuJGlucHV0Lm5leHQoKS50ZXh0KCk7XHJcblx0XHRpZiAoISFlcnJvck1lc3NhZ2UubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5hZGRDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZFxyXG5cdFx0XHRcdC5uZXh0KClcclxuXHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0LnRleHQoZXJyb3JNZXNzYWdlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5uZXh0KCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLm5hdGl2ZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignc2hvd0NhbGVuZGFyLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzR29Ub2RheSkge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0LmZpbmQoJy5jYWxlbmRhci10YWJsZSB0aGVhZCB0cicpXHJcblx0XHRcdFx0XHQuZXEoMClcclxuXHRcdFx0XHRcdC5hZnRlcihcclxuXHRcdFx0XHRcdFx0Jzx0cj48dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItZ290b2RheVwiPicgK1xyXG5cdFx0XHRcdFx0XHQnVG9kYXknICtcclxuXHRcdFx0XHRcdFx0JzwvdGQ+PC90cj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5jb25maWcuZHJvcHMgPT09ICd1cCcpIHtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5jc3MoJ3RvcCcsIF90aGlzLiRjYWxlbmRhci5vZmZzZXQoKS50b3AgLSAyNCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3Nob3cuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy50aW1lUGlja2VyICYmIF90aGlzLmNvbmZpZy5oYXNDbGVhckhvdXIpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuY2FsZW5kYXItdGltZScpXHJcblx0XHRcdFx0XHQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXJcIj48L3NwYW4+Jyk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuaGFuZGxlVmlld3BvcnRQb3NpdGlvbigpO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuRGF0ZVRpbWVSYW5nZVBpY2tlci5vcGVuZWRXaWRnZXRJZCA9IF90aGlzLmNvbmZpZy53aWRnZXRJZDtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2hpZGUuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykucmVtb3ZlKCk7XHJcblx0XHRcdF90aGlzLnVwZGF0ZVBhcmVudElmcmFtZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignY2FuY2VsLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignb3V0c2lkZUNsaWNrLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbigndGltZWNoYW5nZWQuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzQ2xlYXJIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmNhbGVuZGFyLXRpbWUnKVxyXG5cdFx0XHRcdFx0LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyXCI+PC9zcGFuPicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdjbGlja0RhdGUuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY3VzdG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGxhYmVsLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0X3RoaXMucGlja2VyLnRvZ2dsZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjbGVhci5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyLm9uKCdjbGljaycsICcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5ob3Vyc2VsZWN0JykudmFsKCcwJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5ob3Vyc2VsZWN0JykudmFsKCcxMicpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcubWludXRlc2VsZWN0JykudmFsKCcwJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuYW1wbXNlbGVjdCcpLnZhbCgnQU0nKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSB0cnVlO1xyXG5cdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIub24oJ2NsaWNrJywgJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWdvdG9kYXknLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLnBpY2tlci5zZXRTdGFydERhdGUobW9tZW50KCkpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuc2V0RW5kRGF0ZShtb21lbnQoKSk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0XHRcdGlmICghX3RoaXMuY29uZmlnLmF1dG9VcGRhdGVJbnB1dCB8fCBfdGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIgfHwgX3RoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm9uKCdjbGljayBmb2N1cycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy4kaW5wdXQudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnZhbChfdGhpcy4kZGlzcGxheWVkLnZhbCgpKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRfdGhpcy51cGRhdGVQYXJlbnRJZnJhbWUoKTtcclxuXHRcdFx0XHR9LCA1MCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZUxhYmVsaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxhYmVsTWFzayA9IHRoaXMuY29uZmlnLmZvcm1hdExhYmVsO1xyXG5cdFx0dmFyIGlucHV0TWFzayA9IHRoaXMuY29uZmlnLmZvcm1hdElucHV0O1xyXG5cdFx0aWYgKG1vbWVudCh0aGlzLnBpY2tlci5zdGFydERhdGUpLmlzU2FtZShtb21lbnQoKSwgJ2RheScpKSB7XHJcblx0XHRcdGlmIChsYWJlbE1hc2suaW5jbHVkZXMoJ0QgTU1NIFlZWVknKSkge1xyXG5cdFx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFzay5yZXBsYWNlKCdEIE1NTSBZWVlZJywgJ1tUb2RheV0nKTtcclxuXHRcdFx0fSBlbHNlIGlmIChsYWJlbE1hc2suaW5jbHVkZXMoJ0QgTU1NJykpIHtcclxuXHRcdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2sucmVwbGFjZSgnRCBNTU0nLCAnW1RvZGF5XScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgbGFiZWxNYXNrJywgbGFiZWxNYXNrKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eUhvdXIpIHtcclxuXHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrXHJcblx0XHRcdFx0LnJlcGxhY2UoJ2hoOm1tIEEnLCAnWy0tOi0tXScpXHJcblx0XHRcdFx0LnJlcGxhY2UoJ0hIOm1tJywgJ1stLTotLV0nKTtcclxuXHRcdFx0aW5wdXRNYXNrID0gaW5wdXRNYXNrXHJcblx0XHRcdFx0LnJlcGxhY2UoJ2hoOm1tIEEnLCAnWy0tOi0tXScpXHJcblx0XHRcdFx0LnJlcGxhY2UoJ0hIOm1tJywgJ1stLTotLV0nKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdFx0dGhpcy4kbGFiZWwuaHRtbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGxhYmVsTWFzaykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGlucHV0TWFzaykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdFx0dGhpcy4kbGFiZWwuaHRtbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGxhYmVsTWFzaykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBISDptbTpzcycpKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLmZvcm1hdElucHV0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaGFuZGxlVmlld3BvcnRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50ICYmICgkKHdpbmRvdy5mcmFtZUVsZW1lbnQucGFyZW50RWxlbWVudCkuaGFzQ2xhc3MoJ3Rvb2x0aXBzdGVyLWNvbnRlbnQnKSB8fCAkKHdpbmRvdy5mcmFtZUVsZW1lbnQucGFyZW50RWxlbWVudCkuaGFzQ2xhc3MoJ29zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50JykpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNJblZpZXdwb3J0KCkpIHtcclxuXHRcdFx0dmFyIGNvb3JkcyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAodGhpcy4kY2FsZW5kYXIuaGFzQ2xhc3MoJ2Ryb3AtdXAnKSAmJiB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XHJcblx0XHRcdFx0dmFyIHBvaW50ID0gd2luZG93LnNjcm9sbFkgKyBjb29yZHMuYm90dG9tICsgdGhpcy4kaW5wdXQuaGVpZ2h0KCkgKyA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLnJlbW92ZUNsYXNzKCdkcm9wLXVwJykuYWRkQ2xhc3MoJ2Ryb3AtZG93bicpLmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLiRjYWxlbmRhci5oYXNDbGFzcygnZHJvcC11cCcpICYmIHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA+ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpIHtcclxuXHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cuc2Nyb2xsWSArIGNvb3Jkcy50b3AgLSBjb29yZHMuaGVpZ2h0IC0gdGhpcy4kaW5wdXQuaGVpZ2h0KCkgLSA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKCdkcm9wLXVwJykuY3NzKCd0b3AnLCBwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYm91bmRpbmcgPSB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHJldHVybiAoYm91bmRpbmcudG9wID49IDAgJiYgYm91bmRpbmcuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKyA1IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyA1KSk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoc2VuZE5vdGlmaWNhdGlvbikge1xyXG5cdFx0dGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKG1vbWVudCgpKTtcclxuXHRcdHRoaXMucGlja2VyLnNldEVuZERhdGUobW9tZW50KCkpO1xyXG5cdFx0dGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kY2xlYXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kbGFiZWwuaHRtbCgnLS0gLS0gLS0nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCgnJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChzZW5kTm90aWZpY2F0aW9uIHx8IHNlbmROb3RpZmljYXRpb24gPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc2VuZE5vdGlmaWNhdGlvbihmYWxzZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMucGlja2VyLnNob3coKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMucGlja2VyLmNsaWNrQ2FuY2VsKCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uIChzZW5kRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5oYXNDbGFzcygnYXR0YWNoZWRJbnB1dCcpKSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZERhdGUgfHwgc2VuZERhdGUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykgK1xyXG5cdFx0XHRcdFx0J3wnICtcclxuXHRcdFx0XHRcdHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCxcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBISDptbTpzcycpICtcclxuXHRcdFx0XHRcdFx0J3wnICtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0VtcHR5SG91clxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSArICd8JyArIHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRPc05vdGlmeVdpZGdldCh0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLCAnbnVsbHx0cnVlJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUudXBkYXRlUGFyZW50SWZyYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHR5cGVvZiBTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQoJy5QYWdlLkxheW91dFBvcHVwJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5EYXRlVGltZVJhbmdlUGlja2VyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRhbGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IERyb3Bkb3duQ2F0ZWdvcmllcyAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBvcHRHcm91cFNldFZhbHVlKHNlbGVjdElkLCBpbnB1dEJveElkLCBidXR0b25JZCkge1xyXG5cdFx0dmFyIHYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RJZCkudmFsdWU7XHJcblx0XHQkKCcjJyArIGlucHV0Qm94SWQpLnZhbCh2KTtcclxuXHRcdCQoJyMnICsgc2VsZWN0SWQgKyAnIG9wdGlvbltzZWxlY3RlZF0nKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cclxuXHRcdGlmICh2ID4gLTEpIHtcclxuXHRcdFx0JCgnIycgKyBzZWxlY3RJZCArICcgb3B0aW9uW3ZhbHVlPVwiJyArIHYgKyAnXCJdJykuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCcjJyArIGJ1dHRvbklkKS5jbGljaygpO1xyXG5cdFx0JCgnI3MyaWRfJyArIHNlbGVjdElkKS5yZW1vdmVDbGFzcygnc2VsZWN0Mi1jb250YWluZXItYWN0aXZlJyk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBPc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwKGEsIGIpIHtcclxuXHRcdHZhciBfZSA9ICQoJyMnICsgYS5jb250cm9sdG92YWxpZGF0ZSk7XHJcblx0XHR2YXIgaXNWYWxpZCA9IF9lLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGg7XHJcblx0XHR2YXIgaGFzU2libGluZ19NYW5kYXRvcnlTZWxlY3QyID0gX2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoaGFzU2libGluZ19NYW5kYXRvcnlTZWxlY3QyKSB7XHJcblx0XHRcdGlmIChpc1ZhbGlkKSB7XHJcblx0XHRcdFx0X2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLnJlbW92ZUNsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfZS5wcmV2KCdkaXYuc2VsZWN0Mi1jb250YWluZXIuTWFuZGF0b3J5JykuYWRkQ2xhc3MoJ05vdF9WYWxpZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlzVmFsaWQ7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhZGRPcHRHcm91cFZhbGlkYXRvcihvcHRHcm91cEVsZW1lbnRJZCkge1xyXG5cdFx0T3NQYWdlX1ZhbGlkYXRvcnMucHVzaCh7XHJcblx0XHRcdGNvbnRyb2x0b3ZhbGlkYXRlOiBvcHRHcm91cEVsZW1lbnRJZCxcclxuXHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0ZXJyb3JtZXNzYWdlOiAnUmVxdWlyZWQgZmllbGQhJyxcclxuXHRcdFx0ZXZhbHVhdGlvbmZ1bmN0aW9uOiAnU2FwcGhpcmVXaWRnZXRzLkRyb3Bkb3duQ2F0ZWdvcmllcy5Pc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwJyxcclxuXHRcdFx0aW5pdGlhbHZhbHVlOiAnJyxcclxuXHRcdFx0aXN2YWxpZDogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkRyb3Bkb3duQ2F0ZWdvcmllcyA9IHtcclxuXHRcdG9wdEdyb3VwU2V0VmFsdWUsXHJcblx0XHRPc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwLFxyXG5cdFx0YWRkT3B0R3JvdXBWYWxpZGF0b3IsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBEcm9wem9uZSAoUGx1Z2luKSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uKCkge1xyXG5cdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xyXG5cdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XHJcblx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcclxuXHRcdFx0aWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xyXG5cdFx0aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcclxuXHRcdGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xyXG5cdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XHJcblx0aWYgKCFzZWxmKSB7XHJcblx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XHJcblx0fVxyXG5cdHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGNhbGwgPT09ICdmdW5jdGlvbicpID8gY2FsbCA6IHNlbGY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xyXG5cdGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XHJcblx0fVxyXG5cdHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xyXG5cdFx0Y29uc3RydWN0b3I6IHtcclxuXHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxyXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcclxuXHRcdFx0d3JpdGFibGU6IHRydWUsXHJcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuXHRcdH0sXHJcblx0fSk7XHJcblx0aWYgKHN1cGVyQ2xhc3MpXHJcblx0XHRPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogKHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XHJcblx0aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcclxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpO1xyXG5cdH1cclxufVxyXG5cclxuLypcclxuICpcclxuICogTW9yZSBpbmZvIGF0IFt3d3cuZHJvcHpvbmVqcy5jb21dKGh0dHA6Ly93d3cuZHJvcHpvbmVqcy5jb20pXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxMiwgTWF0aWFzIE1lbm9cclxuICpcclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8vIFRoZSBFbWl0dGVyIGNsYXNzIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIGNhbGwgYC5vbigpYCBvbiBEcm9wem9uZSB0byBsaXN0ZW5cclxuLy8gdG8gZXZlbnRzLlxyXG4vLyBJdCBpcyBzdHJvbmdseSBiYXNlZCBvbiBjb21wb25lbnQncyBlbWl0dGVyIGNsYXNzLCBhbmQgSSByZW1vdmVkIHRoZVxyXG4vLyBmdW5jdGlvbmFsaXR5IGJlY2F1c2Ugb2YgdGhlIGRlcGVuZGVuY3kgaGVsbCB3aXRoIGRpZmZlcmVudCBmcmFtZXdvcmtzLlxyXG52YXIgRW1pdHRlciA9IChmdW5jdGlvbigpIHtcclxuXHRmdW5jdGlvbiBFbWl0dGVyKCkge1xyXG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVtaXR0ZXIpO1xyXG5cdH1cclxuXHJcblx0X2NyZWF0ZUNsYXNzKEVtaXR0ZXIsIFtcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnb24nLFxyXG5cclxuXHRcdFx0Ly8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBnaXZlbiBldmVudFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XHJcblx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cdFx0XHRcdC8vIENyZWF0ZSBuYW1lc3BhY2UgZm9yIHRoaXMgZXZlbnRcclxuXHRcdFx0XHRpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudF0pIHtcclxuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSBbXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGZuKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2VtaXQnLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW1pdChldmVudCkge1xyXG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuXHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XHJcblx0XHRcdFx0XHRcdGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IgPSBjYWxsYmFja3MsXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWY7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaSA9IF9pdGVyYXRvci5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYgPSBfaS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrID0gX3JlZjtcclxuXHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50LiBJZiBmbiBpcyBub3QgcHJvdmlkZWQsIGFsbCBldmVudFxyXG5cdFx0XHQvLyBsaXN0ZW5lcnMgZm9yIHRoYXQgZXZlbnQgd2lsbCBiZSByZW1vdmVkLiBJZiBuZWl0aGVyIGlzIHByb3ZpZGVkLCBhbGxcclxuXHRcdFx0Ly8gZXZlbnQgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ29mZicsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvZmYoZXZlbnQsIGZuKSB7XHJcblx0XHRcdFx0aWYgKCF0aGlzLl9jYWxsYmFja3MgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzID0ge307XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIHNwZWNpZmljIGV2ZW50XHJcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcblx0XHRcdFx0aWYgKCFjYWxsYmFja3MpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldO1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrID09PSBmbikge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRdKTtcclxuXHJcblx0cmV0dXJuIEVtaXR0ZXI7XHJcbn0pKCk7XHJcblxyXG52YXIgRHJvcHpvbmUgPSAoZnVuY3Rpb24oX0VtaXR0ZXIpIHtcclxuXHRfaW5oZXJpdHMoRHJvcHpvbmUsIF9FbWl0dGVyKTtcclxuXHJcblx0X2NyZWF0ZUNsYXNzKERyb3B6b25lLCBudWxsLCBbXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2luaXRDbGFzcycsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0Q2xhc3MoKSB7XHJcblx0XHRcdFx0Ly8gRXhwb3NpbmcgdGhlIGVtaXR0ZXIgY2xhc3MsIG1haW5seSBmb3IgdGVzdHNcclxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5FbWl0dGVyID0gRW1pdHRlcjtcclxuXHJcblx0XHRcdFx0LypcclxuICAgICAgIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgZXZlbnRzIHlvdSBjYW4gcmVnaXN0ZXIgb24gYSBkcm9wem9uZSBvYmplY3QuXHJcbiAgICAgICAgWW91IGNhbiByZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIGxpa2UgdGhpczpcclxuICAgICAgICBkcm9wem9uZS5vbihcImRyYWdFbnRlclwiLCBmdW5jdGlvbigpIHsgfSk7XHJcbiAgICAgICAgKi9cclxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5ldmVudHMgPSBbXHJcblx0XHRcdFx0XHQnZHJvcCcsXHJcblx0XHRcdFx0XHQnZHJhZ3N0YXJ0JyxcclxuXHRcdFx0XHRcdCdkcmFnZW5kJyxcclxuXHRcdFx0XHRcdCdkcmFnZW50ZXInLFxyXG5cdFx0XHRcdFx0J2RyYWdvdmVyJyxcclxuXHRcdFx0XHRcdCdkcmFnbGVhdmUnLFxyXG5cdFx0XHRcdFx0J2FkZGVkZmlsZScsXHJcblx0XHRcdFx0XHQnYWRkZWRmaWxlcycsXHJcblx0XHRcdFx0XHQncmVtb3ZlZGZpbGUnLFxyXG5cdFx0XHRcdFx0J3RodW1ibmFpbCcsXHJcblx0XHRcdFx0XHQnZXJyb3InLFxyXG5cdFx0XHRcdFx0J2Vycm9ybXVsdGlwbGUnLFxyXG5cdFx0XHRcdFx0J3Byb2Nlc3NpbmcnLFxyXG5cdFx0XHRcdFx0J3Byb2Nlc3NpbmdtdWx0aXBsZScsXHJcblx0XHRcdFx0XHQndXBsb2FkcHJvZ3Jlc3MnLFxyXG5cdFx0XHRcdFx0J3RvdGFsdXBsb2FkcHJvZ3Jlc3MnLFxyXG5cdFx0XHRcdFx0J3NlbmRpbmcnLFxyXG5cdFx0XHRcdFx0J3NlbmRpbmdtdWx0aXBsZScsXHJcblx0XHRcdFx0XHQnc3VjY2VzcycsXHJcblx0XHRcdFx0XHQnc3VjY2Vzc211bHRpcGxlJyxcclxuXHRcdFx0XHRcdCdjYW5jZWxlZCcsXHJcblx0XHRcdFx0XHQnY2FuY2VsZWRtdWx0aXBsZScsXHJcblx0XHRcdFx0XHQnY29tcGxldGUnLFxyXG5cdFx0XHRcdFx0J2NvbXBsZXRlbXVsdGlwbGUnLFxyXG5cdFx0XHRcdFx0J3Jlc2V0JyxcclxuXHRcdFx0XHRcdCdtYXhmaWxlc2V4Y2VlZGVkJyxcclxuXHRcdFx0XHRcdCdtYXhmaWxlc3JlYWNoZWQnLFxyXG5cdFx0XHRcdFx0J3F1ZXVlY29tcGxldGUnLFxyXG5cdFx0XHRcdF07XHJcblxyXG5cdFx0XHRcdHRoaXMucHJvdG90eXBlLmRlZmF1bHRPcHRpb25zID0ge1xyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBIYXMgdG8gYmUgc3BlY2lmaWVkIG9uIGVsZW1lbnRzIG90aGVyIHRoYW4gZm9ybSAob3Igd2hlbiB0aGUgZm9ybVxyXG5cdFx0XHRcdFx0ICogZG9lc24ndCBoYXZlIGFuIGBhY3Rpb25gIGF0dHJpYnV0ZSkuIFlvdSBjYW4gYWxzb1xyXG5cdFx0XHRcdFx0ICogcHJvdmlkZSBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBgZmlsZXNgIGFuZFxyXG5cdFx0XHRcdFx0ICogbXVzdCByZXR1cm4gdGhlIHVybCAoc2luY2UgYHYzLjEyLjBgKVxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHR1cmw6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBDYW4gYmUgY2hhbmdlZCB0byBgXCJwdXRcImAgaWYgbmVjZXNzYXJ5LiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIGZ1bmN0aW9uXHJcblx0XHRcdFx0XHQgKiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmQgbXVzdCByZXR1cm4gdGhlIG1ldGhvZCAoc2luY2UgYHYzLjEyLjBgKS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaWxsIGJlIHNldCBvbiB0aGUgWEhSZXF1ZXN0LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHR3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIHRpbWVvdXQgZm9yIHRoZSBYSFIgcmVxdWVzdHMgaW4gbWlsbGlzZWNvbmRzIChzaW5jZSBgdjQuNC4wYCkuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHRpbWVvdXQ6IDMwMDAwLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSG93IG1hbnkgZmlsZSB1cGxvYWRzIHRvIHByb2Nlc3MgaW4gcGFyYWxsZWwgKFNlZSB0aGVcclxuXHRcdFx0XHRcdCAqIEVucXVldWluZyBmaWxlIHVwbG9hZHMqIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvKVxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRwYXJhbGxlbFVwbG9hZHM6IDIsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaGV0aGVyIHRvIHNlbmQgbXVsdGlwbGUgZmlsZXMgaW4gb25lIHJlcXVlc3QuIElmXHJcblx0XHRcdFx0XHQgKiB0aGlzIGl0IHNldCB0byB0cnVlLCB0aGVuIHRoZSBmYWxsYmFjayBmaWxlIGlucHV0IGVsZW1lbnQgd2lsbFxyXG5cdFx0XHRcdFx0ICogaGF2ZSB0aGUgYG11bHRpcGxlYCBhdHRyaWJ1dGUgYXMgd2VsbC4gVGhpcyBvcHRpb24gd2lsbFxyXG5cdFx0XHRcdFx0ICogYWxzbyB0cmlnZ2VyIGFkZGl0aW9uYWwgZXZlbnRzIChsaWtlIGBwcm9jZXNzaW5nbXVsdGlwbGVgKS4gU2VlIHRoZSBldmVudHNcclxuXHRcdFx0XHRcdCAqIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dXBsb2FkTXVsdGlwbGU6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogV2hldGhlciB5b3Ugd2FudCBmaWxlcyB0byBiZSB1cGxvYWRlZCBpbiBjaHVua3MgdG8geW91ciBzZXJ2ZXIuIFRoaXMgY2FuJ3QgYmVcclxuXHRcdFx0XHRcdCAqIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBgdXBsb2FkTXVsdGlwbGVgLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFNlZSBbY2h1bmtzVXBsb2FkZWRdKCNjb25maWctY2h1bmtzVXBsb2FkZWQpIGZvciB0aGUgY2FsbGJhY2sgdG8gZmluYWxpc2UgYW4gdXBsb2FkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjaHVua2luZzogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgY2h1bmtpbmdgIGlzIGVuYWJsZWQsIHRoaXMgZGVmaW5lcyB3aGV0aGVyICoqZXZlcnkqKiBmaWxlIHNob3VsZCBiZSBjaHVua2VkLFxyXG5cdFx0XHRcdFx0ICogZXZlbiBpZiB0aGUgZmlsZSBzaXplIGlzIGJlbG93IGNodW5rU2l6ZS4gVGhpcyBtZWFucywgdGhhdCB0aGUgYWRkaXRpb25hbCBjaHVua1xyXG5cdFx0XHRcdFx0ICogZm9ybSBkYXRhIHdpbGwgYmUgc3VibWl0dGVkIGFuZCB0aGUgYGNodW5rc1VwbG9hZGVkYCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGZvcmNlQ2h1bmtpbmc6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYGNodW5raW5nYCBpcyBgdHJ1ZWAsIHRoZW4gdGhpcyBkZWZpbmVzIHRoZSBjaHVuayBzaXplIGluIGJ5dGVzLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjaHVua1NpemU6IDIwMDAwMDAsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAsIHRoZSBpbmRpdmlkdWFsIGNodW5rcyBvZiBhIGZpbGUgYXJlIGJlaW5nIHVwbG9hZGVkIHNpbXVsdGFuZW91c2x5LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRwYXJhbGxlbENodW5rVXBsb2FkczogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaGV0aGVyIGEgY2h1bmsgc2hvdWxkIGJlIHJldHJpZWQgaWYgaXQgZmFpbHMuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHJldHJ5Q2h1bmtzOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGByZXRyeUNodW5rc2AgaXMgdHJ1ZSwgaG93IG1hbnkgdGltZXMgc2hvdWxkIGl0IGJlIHJldHJpZWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHJldHJ5Q2h1bmtzTGltaXQ6IDMsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBub3QgYG51bGxgIGRlZmluZXMgaG93IG1hbnkgZmlsZXMgdGhpcyBEcm9wem9uZSBoYW5kbGVzLiBJZiBpdCBleGNlZWRzLFxyXG5cdFx0XHRcdFx0ICogdGhlIGV2ZW50IGBtYXhmaWxlc2V4Y2VlZGVkYCB3aWxsIGJlIGNhbGxlZC4gVGhlIGRyb3B6b25lIGVsZW1lbnQgZ2V0cyB0aGVcclxuXHRcdFx0XHRcdCAqIGNsYXNzIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgYWNjb3JkaW5nbHkgc28geW91IGNhbiBwcm92aWRlIHZpc3VhbCBmZWVkYmFjay5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0bWF4RmlsZXNpemU6IDI1NixcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSBuYW1lIG9mIHRoZSBmaWxlIHBhcmFtIHRoYXQgZ2V0cyB0cmFuc2ZlcnJlZC5cclxuXHRcdFx0XHRcdCAqICoqTk9URSoqOiBJZiB5b3UgaGF2ZSB0aGUgb3B0aW9uICBgdXBsb2FkTXVsdGlwbGVgIHNldCB0byBgdHJ1ZWAsIHRoZW5cclxuXHRcdFx0XHRcdCAqIERyb3B6b25lIHdpbGwgYXBwZW5kIGBbXWAgdG8gdGhlIG5hbWUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHBhcmFtTmFtZTogJ2ZpbGUnLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogV2hldGhlciB0aHVtYm5haWxzIGZvciBpbWFnZXMgc2hvdWxkIGJlIGdlbmVyYXRlZFxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjcmVhdGVJbWFnZVRodW1ibmFpbHM6IHRydWUsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJbiBNQi4gV2hlbiB0aGUgZmlsZW5hbWUgZXhjZWVkcyB0aGlzIGxpbWl0LCB0aGUgdGh1bWJuYWlsIHdpbGwgbm90IGJlIGdlbmVyYXRlZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0bWF4VGh1bWJuYWlsRmlsZXNpemU6IDEwLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYG51bGxgLCB0aGUgcmF0aW8gb2YgdGhlIGltYWdlIHdpbGwgYmUgdXNlZCB0byBjYWxjdWxhdGUgaXQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHRodW1ibmFpbFdpZHRoOiAxMjAsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgc2FtZSBhcyBgdGh1bWJuYWlsV2lkdGhgLiBJZiBib3RoIGFyZSBudWxsLCBpbWFnZXMgd2lsbCBub3QgYmUgcmVzaXplZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dGh1bWJuYWlsSGVpZ2h0OiAxMjAsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgdGh1bWJuYWlsV2lkdGhgIGFuZCBgdGh1bWJuYWlsSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXHJcblx0XHRcdFx0XHQgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHRodW1ibmFpbE1ldGhvZDogJ2Nyb3AnLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgc2V0LCBpbWFnZXMgd2lsbCBiZSByZXNpemVkIHRvIHRoZXNlIGRpbWVuc2lvbnMgYmVmb3JlIGJlaW5nICoqdXBsb2FkZWQqKi5cclxuXHRcdFx0XHRcdCAqIElmIG9ubHkgb25lLCBgcmVzaXplV2lkdGhgICoqb3IqKiBgcmVzaXplSGVpZ2h0YCBpcyBwcm92aWRlZCwgdGhlIG9yaWdpbmFsIGFzcGVjdFxyXG5cdFx0XHRcdFx0ICogcmF0aW8gb2YgdGhlIGZpbGUgd2lsbCBiZSBwcmVzZXJ2ZWQuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogVGhlIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uIHVzZXMgdGhlc2Ugb3B0aW9ucywgc28gaWYgdGhlIGB0cmFuc2Zvcm1GaWxlYCBmdW5jdGlvblxyXG5cdFx0XHRcdFx0ICogaXMgb3ZlcnJpZGRlbiwgdGhlc2Ugb3B0aW9ucyBkb24ndCBkbyBhbnl0aGluZy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVzaXplV2lkdGg6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBTZWUgYHJlc2l6ZVdpZHRoYC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVzaXplSGVpZ2h0OiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIG1pbWUgdHlwZSBvZiB0aGUgcmVzaXplZCBpbWFnZSAoYmVmb3JlIGl0IGdldHMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlcikuXHJcblx0XHRcdFx0XHQgKiBJZiBgbnVsbGAgdGhlIG9yaWdpbmFsIG1pbWUgdHlwZSB3aWxsIGJlIHVzZWQuIFRvIGZvcmNlIGpwZWcsIGZvciBleGFtcGxlLCB1c2UgYGltYWdlL2pwZWdgLlxyXG5cdFx0XHRcdFx0ICogU2VlIGByZXNpemVXaWR0aGAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHJlc2l6ZU1pbWVUeXBlOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIHF1YWxpdHkgb2YgdGhlIHJlc2l6ZWQgaW1hZ2VzLiBTZWUgYHJlc2l6ZVdpZHRoYC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVzaXplUXVhbGl0eTogMC44LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgYXJlIHByb3ZpZGVkLlxyXG5cdFx0XHRcdFx0ICogQ2FuIGJlIGVpdGhlciBgY29udGFpbmAgb3IgYGNyb3BgLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZXNpemVNZXRob2Q6ICdjb250YWluJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSBiYXNlIHRoYXQgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIGZpbGVzaXplLiBZb3UgY2FuIGNoYW5nZSB0aGlzIHRvXHJcblx0XHRcdFx0XHQgKiAxMDI0IGlmIHlvdSB3b3VsZCByYXRoZXIgZGlzcGxheSBraWJpYnl0ZXMsIG1lYmlieXRlcywgZXRjLi4uXHJcblx0XHRcdFx0XHQgKiAxMDI0IGlzIHRlY2huaWNhbGx5IGluY29ycmVjdCwgYmVjYXVzZSBgMTAyNCBieXRlc2AgYXJlIGAxIGtpYmlieXRlYCBub3QgYDEga2lsb2J5dGVgLlxyXG5cdFx0XHRcdFx0ICogWW91IGNhbiBjaGFuZ2UgdGhpcyB0byBgMTAyNGAgaWYgeW91IGRvbid0IGNhcmUgYWJvdXQgdmFsaWRpdHkuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGZpbGVzaXplQmFzZTogMTAwMCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIENhbiBiZSB1c2VkIHRvIGxpbWl0IHRoZSBtYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IHdpbGwgYmUgaGFuZGxlZCBieSB0aGlzIERyb3B6b25lXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdG1heEZpbGVzOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogQW4gb3B0aW9uYWwgb2JqZWN0IHRvIHNlbmQgYWRkaXRpb25hbCBoZWFkZXJzIHRvIHRoZSBzZXJ2ZXIuIEVnOlxyXG5cdFx0XHRcdFx0ICogYHsgXCJNeS1Bd2Vzb21lLUhlYWRlclwiOiBcImhlYWRlciB2YWx1ZVwiIH1gXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGhlYWRlcnM6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAsIHRoZSBkcm9wem9uZSBlbGVtZW50IGl0c2VsZiB3aWxsIGJlIGNsaWNrYWJsZSwgaWYgYGZhbHNlYFxyXG5cdFx0XHRcdFx0ICogbm90aGluZyB3aWxsIGJlIGNsaWNrYWJsZS5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBZb3UgY2FuIGFsc28gcGFzcyBhbiBIVE1MIGVsZW1lbnQsIGEgQ1NTIHNlbGVjdG9yIChmb3IgbXVsdGlwbGUgZWxlbWVudHMpXHJcblx0XHRcdFx0XHQgKiBvciBhbiBhcnJheSBvZiB0aG9zZS4gSW4gdGhhdCBjYXNlLCBhbGwgb2YgdGhvc2UgZWxlbWVudHMgd2lsbCB0cmlnZ2VyIGFuXHJcblx0XHRcdFx0XHQgKiB1cGxvYWQgd2hlbiBjbGlja2VkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjbGlja2FibGU6IHRydWUsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaGV0aGVyIGhpZGRlbiBmaWxlcyBpbiBkaXJlY3RvcmllcyBzaG91bGQgYmUgaWdub3JlZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0aWdub3JlSGlkZGVuRmlsZXM6IHRydWUsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBgYWNjZXB0YCBjaGVja3MgdGhlIGZpbGUncyBtaW1lIHR5cGUgb3JcclxuXHRcdFx0XHRcdCAqIGV4dGVuc2lvbiBhZ2FpbnN0IHRoaXMgbGlzdC4gVGhpcyBpcyBhIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIG1pbWVcclxuXHRcdFx0XHRcdCAqIHR5cGVzIG9yIGZpbGUgZXh0ZW5zaW9ucy5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBFZy46IGBpbWFnZS8qLGFwcGxpY2F0aW9uL3BkZiwucHNkYFxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIElmIHRoZSBEcm9wem9uZSBpcyBgY2xpY2thYmxlYCB0aGlzIG9wdGlvbiB3aWxsIGFsc28gYmUgdXNlZCBhc1xyXG5cdFx0XHRcdFx0ICogW2BhY2NlcHRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0hUTUwvRWxlbWVudC9pbnB1dCNhdHRyLWFjY2VwdClcclxuXHRcdFx0XHRcdCAqIHBhcmFtZXRlciBvbiB0aGUgaGlkZGVuIGZpbGUgaW5wdXQgYXMgd2VsbC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0YWNjZXB0ZWRGaWxlczogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqICoqRGVwcmVjYXRlZCEqKlxyXG5cdFx0XHRcdFx0ICogVXNlIGFjY2VwdGVkRmlsZXMgaW5zdGVhZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0YWNjZXB0ZWRNaW1lVHlwZXM6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBmYWxzZSwgZmlsZXMgd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVldWUgYnV0IHRoZSBxdWV1ZSB3aWxsIG5vdCBiZVxyXG5cdFx0XHRcdFx0ICogcHJvY2Vzc2VkIGF1dG9tYXRpY2FsbHkuXHJcblx0XHRcdFx0XHQgKiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgeW91IG5lZWQgc29tZSBhZGRpdGlvbmFsIHVzZXIgaW5wdXQgYmVmb3JlIHNlbmRpbmdcclxuXHRcdFx0XHRcdCAqIGZpbGVzIChvciBpZiB5b3Ugd2FudCB3YW50IGFsbCBmaWxlcyBzZW50IGF0IG9uY2UpLlxyXG5cdFx0XHRcdFx0ICogSWYgeW91J3JlIHJlYWR5IHRvIHNlbmQgdGhlIGZpbGUgc2ltcGx5IGNhbGwgYG15RHJvcHpvbmUucHJvY2Vzc1F1ZXVlKClgLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFNlZSB0aGUgW2VucXVldWluZyBmaWxlIHVwbG9hZHNdKCNlbnF1ZXVpbmctZmlsZS11cGxvYWRzKSBkb2N1bWVudGF0aW9uXHJcblx0XHRcdFx0XHQgKiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRhdXRvUHJvY2Vzc1F1ZXVlOiB0cnVlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgZmFsc2UsIGZpbGVzIGFkZGVkIHRvIHRoZSBkcm9wem9uZSB3aWxsIG5vdCBiZSBxdWV1ZWQgYnkgZGVmYXVsdC5cclxuXHRcdFx0XHRcdCAqIFlvdSdsbCBoYXZlIHRvIGNhbGwgYGVucXVldWVGaWxlKGZpbGUpYCBtYW51YWxseS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0YXV0b1F1ZXVlOiB0cnVlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYHRydWVgLCB0aGlzIHdpbGwgYWRkIGEgbGluayB0byBldmVyeSBmaWxlIHByZXZpZXcgdG8gcmVtb3ZlIG9yIGNhbmNlbCAoaWZcclxuXHRcdFx0XHRcdCAqIGFscmVhZHkgdXBsb2FkaW5nKSB0aGUgZmlsZS4gVGhlIGBkaWN0Q2FuY2VsVXBsb2FkYCwgYGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb25gXHJcblx0XHRcdFx0XHQgKiBhbmQgYGRpY3RSZW1vdmVGaWxlYCBvcHRpb25zIGFyZSB1c2VkIGZvciB0aGUgd29yZGluZy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0YWRkUmVtb3ZlTGlua3M6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogRGVmaW5lcyB3aGVyZSB0byBkaXNwbGF5IHRoZSBmaWxlIHByZXZpZXdzIOKAkyBpZiBgbnVsbGAgdGhlXHJcblx0XHRcdFx0XHQgKiBEcm9wem9uZSBlbGVtZW50IGl0c2VsZiBpcyB1c2VkLiBDYW4gYmUgYSBwbGFpbiBgSFRNTEVsZW1lbnRgIG9yIGEgQ1NTXHJcblx0XHRcdFx0XHQgKiBzZWxlY3Rvci4gVGhlIGVsZW1lbnQgc2hvdWxkIGhhdmUgdGhlIGBkcm9wem9uZS1wcmV2aWV3c2AgY2xhc3Mgc29cclxuXHRcdFx0XHRcdCAqIHRoZSBwcmV2aWV3cyBhcmUgZGlzcGxheWVkIHByb3Blcmx5LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRwcmV2aWV3c0NvbnRhaW5lcjogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoaXMgaXMgdGhlIGVsZW1lbnQgdGhlIGhpZGRlbiBpbnB1dCBmaWVsZCAod2hpY2ggaXMgdXNlZCB3aGVuIGNsaWNraW5nIG9uIHRoZVxyXG5cdFx0XHRcdFx0ICogZHJvcHpvbmUgdG8gdHJpZ2dlciBmaWxlIHNlbGVjdGlvbikgd2lsbCBiZSBhcHBlbmRlZCB0by4gVGhpcyBtaWdodFxyXG5cdFx0XHRcdFx0ICogYmUgaW1wb3J0YW50IGluIGNhc2UgeW91IHVzZSBmcmFtZXdvcmtzIHRvIHN3aXRjaCB0aGUgY29udGVudCBvZiB5b3VyIHBhZ2UuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGhpZGRlbklucHV0Q29udGFpbmVyOiAnYm9keScsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBudWxsLCBubyBjYXB0dXJlIHR5cGUgd2lsbCBiZSBzcGVjaWZpZWRcclxuXHRcdFx0XHRcdCAqIElmIGNhbWVyYSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIGNhbWVyYVxyXG5cdFx0XHRcdFx0ICogSWYgbWljcm9waG9uZSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIHRoZSBtaWNyb3Bob25lXHJcblx0XHRcdFx0XHQgKiBJZiBjYW1jb3JkZXIsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgY2FtZXJhIGluIHZpZGVvIG1vZGVcclxuXHRcdFx0XHRcdCAqIE9uIGFwcGxlIGRldmljZXMgbXVsdGlwbGUgbXVzdCBiZSBzZXQgdG8gZmFsc2UuICBBY2NlcHRlZEZpbGVzIG1heSBuZWVkIHRvXHJcblx0XHRcdFx0XHQgKiBiZSBzZXQgdG8gYW4gYXBwcm9wcmlhdGUgbWltZSB0eXBlIChlLmcuIFwiaW1hZ2UvKlwiLCBcImF1ZGlvLypcIiwgb3IgXCJ2aWRlby8qXCIpLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjYXB0dXJlOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogKipEZXByZWNhdGVkKiouIFVzZSBgcmVuYW1lRmlsZWAgaW5zdGVhZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVuYW1lRmlsZW5hbWU6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZCBiZWZvcmUgdGhlIGZpbGUgaXMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlciBhbmQgcmVuYW1lcyB0aGUgZmlsZS5cclxuXHRcdFx0XHRcdCAqIFRoaXMgZnVuY3Rpb24gZ2V0cyB0aGUgYEZpbGVgIGFzIGFyZ3VtZW50IGFuZCBjYW4gdXNlIHRoZSBgZmlsZS5uYW1lYC4gVGhlIGFjdHVhbCBuYW1lIG9mIHRoZVxyXG5cdFx0XHRcdFx0ICogZmlsZSB0aGF0IGdldHMgdXNlZCBkdXJpbmcgdGhlIHVwbG9hZCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCBgZmlsZS51cGxvYWQuZmlsZW5hbWVgLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZW5hbWVGaWxlOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYHRydWVgIHRoZSBmYWxsYmFjayB3aWxsIGJlIGZvcmNlZC4gVGhpcyBpcyB2ZXJ5IHVzZWZ1bCB0byB0ZXN0IHlvdXIgc2VydmVyXHJcblx0XHRcdFx0XHQgKiBpbXBsZW1lbnRhdGlvbnMgZmlyc3QgYW5kIG1ha2Ugc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgd29ya3MgYXNcclxuXHRcdFx0XHRcdCAqIGV4cGVjdGVkIHdpdGhvdXQgZHJvcHpvbmUgaWYgeW91IGV4cGVyaWVuY2UgcHJvYmxlbXMsIGFuZCB0byB0ZXN0XHJcblx0XHRcdFx0XHQgKiBob3cgeW91ciBmYWxsYmFja3Mgd2lsbCBsb29rLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRmb3JjZUZhbGxiYWNrOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSB0ZXh0IHVzZWQgYmVmb3JlIGFueSBmaWxlcyBhcmUgZHJvcHBlZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdERlZmF1bHRNZXNzYWdlOiAnRHJvcCBmaWxlcyBoZXJlIHRvIHVwbG9hZCcsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgdGV4dCB0aGF0IHJlcGxhY2VzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgdGV4dCBpdCB0aGUgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0RmFsbGJhY2tNZXNzYWdlOiBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGRyYWcnbidkcm9wIGZpbGUgdXBsb2Fkcy5cIixcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBhZGRlZCBiZWZvcmUgdGhlIGZhbGxiYWNrIGZvcm0uXHJcblx0XHRcdFx0XHQgKiBJZiB5b3UgcHJvdmlkZSBhICBmYWxsYmFjayBlbGVtZW50IHlvdXJzZWxmLCBvciBpZiB0aGlzIG9wdGlvbiBpcyBgbnVsbGAgdGhpcyB3aWxsXHJcblx0XHRcdFx0XHQgKiBiZSBpZ25vcmVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0RmFsbGJhY2tUZXh0OiAnUGxlYXNlIHVzZSB0aGUgZmFsbGJhY2sgZm9ybSBiZWxvdyB0byB1cGxvYWQgeW91ciBmaWxlcyBsaWtlIGluIHRoZSBvbGRlbiBkYXlzLicsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiB0aGUgZmlsZXNpemUgaXMgdG9vIGJpZy5cclxuXHRcdFx0XHRcdCAqIGB7e2ZpbGVzaXplfX1gIGFuZCBge3ttYXhGaWxlc2l6ZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHJlc3BlY3RpdmUgY29uZmlndXJhdGlvbiB2YWx1ZXMuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RGaWxlVG9vQmlnOiAnRmlsZSBpcyB0b28gYmlnICh7e2ZpbGVzaXplfX1NaUIpLiBNYXggZmlsZXNpemU6IHt7bWF4RmlsZXNpemV9fU1pQi4nLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgdGhlIGZpbGUgZG9lc24ndCBtYXRjaCB0aGUgZmlsZSB0eXBlLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0SW52YWxpZEZpbGVUeXBlOiBcIllvdSBjYW4ndCB1cGxvYWQgZmlsZXMgb2YgdGhpcyB0eXBlLlwiLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgdGhlIHNlcnZlciByZXNwb25zZSB3YXMgaW52YWxpZC5cclxuXHRcdFx0XHRcdCAqIGB7e3N0YXR1c0NvZGV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBzZXJ2ZXJzIHN0YXR1cyBjb2RlLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0UmVzcG9uc2VFcnJvcjogJ1NlcnZlciByZXNwb25kZWQgd2l0aCB7e3N0YXR1c0NvZGV9fSBjb2RlLicsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgZm9yIHRoZSBjYW5jZWwgdXBsb2FkIGxpbmsuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RDYW5jZWxVcGxvYWQ6ICdDYW5jZWwgdXBsb2FkJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgY29uZmlybWF0aW9uIHdoZW4gY2FuY2VsbGluZyB1cGxvYWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb246ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHRoaXMgdXBsb2FkPycsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgdG8gcmVtb3ZlIGEgZmlsZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdFJlbW92ZUZpbGU6ICdSZW1vdmUgZmlsZScsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiB0aGlzIGlzIG5vdCBudWxsLCB0aGVuIHRoZSB1c2VyIHdpbGwgYmUgcHJvbXB0ZWQgYmVmb3JlIHJlbW92aW5nIGEgZmlsZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb246IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBEaXNwbGF5ZWQgaWYgYG1heEZpbGVzYCBpcyBzdCBhbmQgZXhjZWVkZWQuXHJcblx0XHRcdFx0XHQgKiBUaGUgc3RyaW5nIGB7e21heEZpbGVzfX1gIHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RNYXhGaWxlc0V4Y2VlZGVkOiAnWW91IGNhbiBub3QgdXBsb2FkIGFueSBtb3JlIGZpbGVzLicsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBBbGxvd3MgeW91IHRvIHRyYW5zbGF0ZSB0aGUgZGlmZmVyZW50IHVuaXRzLiBTdGFydGluZyB3aXRoIGB0YmAgZm9yIHRlcmFieXRlcyBhbmQgZ29pbmcgZG93biB0b1xyXG5cdFx0XHRcdFx0ICogYGJgIGZvciBieXRlcy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdEZpbGVTaXplVW5pdHM6IHsgdGI6ICdUQicsIGdiOiAnR0InLCBtYjogJ01CJywga2I6ICdLQicsIGI6ICdiJyB9LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogQ2FsbGVkIHdoZW4gZHJvcHpvbmUgaW5pdGlhbGl6ZWRcclxuXHRcdFx0XHRcdCAqIFlvdSBjYW4gYWRkIGV2ZW50IGxpc3RlbmVycyBoZXJlXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIENhbiBiZSBhbiAqKm9iamVjdCoqIG9mIGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byB0cmFuc2ZlciB0byB0aGUgc2VydmVyLCAqKm9yKiogYSBgRnVuY3Rpb25gXHJcblx0XHRcdFx0XHQgKiB0aGF0IGdldHMgaW52b2tlZCB3aXRoIHRoZSBgZmlsZXNgLCBgeGhyYCBhbmQsIGlmIGl0J3MgYSBjaHVua2VkIHVwbG9hZCwgYGNodW5rYCBhcmd1bWVudHMuIEluIGNhc2VcclxuXHRcdFx0XHRcdCAqIG9mIGEgZnVuY3Rpb24sIHRoaXMgbmVlZHMgdG8gcmV0dXJuIGEgbWFwLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZyBmb3Igbm9ybWFsIHVwbG9hZHMsIGJ1dCBhZGRzIHJlbGV2YW50IGluZm9ybWF0aW9uIGZvclxyXG5cdFx0XHRcdFx0ICogY2h1bmtlZCB1cGxvYWRzLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFRoaXMgaXMgdGhlIHNhbWUgYXMgYWRkaW5nIGhpZGRlbiBpbnB1dCBmaWVsZHMgaW4gdGhlIGZvcm0gZWxlbWVudC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cGFyYW1zOiBmdW5jdGlvbiBwYXJhbXMoZmlsZXMsIHhociwgY2h1bmspIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNodW5rKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdGR6dXVpZDogY2h1bmsuZmlsZS51cGxvYWQudXVpZCxcclxuXHRcdFx0XHRcdFx0XHRcdGR6Y2h1bmtpbmRleDogY2h1bmsuaW5kZXgsXHJcblx0XHRcdFx0XHRcdFx0XHRkenRvdGFsZmlsZXNpemU6IGNodW5rLmZpbGUuc2l6ZSxcclxuXHRcdFx0XHRcdFx0XHRcdGR6Y2h1bmtzaXplOiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHp0b3RhbGNodW5rY291bnQ6IGNodW5rLmZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCxcclxuXHRcdFx0XHRcdFx0XHRcdGR6Y2h1bmtieXRlb2Zmc2V0OiBjaHVuay5pbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemUsXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEEgZnVuY3Rpb24gdGhhdCBnZXRzIGEgW2ZpbGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvRE9NL0ZpbGUpXHJcblx0XHRcdFx0XHQgKiBhbmQgYSBgZG9uZWAgZnVuY3Rpb24gYXMgcGFyYW1ldGVycy5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBJZiB0aGUgZG9uZSBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCB0aGUgZmlsZSBpcyBcImFjY2VwdGVkXCIgYW5kIHdpbGxcclxuXHRcdFx0XHRcdCAqIGJlIHByb2Nlc3NlZC4gSWYgeW91IHBhc3MgYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWQsIGFuZCB0aGUgZXJyb3JcclxuXHRcdFx0XHRcdCAqIG1lc3NhZ2Ugd2lsbCBiZSBkaXNwbGF5ZWQuXHJcblx0XHRcdFx0XHQgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGNhbGxlZCBpZiB0aGUgZmlsZSBpcyB0b28gYmlnIG9yIGRvZXNuJ3QgbWF0Y2ggdGhlIG1pbWUgdHlwZXMuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGFjY2VwdDogZnVuY3Rpb24gYWNjZXB0KGZpbGUsIGRvbmUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoKTtcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiBhbGwgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBmb3IgYSBmaWxlLlxyXG5cdFx0XHRcdFx0ICogSXQgZ2V0cyB0aGUgZmlsZSBmb3Igd2hpY2ggdGhlIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcclxuXHRcdFx0XHRcdCAqIGFuZCB0aGUgYGRvbmVgIGZ1bmN0aW9uIGFzIHNlY29uZC4gYGRvbmUoKWAgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIGV2ZXJ5dGhpbmdcclxuXHRcdFx0XHRcdCAqIG5lZWRlZCB0byBmaW5pc2ggdGhlIHVwbG9hZCBwcm9jZXNzIGlzIGRvbmUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNodW5rc1VwbG9hZGVkOiBmdW5jdGlvbiBjaHVua3NVcGxvYWRlZChmaWxlLCBkb25lKSB7XHJcblx0XHRcdFx0XHRcdGRvbmUoKTtcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBHZXRzIGNhbGxlZCB3aGVuIHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXHJcblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBzaG93cyB0aGUgZmFsbGJhY2sgaW5wdXQgZmllbGQgYW5kIGFkZHNcclxuXHRcdFx0XHRcdCAqIGEgdGV4dC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZmFsbGJhY2s6IGZ1bmN0aW9uIGZhbGxiYWNrKCkge1xyXG5cdFx0XHRcdFx0XHQvLyBUaGlzIGNvZGUgc2hvdWxkIHBhc3MgaW4gSUU3Li4uIDooXHJcblx0XHRcdFx0XHRcdHZhciBtZXNzYWdlRWxlbWVudCA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuZWxlbWVudC5jbGFzc05hbWUgKyAnIGR6LWJyb3dzZXItbm90LXN1cHBvcnRlZCc7XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MiA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRfaTIgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjIgPSBfaXRlcmF0b3IyW19pMisrXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0X2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjIgPSBfaTIudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfcmVmMjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKC8oXnwgKWR6LW1lc3NhZ2UoJHwgKS8udGVzdChjaGlsZC5jbGFzc05hbWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlRWxlbWVudCA9IGNoaWxkO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQuY2xhc3NOYW1lID0gJ2R6LW1lc3NhZ2UnOyAvLyBSZW1vdmVzIHRoZSAnZHotZGVmYXVsdCcgY2xhc3NcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoIW1lc3NhZ2VFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0bWVzc2FnZUVsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KCc8ZGl2IGNsYXNzPVwiZHotbWVzc2FnZVwiPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc3BhbiA9IG1lc3NhZ2VFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF07XHJcblx0XHRcdFx0XHRcdGlmIChzcGFuKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHNwYW4udGV4dENvbnRlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3Bhbi50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc3Bhbi5pbm5lclRleHQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3Bhbi5pbm5lclRleHQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRGYWxsYmFja0Zvcm0oKSk7XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogR2V0cyBjYWxsZWQgdG8gY2FsY3VsYXRlIHRoZSB0aHVtYm5haWwgZGltZW5zaW9ucy5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBJdCBnZXRzIGBmaWxlYCwgYHdpZHRoYCBhbmQgYGhlaWdodGAgKGJvdGggbWF5IGJlIGBudWxsYCkgYXMgcGFyYW1ldGVycyBhbmQgbXVzdCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmc6XHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogIC0gYHNyY1dpZHRoYCAmIGBzcmNIZWlnaHRgIChyZXF1aXJlZClcclxuXHRcdFx0XHRcdCAqICAtIGB0cmdXaWR0aGAgJiBgdHJnSGVpZ2h0YCAocmVxdWlyZWQpXHJcblx0XHRcdFx0XHQgKiAgLSBgc3JjWGAgJiBgc3JjWWAgKG9wdGlvbmFsLCBkZWZhdWx0IGAwYClcclxuXHRcdFx0XHRcdCAqICAtIGB0cmdYYCAmIGB0cmdZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFRob3NlIHZhbHVlcyBhcmUgZ29pbmcgdG8gYmUgdXNlZCBieSBgY3R4LmRyYXdJbWFnZSgpYC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVzaXplOiBmdW5jdGlvbiByZXNpemUoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKSB7XHJcblx0XHRcdFx0XHRcdHZhciBpbmZvID0ge1xyXG5cdFx0XHRcdFx0XHRcdHNyY1g6IDAsXHJcblx0XHRcdFx0XHRcdFx0c3JjWTogMCxcclxuXHRcdFx0XHRcdFx0XHRzcmNXaWR0aDogZmlsZS53aWR0aCxcclxuXHRcdFx0XHRcdFx0XHRzcmNIZWlnaHQ6IGZpbGUuaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHNyY1JhdGlvID0gZmlsZS53aWR0aCAvIGZpbGUuaGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQXV0b21hdGljYWxseSBjYWxjdWxhdGUgZGltZW5zaW9ucyBpZiBub3Qgc3BlY2lmaWVkXHJcblx0XHRcdFx0XHRcdGlmICh3aWR0aCA9PSBudWxsICYmIGhlaWdodCA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0d2lkdGggPSBpbmZvLnNyY1dpZHRoO1xyXG5cdFx0XHRcdFx0XHRcdGhlaWdodCA9IGluZm8uc3JjSGVpZ2h0O1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHdpZHRoID09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGhlaWdodCA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gd2lkdGggLyBzcmNSYXRpbztcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIGltYWdlcyBhcmVuJ3QgdXBzY2FsZWRcclxuXHRcdFx0XHRcdFx0d2lkdGggPSBNYXRoLm1pbih3aWR0aCwgaW5mby5zcmNXaWR0aCk7XHJcblx0XHRcdFx0XHRcdGhlaWdodCA9IE1hdGgubWluKGhlaWdodCwgaW5mby5zcmNIZWlnaHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHRyZ1JhdGlvID0gd2lkdGggLyBoZWlnaHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoaW5mby5zcmNXaWR0aCA+IHdpZHRoIHx8IGluZm8uc3JjSGVpZ2h0ID4gaGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gSW1hZ2UgaXMgYmlnZ2VyIGFuZCBuZWVkcyByZXNjYWxpbmdcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzaXplTWV0aG9kID09PSAnY3JvcCcpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGluZm8uc3JjSGVpZ2h0ID0gZmlsZS5oZWlnaHQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGluZm8uc3JjV2lkdGggPSBpbmZvLnNyY0hlaWdodCAqIHRyZ1JhdGlvO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNXaWR0aCA9IGZpbGUud2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGluZm8uc3JjSGVpZ2h0ID0gaW5mby5zcmNXaWR0aCAvIHRyZ1JhdGlvO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzaXplTWV0aG9kID09PSAnY29udGFpbicpIHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIE1ldGhvZCAnY29udGFpbidcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJlc2l6ZU1ldGhvZCAnXCIgKyByZXNpemVNZXRob2QgKyBcIidcIik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpbmZvLnNyY1ggPSAoZmlsZS53aWR0aCAtIGluZm8uc3JjV2lkdGgpIC8gMjtcclxuXHRcdFx0XHRcdFx0aW5mby5zcmNZID0gKGZpbGUuaGVpZ2h0IC0gaW5mby5zcmNIZWlnaHQpIC8gMjtcclxuXHJcblx0XHRcdFx0XHRcdGluZm8udHJnV2lkdGggPSB3aWR0aDtcclxuXHRcdFx0XHRcdFx0aW5mby50cmdIZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gaW5mbztcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBDYW4gYmUgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGZpbGUgKGZvciBleGFtcGxlLCByZXNpemUgYW4gaW1hZ2UgaWYgbmVjZXNzYXJ5KS5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIGByZXNpemVXaWR0aGAgYW5kIGByZXNpemVIZWlnaHRgIChpZiBwcm92aWRlZCkgYW5kIHJlc2l6ZXNcclxuXHRcdFx0XHRcdCAqIGltYWdlcyBhY2NvcmRpbmcgdG8gdGhvc2UgZGltZW5zaW9ucy5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBHZXRzIHRoZSBgZmlsZWAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgYW5kIGEgYGRvbmUoKWAgZnVuY3Rpb24gYXMgdGhlIHNlY29uZCwgdGhhdCBuZWVkc1xyXG5cdFx0XHRcdFx0ICogdG8gYmUgaW52b2tlZCB3aXRoIHRoZSBmaWxlIHdoZW4gdGhlIHRyYW5zZm9ybWF0aW9uIGlzIGRvbmUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHRyYW5zZm9ybUZpbGU6IGZ1bmN0aW9uIHRyYW5zZm9ybUZpbGUoZmlsZSwgZG9uZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoKHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCB8fCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSAmJiBmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnJlc2l6ZUltYWdlKFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZSxcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMucmVzaXplTWV0aG9kLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZG9uZVxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBBIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSB0ZW1wbGF0ZSB1c2VkIGZvciBlYWNoIGRyb3BwZWRcclxuXHRcdFx0XHRcdCAqIGZpbGUuIENoYW5nZSBpdCB0byBmdWxmaWxsIHlvdXIgbmVlZHMgYnV0IG1ha2Ugc3VyZSB0byBwcm9wZXJseVxyXG5cdFx0XHRcdFx0ICogcHJvdmlkZSBhbGwgZWxlbWVudHMuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogSWYgeW91IHdhbnQgdG8gdXNlIGFuIGFjdHVhbCBIVE1MIGVsZW1lbnQgaW5zdGVhZCBvZiBwcm92aWRpbmcgYSBTdHJpbmdcclxuXHRcdFx0XHRcdCAqIGFzIGEgY29uZmlnIG9wdGlvbiwgeW91IGNvdWxkIGNyZWF0ZSBhIGRpdiB3aXRoIHRoZSBpZCBgdHBsYCxcclxuXHRcdFx0XHRcdCAqIHB1dCB0aGUgdGVtcGxhdGUgaW5zaWRlIGl0IGFuZCBwcm92aWRlIHRoZSBlbGVtZW50IGxpa2UgdGhpczpcclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiAgICAgZG9jdW1lbnRcclxuXHRcdFx0XHRcdCAqICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdHBsJylcclxuXHRcdFx0XHRcdCAqICAgICAgIC5pbm5lckhUTUxcclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHByZXZpZXdUZW1wbGF0ZTpcclxuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkei1wcmV2aWV3IGR6LWZpbGUtcHJldmlld1wiPlxcbiAgPGRpdiBjbGFzcz1cImR6LWltYWdlXCI+PGltZyBkYXRhLWR6LXRodW1ibmFpbCAvPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImR6LWRldGFpbHNcIj5cXG4gICAgPGRpdiBjbGFzcz1cImR6LXNpemVcIj48c3BhbiBkYXRhLWR6LXNpemU+PC9zcGFuPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZHotZmlsZW5hbWVcIj48c3BhbiBkYXRhLWR6LW5hbWU+PC9zcGFuPjwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotcHJvZ3Jlc3NcIj48c3BhbiBjbGFzcz1cImR6LXVwbG9hZFwiIGRhdGEtZHotdXBsb2FkcHJvZ3Jlc3M+PC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImR6LWVycm9yLW1lc3NhZ2VcIj48c3BhbiBkYXRhLWR6LWVycm9ybWVzc2FnZT48L3NwYW4+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotc3VjY2Vzcy1tYXJrXCI+XFxuICAgIDxzdmcgd2lkdGg9XCI1NHB4XCIgaGVpZ2h0PVwiNTRweFwiIHZpZXdCb3g9XCIwIDAgNTQgNTRcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnNrZXRjaD1cImh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9uc1wiPlxcbiAgICAgIDx0aXRsZT5DaGVjazwvdGl0bGU+XFxuICAgICAgPGRlZnM+PC9kZWZzPlxcbiAgICAgIDxnIGlkPVwiUGFnZS0xXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBza2V0Y2g6dHlwZT1cIk1TUGFnZVwiPlxcbiAgICAgICAgPHBhdGggZD1cIk0yMy41LDMxLjg0MzE0NTggTDE3LjU4NTI0MTksMjUuOTI4Mzg3NyBDMTYuMDI0ODI1MywyNC4zNjc5NzExIDEzLjQ5MTAyOTQsMjQuMzY2ODM1IDExLjkyODkzMjIsMjUuOTI4OTMyMiBDMTAuMzcwMDEzNiwyNy40ODc4NTA4IDEwLjM2NjU5MTIsMzAuMDIzNDQ1NSAxMS45MjgzODc3LDMxLjU4NTI0MTkgTDIwLjQxNDc1ODEsNDAuMDcxNjEyMyBDMjAuNTEzMzk5OSw0MC4xNzAyNTQxIDIwLjYxNTkzMTUsNDAuMjYyNjY0OSAyMC43MjE4NjE1LDQwLjM0ODg0MzUgQzIyLjI4MzU2NjksNDEuODcyNTY1MSAyNC43OTQyMzQsNDEuODYyNjIwMiAyNi4zNDYxNTY0LDQwLjMxMDY5NzggTDQzLjMxMDY5NzgsMjMuMzQ2MTU2NCBDNDQuODc3MTAyMSwyMS43Nzk3NTIxIDQ0Ljg3NTgwNTcsMTkuMjQ4Mzg4NyA0My4zMTM3MDg1LDE3LjY4NjI5MTUgQzQxLjc1NDc4OTksMTYuMTI3MzcyOSAzOS4yMTc2MDM1LDE2LjEyNTU0MjIgMzcuNjUzODQzNiwxNy42ODkzMDIyIEwyMy41LDMxLjg0MzE0NTggWiBNMjcsNTMgQzQxLjM1OTQwMzUsNTMgNTMsNDEuMzU5NDAzNSA1MywyNyBDNTMsMTIuNjQwNTk2NSA0MS4zNTk0MDM1LDEgMjcsMSBDMTIuNjQwNTk2NSwxIDEsMTIuNjQwNTk2NSAxLDI3IEMxLDQxLjM1OTQwMzUgMTIuNjQwNTk2NSw1MyAyNyw1MyBaXCIgaWQ9XCJPdmFsLTJcIiBzdHJva2Utb3BhY2l0eT1cIjAuMTk4Nzk0MTU4XCIgc3Ryb2tlPVwiIzc0NzQ3NFwiIGZpbGwtb3BhY2l0eT1cIjAuODE2NTE5NDc1XCIgZmlsbD1cIiNGRkZGRkZcIiBza2V0Y2g6dHlwZT1cIk1TU2hhcGVHcm91cFwiPjwvcGF0aD5cXG4gICAgICA8L2c+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWFya1wiPlxcbiAgICA8c3ZnIHdpZHRoPVwiNTRweFwiIGhlaWdodD1cIjU0cHhcIiB2aWV3Qm94PVwiMCAwIDU0IDU0XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWxuczpza2V0Y2g9XCJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnNcIj5cXG4gICAgICA8dGl0bGU+RXJyb3I8L3RpdGxlPlxcbiAgICAgIDxkZWZzPjwvZGVmcz5cXG4gICAgICA8ZyBpZD1cIlBhZ2UtMVwiIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc2tldGNoOnR5cGU9XCJNU1BhZ2VcIj5cXG4gICAgICAgIDxnIGlkPVwiQ2hlY2stKy1PdmFsLTJcIiBza2V0Y2g6dHlwZT1cIk1TTGF5ZXJHcm91cFwiIHN0cm9rZT1cIiM3NDc0NzRcIiBzdHJva2Utb3BhY2l0eT1cIjAuMTk4Nzk0MTU4XCIgZmlsbD1cIiNGRkZGRkZcIiBmaWxsLW9wYWNpdHk9XCIwLjgxNjUxOTQ3NVwiPlxcbiAgICAgICAgICA8cGF0aCBkPVwiTTMyLjY1Njg1NDIsMjkgTDM4LjMxMDY5NzgsMjMuMzQ2MTU2NCBDMzkuODc3MTAyMSwyMS43Nzk3NTIxIDM5Ljg3NTgwNTcsMTkuMjQ4Mzg4NyAzOC4zMTM3MDg1LDE3LjY4NjI5MTUgQzM2Ljc1NDc4OTksMTYuMTI3MzcyOSAzNC4yMTc2MDM1LDE2LjEyNTU0MjIgMzIuNjUzODQzNiwxNy42ODkzMDIyIEwyNywyMy4zNDMxNDU4IEwyMS4zNDYxNTY0LDE3LjY4OTMwMjIgQzE5Ljc4MjM5NjUsMTYuMTI1NTQyMiAxNy4yNDUyMTAxLDE2LjEyNzM3MjkgMTUuNjg2MjkxNSwxNy42ODYyOTE1IEMxNC4xMjQxOTQzLDE5LjI0ODM4ODcgMTQuMTIyODk3OSwyMS43Nzk3NTIxIDE1LjY4OTMwMjIsMjMuMzQ2MTU2NCBMMjEuMzQzMTQ1OCwyOSBMMTUuNjg5MzAyMiwzNC42NTM4NDM2IEMxNC4xMjI4OTc5LDM2LjIyMDI0NzkgMTQuMTI0MTk0MywzOC43NTE2MTEzIDE1LjY4NjI5MTUsNDAuMzEzNzA4NSBDMTcuMjQ1MjEwMSw0MS44NzI2MjcxIDE5Ljc4MjM5NjUsNDEuODc0NDU3OCAyMS4zNDYxNTY0LDQwLjMxMDY5NzggTDI3LDM0LjY1Njg1NDIgTDMyLjY1Mzg0MzYsNDAuMzEwNjk3OCBDMzQuMjE3NjAzNSw0MS44NzQ0NTc4IDM2Ljc1NDc4OTksNDEuODcyNjI3MSAzOC4zMTM3MDg1LDQwLjMxMzcwODUgQzM5Ljg3NTgwNTcsMzguNzUxNjExMyAzOS44NzcxMDIxLDM2LjIyMDI0NzkgMzguMzEwNjk3OCwzNC42NTM4NDM2IEwzMi42NTY4NTQyLDI5IFogTTI3LDUzIEM0MS4zNTk0MDM1LDUzIDUzLDQxLjM1OTQwMzUgNTMsMjcgQzUzLDEyLjY0MDU5NjUgNDEuMzU5NDAzNSwxIDI3LDEgQzEyLjY0MDU5NjUsMSAxLDEyLjY0MDU5NjUgMSwyNyBDMSw0MS4zNTk0MDM1IDEyLjY0MDU5NjUsNTMgMjcsNTMgWlwiIGlkPVwiT3ZhbC0yXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+XFxuICAgICAgICA8L2c+XFxuICAgICAgPC9nPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbjwvZGl2PicsXHJcblxyXG5cdFx0XHRcdFx0Ly8gRU5EIE9QVElPTlNcclxuXHRcdFx0XHRcdC8vIChSZXF1aXJlZCBieSB0aGUgZHJvcHpvbmUgZG9jdW1lbnRhdGlvbiBwYXJzZXIpXHJcblxyXG5cdFx0XHRcdFx0LypcclxuICAgICAgICAgVGhvc2UgZnVuY3Rpb25zIHJlZ2lzdGVyIHRoZW1zZWx2ZXMgdG8gdGhlIGV2ZW50cyBvbiBpbml0IGFuZCBoYW5kbGUgYWxsXHJcbiAgICAgICAgIHRoZSB1c2VyIGludGVyZmFjZSBzcGVjaWZpYyBzdHVmZi4gT3ZlcndyaXRpbmcgdGhlbSB3b24ndCBicmVhayB0aGUgdXBsb2FkXHJcbiAgICAgICAgIGJ1dCBjYW4gYnJlYWsgdGhlIHdheSBpdCdzIGRpc3BsYXllZC5cclxuICAgICAgICAgWW91IGNhbiBvdmVyd3JpdGUgdGhlbSBpZiB5b3UgZG9uJ3QgbGlrZSB0aGUgZGVmYXVsdCBiZWhhdmlvci4gSWYgeW91IGp1c3RcclxuICAgICAgICAgd2FudCB0byBhZGQgYW4gYWRkaXRpb25hbCBldmVudCBoYW5kbGVyLCByZWdpc3RlciBpdCBvbiB0aGUgZHJvcHpvbmUgb2JqZWN0XHJcbiAgICAgICAgIGFuZCBkb24ndCBvdmVyd3JpdGUgdGhvc2Ugb3B0aW9ucy5cclxuICAgICAgICAgKi9cclxuXHJcblx0XHRcdFx0XHQvLyBUaG9zZSBhcmUgc2VsZiBleHBsYW5hdG9yeSBhbmQgc2ltcGx5IGNvbmNlcm4gdGhlIERyYWduRHJvcC5cclxuXHRcdFx0XHRcdGRyb3A6IGZ1bmN0aW9uIGRyb3AoZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWRyYWctaG92ZXInKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRkcmFnc3RhcnQ6IGZ1bmN0aW9uIGRyYWdzdGFydChlKSB7fSxcclxuXHRcdFx0XHRcdGRyYWdlbmQ6IGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWRyYWctaG92ZXInKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRkcmFnZW50ZXI6IGZ1bmN0aW9uIGRyYWdlbnRlcihlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotZHJhZy1ob3ZlcicpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRyYWdvdmVyOiBmdW5jdGlvbiBkcmFnb3ZlcihlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotZHJhZy1ob3ZlcicpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRyYWdsZWF2ZTogZnVuY3Rpb24gZHJhZ2xlYXZlKGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1kcmFnLWhvdmVyJyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0cGFzdGU6IGZ1bmN0aW9uIHBhc3RlKGUpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciB0aGVyZSBhcmUgbm8gZmlsZXMgbGVmdCBpbiB0aGUgZHJvcHpvbmUgYW55bW9yZSwgYW5kIHRoZVxyXG5cdFx0XHRcdFx0Ly8gZHJvcHpvbmUgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBpZiBpbiB0aGUgaW5pdGlhbCBzdGF0ZS5cclxuXHRcdFx0XHRcdHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1zdGFydGVkJyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuIGEgZmlsZSBpcyBhZGRlZCB0byB0aGUgcXVldWVcclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxyXG5cdFx0XHRcdFx0YWRkZWRmaWxlOiBmdW5jdGlvbiBhZGRlZGZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQgPT09IHRoaXMucHJldmlld3NDb250YWluZXIpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotc3RhcnRlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wcmV2aWV3c0NvbnRhaW5lcikge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUudHJpbSgpKTtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdUZW1wbGF0ZSA9IGZpbGUucHJldmlld0VsZW1lbnQ7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcblxyXG5cdFx0XHRcdFx0XHRcdHRoaXMucHJldmlld3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZS5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1uYW1lXScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTMgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTMgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IzID0gX2lzQXJyYXkzID8gX2l0ZXJhdG9yMyA6IF9pdGVyYXRvcjNbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTMgPj0gX2l0ZXJhdG9yMy5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmMyA9IF9pdGVyYXRvcjNbX2kzKytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2kzID0gX2l0ZXJhdG9yMy5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTMuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYzID0gX2kzLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gX3JlZjM7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0bm9kZS50ZXh0Q29udGVudCA9IGZpbGUubmFtZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I0ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1zaXplXScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTQgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTQgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I0ID0gX2lzQXJyYXk0ID8gX2l0ZXJhdG9yNCA6IF9pdGVyYXRvcjRbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNCA+PSBfaXRlcmF0b3I0Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBfaXRlcmF0b3I0W19pNCsrXTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNCA9IF9pdGVyYXRvcjQubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k0LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRub2RlID0gX2k0LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdG5vZGUuaW5uZXJIVE1MID0gdGhpcy5maWxlc2l6ZShmaWxlLnNpemUpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hZGRSZW1vdmVMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5fcmVtb3ZlTGluayA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0XHRcdFx0XHRcdCc8YSBjbGFzcz1cImR6LXJlbW92ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnVuZGVmaW5lZDtcIiBkYXRhLWR6LXJlbW92ZT4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGUgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2E+J1xyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsZS5fcmVtb3ZlTGluayk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVtb3ZlRmlsZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRmlsZUV2ZW50KGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gRHJvcHpvbmUuY29uZmlybShfdGhpczIub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLnJlbW92ZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF90aGlzMi5vcHRpb25zLmRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIERyb3B6b25lLmNvbmZpcm0oX3RoaXMyLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNSA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotcmVtb3ZlXScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTUgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTUgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I1ID0gX2lzQXJyYXk1ID8gX2l0ZXJhdG9yNSA6IF9pdGVyYXRvcjVbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk1KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTUgPj0gX2l0ZXJhdG9yNS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNCA9IF9pdGVyYXRvcjVbX2k1KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2k1ID0gX2l0ZXJhdG9yNS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTUuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY0ID0gX2k1LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciByZW1vdmVMaW5rID0gX3JlZjQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmVtb3ZlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUZpbGVFdmVudCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciBhIGZpbGUgaXMgcmVtb3ZlZC5cclxuXHRcdFx0XHRcdHJlbW92ZWRmaWxlOiBmdW5jdGlvbiByZW1vdmVkZmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50ICE9IG51bGwgJiYgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmlsZS5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuIGEgdGh1bWJuYWlsIGhhcyBiZWVuIGdlbmVyYXRlZFxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgIGFuZCBgZGF0YVVybGBcclxuXHRcdFx0XHRcdHRodW1ibmFpbDogZnVuY3Rpb24gdGh1bWJuYWlsKGZpbGUsIGRhdGFVcmwpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWZpbGUtcHJldmlldycpO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNiA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotdGh1bWJuYWlsXScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTYgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTYgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I2ID0gX2lzQXJyYXk2ID8gX2l0ZXJhdG9yNiA6IF9pdGVyYXRvcjZbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmNTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk2KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTYgPj0gX2l0ZXJhdG9yNi5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNSA9IF9pdGVyYXRvcjZbX2k2KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2k2ID0gX2l0ZXJhdG9yNi5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTYuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY1ID0gX2k2LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciB0aHVtYm5haWxFbGVtZW50ID0gX3JlZjU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dGh1bWJuYWlsRWxlbWVudC5hbHQgPSBmaWxlLm5hbWU7XHJcblx0XHRcdFx0XHRcdFx0XHR0aHVtYm5haWxFbGVtZW50LnNyYyA9IGRhdGFVcmw7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWltYWdlLXByZXZpZXcnKTtcclxuXHRcdFx0XHRcdFx0XHR9LCAxKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbmV2ZXIgYW4gZXJyb3Igb2NjdXJzXHJcblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBtZXNzYWdlYFxyXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGZpbGUsIG1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWVycm9yJyk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnU3RyaW5nJyAmJiBtZXNzYWdlLmVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5lcnJvcjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I3ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1lcnJvcm1lc3NhZ2VdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NyA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNyA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjcgPSBfaXNBcnJheTcgPyBfaXRlcmF0b3I3IDogX2l0ZXJhdG9yN1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY2O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTcpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNyA+PSBfaXRlcmF0b3I3Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY2ID0gX2l0ZXJhdG9yN1tfaTcrK107XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTcgPSBfaXRlcmF0b3I3Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNy5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjYgPSBfaTcudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSBfcmVmNjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRub2RlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlcnJvcm11bHRpcGxlOiBmdW5jdGlvbiBlcnJvcm11bHRpcGxlKCkge30sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gYSBmaWxlIGdldHMgcHJvY2Vzc2VkLiBTaW5jZSB0aGVyZSBpcyBhIGN1ZSwgbm90IGFsbCBhZGRlZFxyXG5cdFx0XHRcdFx0Ly8gZmlsZXMgYXJlIHByb2Nlc3NlZCBpbW1lZGlhdGVseS5cclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxyXG5cdFx0XHRcdFx0cHJvY2Vzc2luZzogZnVuY3Rpb24gcHJvY2Vzc2luZyhmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1wcm9jZXNzaW5nJyk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGZpbGUuX3JlbW92ZUxpbmspIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoZmlsZS5fcmVtb3ZlTGluay50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRwcm9jZXNzaW5nbXVsdGlwbGU6IGZ1bmN0aW9uIHByb2Nlc3NpbmdtdWx0aXBsZSgpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYCwgYHByb2dyZXNzYCAocGVyY2VudGFnZSAwLTEwMCkgYW5kIGBieXRlc1NlbnRgLlxyXG5cdFx0XHRcdFx0Ly8gVG8gZ2V0IHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgb2YgdGhlIGZpbGUsIHVzZSBgZmlsZS5zaXplYFxyXG5cdFx0XHRcdFx0dXBsb2FkcHJvZ3Jlc3M6IGZ1bmN0aW9uIHVwbG9hZHByb2dyZXNzKGZpbGUsIHByb2dyZXNzLCBieXRlc1NlbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjggPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXVwbG9hZHByb2dyZXNzXScpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTggPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTggPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I4ID0gX2lzQXJyYXk4ID8gX2l0ZXJhdG9yOCA6IF9pdGVyYXRvcjhbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmNztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTggPj0gX2l0ZXJhdG9yOC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNyA9IF9pdGVyYXRvcjhbX2k4KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2k4ID0gX2l0ZXJhdG9yOC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTguZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY3ID0gX2k4LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gX3JlZjc7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZSA9PT0gJ1BST0dSRVNTJyA/IChub2RlLnZhbHVlID0gcHJvZ3Jlc3MpIDogKG5vZGUuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdG90YWwgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aXRoIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgKDAtMTAwKSwgdG90YWxCeXRlcyBhbmQgdG90YWxCeXRlc1NlbnRcclxuXHRcdFx0XHRcdHRvdGFsdXBsb2FkcHJvZ3Jlc3M6IGZ1bmN0aW9uIHRvdGFsdXBsb2FkcHJvZ3Jlc3MoKSB7fSxcclxuXHJcblx0XHRcdFx0XHQvLyBDYWxsZWQganVzdCBiZWZvcmUgdGhlIGZpbGUgaXMgc2VudC4gR2V0cyB0aGUgYHhocmAgb2JqZWN0IGFzIHNlY29uZFxyXG5cdFx0XHRcdFx0Ly8gcGFyYW1ldGVyLCBzbyB5b3UgY2FuIG1vZGlmeSBpdCAoZm9yIGV4YW1wbGUgdG8gYWRkIGEgQ1NSRiB0b2tlbikgYW5kIGFcclxuXHRcdFx0XHRcdC8vIGBmb3JtRGF0YWAgb2JqZWN0IHRvIGFkZCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLlxyXG5cdFx0XHRcdFx0c2VuZGluZzogZnVuY3Rpb24gc2VuZGluZygpIHt9LFxyXG5cdFx0XHRcdFx0c2VuZGluZ211bHRpcGxlOiBmdW5jdGlvbiBzZW5kaW5nbXVsdGlwbGUoKSB7fSxcclxuXHJcblx0XHRcdFx0XHQvLyBXaGVuIHRoZSBjb21wbGV0ZSB1cGxvYWQgaXMgZmluaXNoZWQgYW5kIHN1Y2Nlc3NmdWxcclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotc3VjY2VzcycpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0c3VjY2Vzc211bHRpcGxlOiBmdW5jdGlvbiBzdWNjZXNzbXVsdGlwbGUoKSB7fSxcclxuXHJcblx0XHRcdFx0XHQvLyBXaGVuIHRoZSB1cGxvYWQgaXMgY2FuY2VsZWQuXHJcblx0XHRcdFx0XHRjYW5jZWxlZDogZnVuY3Rpb24gY2FuY2VsZWQoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCdlcnJvcicsIGZpbGUsICdVcGxvYWQgY2FuY2VsZWQuJyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2FuY2VsZWRtdWx0aXBsZTogZnVuY3Rpb24gY2FuY2VsZWRtdWx0aXBsZSgpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBmaW5pc2hlZCwgZWl0aGVyIHdpdGggc3VjY2VzcyBvciBhbiBlcnJvci5cclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxyXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUuX3JlbW92ZUxpbmspIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLl9yZW1vdmVMaW5rLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotY29tcGxldGUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNvbXBsZXRlbXVsdGlwbGU6IGZ1bmN0aW9uIGNvbXBsZXRlbXVsdGlwbGUoKSB7fSxcclxuXHRcdFx0XHRcdG1heGZpbGVzZXhjZWVkZWQ6IGZ1bmN0aW9uIG1heGZpbGVzZXhjZWVkZWQoKSB7fSxcclxuXHRcdFx0XHRcdG1heGZpbGVzcmVhY2hlZDogZnVuY3Rpb24gbWF4ZmlsZXNyZWFjaGVkKCkge30sXHJcblx0XHRcdFx0XHRxdWV1ZWNvbXBsZXRlOiBmdW5jdGlvbiBxdWV1ZWNvbXBsZXRlKCkge30sXHJcblx0XHRcdFx0XHRhZGRlZGZpbGVzOiBmdW5jdGlvbiBhZGRlZGZpbGVzKCkge30sXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuX3RodW1ibmFpbFF1ZXVlID0gW107XHJcblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIGdsb2JhbCB1dGlsaXR5XHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdleHRlbmQnLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xyXG5cdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHR2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBvYmplY3RzID0gQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTtcclxuXHRcdFx0XHRcdF9rZXkyIDwgX2xlbjI7XHJcblx0XHRcdFx0XHRfa2V5MisrXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRvYmplY3RzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdHZhciBfaXRlcmF0b3I5ID0gb2JqZWN0cyxcclxuXHRcdFx0XHRcdFx0X2lzQXJyYXk5ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0X2k5ID0gMCxcclxuXHRcdFx0XHRcdFx0X2l0ZXJhdG9yOSA9IF9pc0FycmF5OSA/IF9pdGVyYXRvcjkgOiBfaXRlcmF0b3I5W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHR2YXIgX3JlZjg7XHJcblxyXG5cdFx0XHRcdFx0aWYgKF9pc0FycmF5OSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoX2k5ID49IF9pdGVyYXRvcjkubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0X3JlZjggPSBfaXRlcmF0b3I5W19pOSsrXTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdF9pOSA9IF9pdGVyYXRvcjkubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoX2k5LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRfcmVmOCA9IF9pOS52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgb2JqZWN0ID0gX3JlZjg7XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsID0gb2JqZWN0W2tleV07XHJcblx0XHRcdFx0XHRcdHRhcmdldFtrZXldID0gdmFsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRdKTtcclxuXHJcblx0ZnVuY3Rpb24gRHJvcHpvbmUoZWwsIG9wdGlvbnMpIHtcclxuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcm9wem9uZSk7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKERyb3B6b25lLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRHJvcHpvbmUpKS5jYWxsKHRoaXMpKTtcclxuXHJcblx0XHR2YXIgZmFsbGJhY2sgPSB2b2lkIDAsXHJcblx0XHRcdGxlZnQgPSB2b2lkIDA7XHJcblx0XHRfdGhpcy5lbGVtZW50ID0gZWw7XHJcblx0XHQvLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgc2luY2UgdGhlIHZlcnNpb24gd2FzIGluIHRoZSBwcm90b3R5cGUgcHJldmlvdXNseVxyXG5cdFx0X3RoaXMudmVyc2lvbiA9IERyb3B6b25lLnZlcnNpb247XHJcblxyXG5cdFx0X3RoaXMuZGVmYXVsdE9wdGlvbnMucHJldmlld1RlbXBsYXRlID0gX3RoaXMuZGVmYXVsdE9wdGlvbnMucHJldmlld1RlbXBsYXRlLnJlcGxhY2UoL1xcbiovZywgJycpO1xyXG5cclxuXHRcdF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW107XHJcblx0XHRfdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuXHRcdF90aGlzLmZpbGVzID0gW107IC8vIEFsbCBmaWxlc1xyXG5cclxuXHRcdGlmICh0eXBlb2YgX3RoaXMuZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0X3RoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3RoaXMuZWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTm90IGNoZWNraW5nIGlmIGluc3RhbmNlIG9mIEhUTUxFbGVtZW50IG9yIEVsZW1lbnQgc2luY2UgSUU5IGlzIGV4dHJlbWVseSB3ZWlyZC5cclxuXHRcdGlmICghX3RoaXMuZWxlbWVudCB8fCBfdGhpcy5lbGVtZW50Lm5vZGVUeXBlID09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRyb3B6b25lIGVsZW1lbnQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKF90aGlzLmVsZW1lbnQuZHJvcHpvbmUpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEcm9wem9uZSBhbHJlYWR5IGF0dGFjaGVkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5vdyBhZGQgdGhpcyBkcm9wem9uZSB0byB0aGUgaW5zdGFuY2VzLlxyXG5cdFx0RHJvcHpvbmUuaW5zdGFuY2VzLnB1c2goX3RoaXMpO1xyXG5cclxuXHRcdC8vIFB1dCB0aGUgZHJvcHpvbmUgaW5zaWRlIHRoZSBlbGVtZW50IGl0c2VsZi5cclxuXHRcdF90aGlzLmVsZW1lbnQuZHJvcHpvbmUgPSBfdGhpcztcclxuXHJcblx0XHR2YXIgZWxlbWVudE9wdGlvbnMgPSAobGVmdCA9IERyb3B6b25lLm9wdGlvbnNGb3JFbGVtZW50KF90aGlzLmVsZW1lbnQpKSAhPSBudWxsID8gbGVmdCA6IHt9O1xyXG5cclxuXHRcdF90aGlzLm9wdGlvbnMgPSBEcm9wem9uZS5leHRlbmQoe30sIF90aGlzLmRlZmF1bHRPcHRpb25zLCBlbGVtZW50T3B0aW9ucywgb3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucyA6IHt9KTtcclxuXHJcblx0XHQvLyBJZiB0aGUgYnJvd3NlciBmYWlsZWQsIGp1c3QgY2FsbCB0aGUgZmFsbGJhY2sgYW5kIGxlYXZlXHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5mb3JjZUZhbGxiYWNrIHx8ICFEcm9wem9uZS5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSkge1xyXG5cdFx0XHR2YXIgX3JldDtcclxuXHJcblx0XHRcdHJldHVybiAoX3JldCA9IF90aGlzLm9wdGlvbnMuZmFsbGJhY2suY2FsbChfdGhpcykpLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQG9wdGlvbnMudXJsID0gQGVsZW1lbnQuZ2V0QXR0cmlidXRlIFwiYWN0aW9uXCIgdW5sZXNzIEBvcHRpb25zLnVybD9cclxuXHRcdGlmIChfdGhpcy5vcHRpb25zLnVybCA9PSBudWxsKSB7XHJcblx0XHRcdF90aGlzLm9wdGlvbnMudXJsID0gX3RoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghX3RoaXMub3B0aW9ucy51cmwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyBVUkwgcHJvdmlkZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAmJiBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcclxuXHRcdFx0XHRcIllvdSBjYW4ndCBwcm92aWRlIGJvdGggJ2FjY2VwdGVkRmlsZXMnIGFuZCAnYWNjZXB0ZWRNaW1lVHlwZXMnLiAnYWNjZXB0ZWRNaW1lVHlwZXMnIGlzIGRlcHJlY2F0ZWQuXCJcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSAmJiBfdGhpcy5vcHRpb25zLmNodW5raW5nKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCBzZXQgYm90aDogdXBsb2FkTXVsdGlwbGUgYW5kIGNodW5raW5nLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5hY2NlcHRlZE1pbWVUeXBlcykge1xyXG5cdFx0XHRfdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgPSBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzO1xyXG5cdFx0XHRkZWxldGUgX3RoaXMub3B0aW9ucy5hY2NlcHRlZE1pbWVUeXBlcztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxyXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMucmVuYW1lRmlsZW5hbWUgIT0gbnVsbCkge1xyXG5cdFx0XHRfdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUgPSBmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0cmV0dXJuIF90aGlzLm9wdGlvbnMucmVuYW1lRmlsZW5hbWUuY2FsbChfdGhpcywgZmlsZS5uYW1lLCBmaWxlKTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRfdGhpcy5vcHRpb25zLm1ldGhvZCA9IF90aGlzLm9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKChmYWxsYmFjayA9IF90aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkgJiYgZmFsbGJhY2sucGFyZW50Tm9kZSkge1xyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIGZhbGxiYWNrXHJcblx0XHRcdGZhbGxiYWNrLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFsbGJhY2spO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERpc3BsYXkgcHJldmlld3MgaW4gdGhlIHByZXZpZXdzQ29udGFpbmVyIGVsZW1lbnQgb3IgdGhlIERyb3B6b25lIGVsZW1lbnQgdW5sZXNzIGV4cGxpY2l0bHkgc2V0IHRvIGZhbHNlXHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIpIHtcclxuXHRcdFx0XHRfdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IERyb3B6b25lLmdldEVsZW1lbnQoX3RoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciwgJ3ByZXZpZXdzQ29udGFpbmVyJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMucHJldmlld3NDb250YWluZXIgPSBfdGhpcy5lbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XHJcblx0XHRcdGlmIChfdGhpcy5vcHRpb25zLmNsaWNrYWJsZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW190aGlzLmVsZW1lbnRdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gRHJvcHpvbmUuZ2V0RWxlbWVudHMoX3RoaXMub3B0aW9ucy5jbGlja2FibGUsICdjbGlja2FibGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdF90aGlzLmluaXQoKTtcclxuXHRcdHJldHVybiBfdGhpcztcclxuXHR9XHJcblxyXG5cdC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIGFjY2VwdGVkXHJcblxyXG5cdF9jcmVhdGVDbGFzcyhcclxuXHRcdERyb3B6b25lLFxyXG5cdFx0W1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0QWNjZXB0ZWRGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEFjY2VwdGVkRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlc1xyXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5hY2NlcHRlZDtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIHJlamVjdGVkXHJcblx0XHRcdFx0Ly8gTm90IHN1cmUgd2hlbiB0aGF0J3MgZ29pbmcgdG8gYmUgdXNlZnVsLCBidXQgYWRkZWQgZm9yIGNvbXBsZXRlbmVzcy5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldFJlamVjdGVkRmlsZXMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRSZWplY3RlZEZpbGVzKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcclxuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuICFmaWxlLmFjY2VwdGVkO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldEZpbGVzV2l0aFN0YXR1cycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEZpbGVzV2l0aFN0YXR1cyhzdGF0dXMpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzXHJcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnN0YXR1cyA9PT0gc3RhdHVzO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRRdWV1ZWRGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFF1ZXVlZEZpbGVzKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKERyb3B6b25lLlFVRVVFRCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldFVwbG9hZGluZ0ZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VXBsb2FkaW5nRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoRHJvcHpvbmUuVVBMT0FESU5HKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0QWRkZWRGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEFkZGVkRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoRHJvcHpvbmUuQURERUQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIEZpbGVzIHRoYXQgYXJlIGVpdGhlciBxdWV1ZWQgb3IgdXBsb2FkaW5nXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRBY3RpdmVGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEFjdGl2ZUZpbGVzKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcclxuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5VUExPQURJTkcgfHwgZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlFVRVVFRDtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdoZW4gRHJvcHpvbmUgaXMgaW5pdGlhbGl6ZWQuIFlvdVxyXG5cdFx0XHRcdC8vIGNhbiAoYW5kIHNob3VsZCkgc2V0dXAgZXZlbnQgbGlzdGVuZXJzIGluc2lkZSB0aGlzIGZ1bmN0aW9uLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnaW5pdCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHQvLyBJbiBjYXNlIGl0IGlzbid0IHNldCBhbHJlYWR5XHJcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdmb3JtJykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHpvbmUnKSAmJiAhdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1tZXNzYWdlJykpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKFxyXG5cdFx0XHRcdFx0XHRcdERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImR6LWRlZmF1bHQgZHotbWVzc2FnZVwiPjxzcGFuPicgKyB0aGlzLm9wdGlvbnMuZGljdERlZmF1bHRNZXNzYWdlICsgJzwvc3Bhbj48L2Rpdj4nXHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc2V0dXBIaWRkZW5GaWxlSW5wdXQgPSBmdW5jdGlvbiBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLmhpZGRlbkZpbGVJbnB1dCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzMy5oaWRkZW5GaWxlSW5wdXQpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gdmFyIGRyb3Bab25lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHotaGlkZGVuLWlucHV0Jyk7XHJcblx0XHRcdFx0XHRcdFx0Ly8gaWYgKGRyb3Bab25lSW5wdXQpIHsgZHJvcFpvbmVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pIH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2ZpbGUnKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMubWF4RmlsZXMgPT09IG51bGwgfHwgX3RoaXMzLm9wdGlvbnMubWF4RmlsZXMgPiAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5jbGFzc05hbWUgPSAnZHotaGlkZGVuLWlucHV0JztcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF90aGlzMy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdhY2NlcHQnLCBfdGhpczMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKF90aGlzMy5vcHRpb25zLmNhcHR1cmUgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdjYXB0dXJlJywgX3RoaXMzLm9wdGlvbnMuY2FwdHVyZSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBOb3Qgc2V0dGluZyBgZGlzcGxheT1cIm5vbmVcImAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRvbid0IGFjY2VwdCBjbGlja3NcclxuXHRcdFx0XHRcdFx0XHQvLyBvbiBlbGVtZW50cyB0aGF0IGFyZW4ndCBkaXNwbGF5ZWQuXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS50b3AgPSAnMCc7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5sZWZ0ID0gJzAnO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gJzAnO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUud2lkdGggPSAnMCc7XHJcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpczMub3B0aW9ucy5oaWRkZW5JbnB1dENvbnRhaW5lcikuYXBwZW5kQ2hpbGQoX3RoaXMzLmhpZGRlbkZpbGVJbnB1dCk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgZmlsZXMgPSBfdGhpczMuaGlkZGVuRmlsZUlucHV0LmZpbGVzO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTAgPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTAgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X2kxMCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxMCA9IF9pc0FycmF5MTAgPyBfaXRlcmF0b3IxMCA6IF9pdGVyYXRvcjEwW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTEwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMCA+PSBfaXRlcmF0b3IxMC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjkgPSBfaXRlcmF0b3IxMFtfaTEwKytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfaTEwID0gX2l0ZXJhdG9yMTAubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTAuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmOSA9IF9pMTAudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWY5O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczMuYWRkRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmVtaXQoJ2FkZGVkZmlsZXMnLCBmaWxlcyk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0dXBIaWRkZW5GaWxlSW5wdXQoKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0c2V0dXBIaWRkZW5GaWxlSW5wdXQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLlVSTCA9IHdpbmRvdy5VUkwgIT09IG51bGwgPyB3aW5kb3cuVVJMIDogd2luZG93LndlYmtpdFVSTDtcclxuXHJcblx0XHRcdFx0XHQvLyBTZXR1cCBhbGwgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBEcm9wem9uZSBvYmplY3QgaXRzZWxmLlxyXG5cdFx0XHRcdFx0Ly8gVGhleSdyZSBub3QgaW4gQHNldHVwRXZlbnRMaXN0ZW5lcnMoKSBiZWNhdXNlIHRoZXkgc2hvdWxkbid0IGJlIHJlbW92ZWRcclxuXHRcdFx0XHRcdC8vIGFnYWluIHdoZW4gdGhlIGRyb3B6b25lIGdldHMgZGlzYWJsZWQuXHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTEgPSB0aGlzLmV2ZW50cyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTExID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRfaTExID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxMSA9IF9pc0FycmF5MTEgPyBfaXRlcmF0b3IxMSA6IF9pdGVyYXRvcjExW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjEwO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTEpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxMSA+PSBfaXRlcmF0b3IxMS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxMCA9IF9pdGVyYXRvcjExW19pMTErK107XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X2kxMSA9IF9pdGVyYXRvcjExLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxMS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMTAgPSBfaTExLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZXZlbnROYW1lID0gX3JlZjEwO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5vbihldmVudE5hbWUsIHRoaXMub3B0aW9uc1tldmVudE5hbWVdKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLm9uKCd1cGxvYWRwcm9ncmVzcycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub24oJ3JlbW92ZWRmaWxlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5vbignY2FuY2VsZWQnLCBmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIEVtaXQgYSBgcXVldWVjb21wbGV0ZWAgZXZlbnQgaWYgYWxsIGZpbGVzIGZpbmlzaGVkIHVwbG9hZGluZy5cclxuXHRcdFx0XHRcdHRoaXMub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmdldEFkZGVkRmlsZXMoKS5sZW5ndGggPT09IDAgJiZcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGggPT09IDAgJiZcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDBcclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBuZWVkcyB0byBiZSBkZWZlcnJlZCBzbyB0aGF0IGBxdWV1ZWNvbXBsZXRlYCByZWFsbHkgdHJpZ2dlcnMgYWZ0ZXIgYGNvbXBsZXRlYFxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdxdWV1ZWNvbXBsZXRlJyk7XHJcblx0XHRcdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHZhciBub1Byb3BhZ2F0aW9uID0gZnVuY3Rpb24gbm9Qcm9wYWdhdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdGlmIChlLnByZXZlbnREZWZhdWx0KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKGUucmV0dXJuVmFsdWUgPSBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSBsaXN0ZW5lcnNcclxuXHRcdFx0XHRcdHRoaXMubGlzdGVuZXJzID0gW1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogdGhpcy5lbGVtZW50LFxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50czoge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ3N0YXJ0OiBmdW5jdGlvbiBkcmFnc3RhcnQoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2RyYWdzdGFydCcsIGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGRyYWdlbnRlcjogZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bm9Qcm9wYWdhdGlvbihlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnZW50ZXInLCBlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBNYWtlcyBpdCBwb3NzaWJsZSB0byBkcmFnIGZpbGVzIGZyb20gY2hyb21lJ3MgZG93bmxvYWQgYmFyXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk1MjY0MzAvZHJhZy1hbmQtZHJvcC1maWxlLXVwbG9hZHMtZnJvbS1jaHJvbWUtZG93bmxvYWRzLWJhclxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUcnkgaXMgcmVxdWlyZWQgdG8gcHJldmVudCBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTEgKFNDUklQVDY1NTM1IGV4Y2VwdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGVmY3QgPSB2b2lkIDA7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWZjdCA9IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnID09PSBlZmN0IHx8ICdsaW5rTW92ZScgPT09IGVmY3QgPyAnbW92ZScgOiAnY29weSc7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRub1Byb3BhZ2F0aW9uKGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2RyYWdvdmVyJywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2xlYXZlOiBmdW5jdGlvbiBkcmFnbGVhdmUoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2RyYWdsZWF2ZScsIGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGRyb3A6IGZ1bmN0aW9uIGRyb3AoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRub1Byb3BhZ2F0aW9uKGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmRyb3AoZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2VuZDogZnVuY3Rpb24gZHJhZ2VuZChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ2VuZCcsIGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGRpc2FibGVkIHJpZ2h0IG5vdywgYmVjYXVzZSB0aGUgYnJvd3NlcnMgZG9uJ3QgaW1wbGVtZW50IGl0IHByb3Blcmx5LlxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gXCJwYXN0ZVwiOiAoZSkgPT5cclxuXHRcdFx0XHRcdFx0XHRcdC8vICAgbm9Qcm9wYWdhdGlvbiBlXHJcblx0XHRcdFx0XHRcdFx0XHQvLyAgIEBwYXN0ZSBlXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdF07XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNsaWNrYWJsZUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5saXN0ZW5lcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogY2xpY2thYmxlRWxlbWVudCxcclxuXHRcdFx0XHRcdFx0XHRldmVudHM6IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNsaWNrOiBmdW5jdGlvbiBjbGljayhldnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSB0aGUgYWN0dWFsIGRyb3B6b25lIG9yIHRoZSBtZXNzYWdlIGVsZW1lbnQgc2hvdWxkIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb25cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsaWNrYWJsZUVsZW1lbnQgIT09IF90aGlzMy5lbGVtZW50IHx8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZ0LnRhcmdldCA9PT0gX3RoaXMzLmVsZW1lbnQgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHREcm9wem9uZS5lbGVtZW50SW5zaWRlKGV2dC50YXJnZXQsIF90aGlzMy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1tZXNzYWdlJykpXHJcblx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuY2xpY2soKTsgLy8gRm9yd2FyZCB0aGUgY2xpY2tcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmVuYWJsZSgpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuaW5pdC5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIE5vdCBmdWxseSB0ZXN0ZWQgeWV0XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdkZXN0cm95JyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGlzYWJsZSgpO1xyXG5cdFx0XHRcdFx0dGhpcy5yZW1vdmVBbGxGaWxlcyh0cnVlKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmhpZGRlbkZpbGVJbnB1dCAhPSBudWxsID8gdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZSA6IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcclxuXHRcdFx0XHRcdFx0dGhpcy5oaWRkZW5GaWxlSW5wdXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kcm9wem9uZTtcclxuXHRcdFx0XHRcdHJldHVybiBEcm9wem9uZS5pbnN0YW5jZXMuc3BsaWNlKERyb3B6b25lLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpLCAxKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAndXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSB7XHJcblx0XHRcdFx0XHR2YXIgdG90YWxVcGxvYWRQcm9ncmVzcyA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdHZhciB0b3RhbEJ5dGVzU2VudCA9IDA7XHJcblx0XHRcdFx0XHR2YXIgdG90YWxCeXRlcyA9IDA7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGFjdGl2ZUZpbGVzID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChhY3RpdmVGaWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTIgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCksXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTEyID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMTIgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTIgPSBfaXNBcnJheTEyID8gX2l0ZXJhdG9yMTIgOiBfaXRlcmF0b3IxMltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTEyID49IF9pdGVyYXRvcjEyLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTEgPSBfaXRlcmF0b3IxMltfaTEyKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTEyID0gX2l0ZXJhdG9yMTIubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTIuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTEgPSBfaTEyLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMTE7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHRvdGFsQnl0ZXNTZW50ICs9IGZpbGUudXBsb2FkLmJ5dGVzU2VudDtcclxuXHRcdFx0XHRcdFx0XHR0b3RhbEJ5dGVzICs9IGZpbGUudXBsb2FkLnRvdGFsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAoMTAwICogdG90YWxCeXRlc1NlbnQpIC8gdG90YWxCeXRlcztcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAxMDA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgndG90YWx1cGxvYWRwcm9ncmVzcycsIHRvdGFsVXBsb2FkUHJvZ3Jlc3MsIHRvdGFsQnl0ZXMsIHRvdGFsQnl0ZXNTZW50KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBAb3B0aW9ucy5wYXJhbU5hbWUgY2FuIGJlIGEgZnVuY3Rpb24gdGFraW5nIG9uZSBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYSBzdHJpbmcuXHJcblx0XHRcdFx0Ly8gQSBwYXJhbWV0ZXIgbmFtZSBmb3IgYSBmaWxlIGlzIG9idGFpbmVkIHNpbXBseSBieSBjYWxsaW5nIHRoaXMgd2l0aCBhbiBpbmRleCBudW1iZXIuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfZ2V0UGFyYW1OYW1lJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldFBhcmFtTmFtZShuKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUobik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJycgKyB0aGlzLm9wdGlvbnMucGFyYW1OYW1lICsgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSA/ICdbJyArIG4gKyAnXScgOiAnJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gSWYgQG9wdGlvbnMucmVuYW1lRmlsZSBpcyBhIGZ1bmN0aW9uLFxyXG5cdFx0XHRcdC8vIHRoZSBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgdG8gcmVuYW1lIHRoZSBmaWxlLm5hbWUgYmVmb3JlIGFwcGVuZGluZyBpdCB0byB0aGUgZm9ybURhdGFcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19yZW5hbWVGaWxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3JlbmFtZUZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucmVuYW1lRmlsZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5uYW1lO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJldHVybnMgYSBmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgZmFsbGJhY2sgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBEcmFnbkRyb3BcclxuXHRcdFx0XHQvL1xyXG5cdFx0XHRcdC8vIElmIHRoZSBkcm9wem9uZSBpcyBhbHJlYWR5IGEgZm9ybSwgb25seSB0aGUgaW5wdXQgZmllbGQgYW5kIGJ1dHRvbiBhcmUgcmV0dXJuZWQuIE90aGVyd2lzZSBhIGNvbXBsZXRlIGZvcm0gZWxlbWVudCBpcyBwcm92aWRlZC5cclxuXHRcdFx0XHQvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRGYWxsYmFja0Zvcm0nLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRGYWxsYmFja0Zvcm0oKSB7XHJcblx0XHRcdFx0XHR2YXIgZXhpc3RpbmdGYWxsYmFjayA9IHZvaWQgMCxcclxuXHRcdFx0XHRcdFx0Zm9ybSA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdGlmICgoZXhpc3RpbmdGYWxsYmFjayA9IHRoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZXhpc3RpbmdGYWxsYmFjaztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgZmllbGRzU3RyaW5nID0gJzxkaXYgY2xhc3M9XCJkei1mYWxsYmFja1wiPic7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQpIHtcclxuXHRcdFx0XHRcdFx0ZmllbGRzU3RyaW5nICs9ICc8cD4nICsgdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQgKyAnPC9wPic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRmaWVsZHNTdHJpbmcgKz1cclxuXHRcdFx0XHRcdFx0JzxpbnB1dCB0eXBlPVwiZmlsZVwiIG5hbWU9XCInICtcclxuXHRcdFx0XHRcdFx0dGhpcy5fZ2V0UGFyYW1OYW1lKDApICtcclxuXHRcdFx0XHRcdFx0J1wiICcgK1xyXG5cdFx0XHRcdFx0XHQodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiB1bmRlZmluZWQpICtcclxuXHRcdFx0XHRcdFx0JyAvPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJVcGxvYWQhXCI+PC9kaXY+JztcclxuXHJcblx0XHRcdFx0XHR2YXIgZmllbGRzID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChmaWVsZHNTdHJpbmcpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudC50YWdOYW1lICE9PSAnRk9STScpIHtcclxuXHRcdFx0XHRcdFx0Zm9ybSA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0XHRcdFx0Jzxmb3JtIGFjdGlvbj1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnVybCArXHJcblx0XHRcdFx0XHRcdFx0XHQnXCIgZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiBtZXRob2Q9XCInICtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5tZXRob2QgK1xyXG5cdFx0XHRcdFx0XHRcdFx0J1wiPjwvZm9ybT4nXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBlbmN0eXBlIGFuZCBtZXRob2QgYXR0cmlidXRlcyBhcmUgc2V0IHByb3Blcmx5XHJcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZXRob2QnLCB0aGlzLm9wdGlvbnMubWV0aG9kKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBmb3JtICE9IG51bGwgPyBmb3JtIDogZmllbGRzO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJldHVybnMgdGhlIGZhbGxiYWNrIGVsZW1lbnRzIGlmIHRoZXkgZXhpc3QgYWxyZWFkeVxyXG5cdFx0XHRcdC8vXHJcblx0XHRcdFx0Ly8gVGhpcyBjb2RlIGhhcyB0byBwYXNzIGluIElFNyA6KFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0RXhpc3RpbmdGYWxsYmFjaycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEV4aXN0aW5nRmFsbGJhY2soKSB7XHJcblx0XHRcdFx0XHR2YXIgZ2V0RmFsbGJhY2sgPSBmdW5jdGlvbiBnZXRGYWxsYmFjayhlbGVtZW50cykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMyA9IGVsZW1lbnRzLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxMyA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRfaTEzID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjEzID0gX2lzQXJyYXkxMyA/IF9pdGVyYXRvcjEzIDogX2l0ZXJhdG9yMTNbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMTI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTEzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMyA+PSBfaXRlcmF0b3IxMy5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEyID0gX2l0ZXJhdG9yMTNbX2kxMysrXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0X2kxMyA9IF9pdGVyYXRvcjEzLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTEzLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEyID0gX2kxMy52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBlbCA9IF9yZWYxMjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKC8oXnwgKWZhbGxiYWNrKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgX2FyciA9IFsnZGl2JywgJ2Zvcm0nXTtcclxuXHRcdFx0XHRcdGZvciAodmFyIF9pMTQgPSAwOyBfaTE0IDwgX2Fyci5sZW5ndGg7IF9pMTQrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgdGFnTmFtZSA9IF9hcnJbX2kxNF07XHJcblx0XHRcdFx0XHRcdHZhciBmYWxsYmFjaztcclxuXHRcdFx0XHRcdFx0aWYgKChmYWxsYmFjayA9IGdldEZhbGxiYWNrKHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSkpKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbGxiYWNrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gQWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3NldHVwRXZlbnRMaXN0ZW5lcnMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcChmdW5jdGlvbihlbGVtZW50TGlzdGVuZXJzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XHJcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdFx0XHRcdH0pKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBEZWFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdyZW1vdmVFdmVudExpc3RlbmVycycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcChmdW5jdGlvbihlbGVtZW50TGlzdGVuZXJzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XHJcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdFx0XHRcdH0pKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGNhbmNlbHMgYWxsIGZpbGVzIGluIHRoZSBxdWV1ZSBvciBiZWluZyBwcm9jZXNzZWQuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdkaXNhYmxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWNsaWNrYWJsZScpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXMubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzNC5jYW5jZWxVcGxvYWQoZmlsZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZW5hYmxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xyXG5cdFx0XHRcdFx0dGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotY2xpY2thYmxlJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBSZXR1cm5zIGEgbmljZWx5IGZvcm1hdHRlZCBmaWxlc2l6ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZmlsZXNpemUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBmaWxlc2l6ZShzaXplKSB7XHJcblx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRTaXplID0gMDtcclxuXHRcdFx0XHRcdHZhciBzZWxlY3RlZFVuaXQgPSAnYic7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHNpemUgPiAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciB1bml0cyA9IFsndGInLCAnZ2InLCAnbWInLCAna2InLCAnYiddO1xyXG5cclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1bml0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciB1bml0ID0gdW5pdHNbaV07XHJcblx0XHRcdFx0XHRcdFx0dmFyIGN1dG9mZiA9IE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKSAvIDEwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoc2l6ZSA+PSBjdXRvZmYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkU2l6ZSA9IHNpemUgLyBNYXRoLnBvdyh0aGlzLm9wdGlvbnMuZmlsZXNpemVCYXNlLCA0IC0gaSk7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZFVuaXQgPSB1bml0O1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRzZWxlY3RlZFNpemUgPSBNYXRoLnJvdW5kKDEwICogc2VsZWN0ZWRTaXplKSAvIDEwOyAvLyBDdXR0aW5nIG9mIGRpZ2l0c1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiAnPHN0cm9uZz4nICsgc2VsZWN0ZWRTaXplICsgJzwvc3Ryb25nPiAnICsgdGhpcy5vcHRpb25zLmRpY3RGaWxlU2l6ZVVuaXRzW3NlbGVjdGVkVW5pdF07XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gQWRkcyBvciByZW1vdmVzIHRoZSBgZHotbWF4LWZpbGVzLXJlYWNoZWRgIGNsYXNzIGZyb20gdGhlIGZvcm0uXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID09PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ21heGZpbGVzcmVhY2hlZCcsIHRoaXMuZmlsZXMpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotbWF4LWZpbGVzLXJlYWNoZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotbWF4LWZpbGVzLXJlYWNoZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZHJvcCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRyb3AoZSkge1xyXG5cdFx0XHRcdFx0aWYgKCFlLmRhdGFUcmFuc2Zlcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ2Ryb3AnLCBlKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgZmlsZXMgPSBlLmRhdGFUcmFuc2Zlci5maWxlcztcclxuXHJcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ2FkZGVkZmlsZXMnLCBmaWxlcyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRXZlbiBpZiBpdCdzIGEgZm9sZGVyLCBmaWxlcy5sZW5ndGggd2lsbCBjb250YWluIHRoZSBmb2xkZXJzLlxyXG5cdFx0XHRcdFx0aWYgKGZpbGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgaXRlbXMgPSBlLmRhdGFUcmFuc2Zlci5pdGVtcztcclxuXHJcblx0XHRcdFx0XHRcdGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggJiYgaXRlbXNbMF0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgZHJvcHBpbmcgb2YgZm9sZGVycywgc28gaGFuZGxlIGl0ZW1zIGluc3RlYWQgb2YgZmlsZXNcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVGaWxlcyhmaWxlcyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncGFzdGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBwYXN0ZShlKSB7XHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdF9fZ3VhcmRfXyhlICE9IG51bGwgPyBlLmNsaXBib2FyZERhdGEgOiB1bmRlZmluZWQsIGZ1bmN0aW9uKHgpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4geC5pdGVtcztcclxuXHRcdFx0XHRcdFx0fSkgPT0gbnVsbFxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ3Bhc3RlJywgZSk7XHJcblx0XHRcdFx0XHR2YXIgaXRlbXMgPSBlLmNsaXBib2FyZERhdGEuaXRlbXM7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGl0ZW1zLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdoYW5kbGVGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUZpbGVzKGZpbGVzKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXM1ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZmlsZXMubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzNS5hZGRGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gV2hlbiBhIGZvbGRlciBpcyBkcm9wcGVkIChvciBmaWxlcyBhcmUgcGFzdGVkKSwgaXRlbXMgbXVzdCBiZSBoYW5kbGVkXHJcblx0XHRcdFx0Ly8gaW5zdGVhZCBvZiBmaWxlcy5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19hZGRGaWxlc0Zyb21JdGVtcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcykge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzNiA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNCA9IGl0ZW1zLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxNCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRfaTE1ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE0ID0gX2lzQXJyYXkxNCA/IF9pdGVyYXRvcjE0IDogX2l0ZXJhdG9yMTRbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMTM7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxNSA+PSBfaXRlcmF0b3IxNC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEzID0gX2l0ZXJhdG9yMTRbX2kxNSsrXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0X2kxNSA9IF9pdGVyYXRvcjE0Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTE1LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEzID0gX2kxNS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpdGVtID0gX3JlZjEzO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgZW50cnk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsICYmIChlbnRyeSA9IGl0ZW0ud2Via2l0R2V0QXNFbnRyeSgpKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGVudHJ5LmlzRmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEFwcGVuZCBhbGwgZmlsZXMgZnJvbSB0aGF0IGRpcmVjdG9yeSB0byBmaWxlc1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgZW50cnkubmFtZSkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godW5kZWZpbmVkKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGl0ZW0uZ2V0QXNGaWxlICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChpdGVtLmtpbmQgPT0gbnVsbCB8fCBpdGVtLmtpbmQgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0XHRcdFx0fSkoKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBHb2VzIHRocm91Z2ggdGhlIGRpcmVjdG9yeSwgYW5kIGFkZHMgZWFjaCBmaWxlIGl0IGZpbmRzIHJlY3Vyc2l2ZWx5XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfYWRkRmlsZXNGcm9tRGlyZWN0b3J5JyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2FkZEZpbGVzRnJvbURpcmVjdG9yeShkaXJlY3RvcnksIHBhdGgpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczcgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHZhciBkaXJSZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX19ndWFyZE1ldGhvZF9fKGNvbnNvbGUsICdsb2cnLCBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG8ubG9nKGVycm9yKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciByZWFkRW50cmllcyA9IGZ1bmN0aW9uIHJlYWRFbnRyaWVzKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlyUmVhZGVyLnJlYWRFbnRyaWVzKGZ1bmN0aW9uKGVudHJpZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZW50cmllcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTUgPSBlbnRyaWVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTUgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTYgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE1ID0gX2lzQXJyYXkxNSA/IF9pdGVyYXRvcjE1IDogX2l0ZXJhdG9yMTVbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMTQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTE2ID49IF9pdGVyYXRvcjE1Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjE0ID0gX2l0ZXJhdG9yMTVbX2kxNisrXTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaTE2ID0gX2l0ZXJhdG9yMTUubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTE2LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWYxNCA9IF9pMTYudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlbnRyeSA9IF9yZWYxNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlbnRyeS5pc0ZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbnRyeS5maWxlKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfdGhpczcub3B0aW9ucy5pZ25vcmVIaWRkZW5GaWxlcyAmJiBmaWxlLm5hbWUuc3Vic3RyaW5nKDAsIDEpID09PSAnLicpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsZS5mdWxsUGF0aCA9IHBhdGggKyAnLycgKyBmaWxlLm5hbWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM3LmFkZEZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczcuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgcGF0aCArICcvJyArIGVudHJ5Lm5hbWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmVjdXJzaXZlbHkgY2FsbCByZWFkRW50cmllcygpIGFnYWluLCBzaW5jZSBicm93c2VyIG9ubHkgaGFuZGxlXHJcblx0XHRcdFx0XHRcdFx0XHQvLyB0aGUgZmlyc3QgMTAwIGVudHJpZXMuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9EaXJlY3RvcnlSZWFkZXIjcmVhZEVudHJpZXNcclxuXHRcdFx0XHRcdFx0XHRcdHJlYWRFbnRyaWVzKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFx0XHR9LCBlcnJvckhhbmRsZXIpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gcmVhZEVudHJpZXMoKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBJZiBgZG9uZSgpYCBpcyBjYWxsZWQgd2l0aG91dCBhcmd1bWVudCB0aGUgZmlsZSBpcyBhY2NlcHRlZFxyXG5cdFx0XHRcdC8vIElmIHlvdSBjYWxsIGl0IHdpdGggYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWRcclxuXHRcdFx0XHQvLyAoVGhpcyBhbGxvd3MgZm9yIGFzeW5jaHJvbm91cyB2YWxpZGF0aW9uKVxyXG5cdFx0XHRcdC8vXHJcblx0XHRcdFx0Ly8gVGhpcyBmdW5jdGlvbiBjaGVja3MgdGhlIGZpbGVzaXplLCBhbmQgaWYgdGhlIGZpbGUudHlwZSBwYXNzZXMgdGhlXHJcblx0XHRcdFx0Ly8gYGFjY2VwdGVkRmlsZXNgIGNoZWNrLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnYWNjZXB0JyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gYWNjZXB0KGZpbGUsIGRvbmUpIHtcclxuXHRcdFx0XHRcdGlmIChmaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUgKiAxMDI0ICogMTAyNCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZGljdEZpbGVUb29CaWdcclxuXHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKCd7e2ZpbGVzaXplfX0nLCBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQgLyAxMC4yNCkgLyAxMDApXHJcblx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgne3ttYXhGaWxlc2l6ZX19JywgdGhpcy5vcHRpb25zLm1heEZpbGVzaXplKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghRHJvcHpvbmUuaXNWYWxpZEZpbGUoZmlsZSwgdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKHRoaXMub3B0aW9ucy5kaWN0SW52YWxpZEZpbGVUeXBlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xyXG5cdFx0XHRcdFx0XHRkb25lKHRoaXMub3B0aW9ucy5kaWN0TWF4RmlsZXNFeGNlZWRlZC5yZXBsYWNlKCd7e21heEZpbGVzfX0nLCB0aGlzLm9wdGlvbnMubWF4RmlsZXMpKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgnbWF4ZmlsZXNleGNlZWRlZCcsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5hY2NlcHQuY2FsbCh0aGlzLCBmaWxlLCBkb25lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnYWRkRmlsZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGFkZEZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzOCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0ZmlsZS51cGxvYWQgPSB7XHJcblx0XHRcdFx0XHRcdHV1aWQ6IERyb3B6b25lLnV1aWR2NCgpLFxyXG5cdFx0XHRcdFx0XHRwcm9ncmVzczogMCxcclxuXHRcdFx0XHRcdFx0Ly8gU2V0dGluZyB0aGUgdG90YWwgdXBsb2FkIHNpemUgdG8gZmlsZS5zaXplIGZvciB0aGUgYmVnaW5uaW5nXHJcblx0XHRcdFx0XHRcdC8vIEl0J3MgYWN0dWFsIGRpZmZlcmVudCB0aGFuIHRoZSBzaXplIHRvIGJlIHRyYW5zbWl0dGVkLlxyXG5cdFx0XHRcdFx0XHR0b3RhbDogZmlsZS5zaXplLFxyXG5cdFx0XHRcdFx0XHRieXRlc1NlbnQ6IDAsXHJcblx0XHRcdFx0XHRcdGZpbGVuYW1lOiB0aGlzLl9yZW5hbWVGaWxlKGZpbGUpLFxyXG5cdFx0XHRcdFx0XHRjaHVua2VkOiB0aGlzLm9wdGlvbnMuY2h1bmtpbmcgJiYgKHRoaXMub3B0aW9ucy5mb3JjZUNodW5raW5nIHx8IGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5jaHVua1NpemUpLFxyXG5cdFx0XHRcdFx0XHR0b3RhbENodW5rQ291bnQ6IE1hdGguY2VpbChmaWxlLnNpemUgLyB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKSxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR0aGlzLmZpbGVzLnB1c2goZmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5BRERFRDtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ2FkZGVkZmlsZScsIGZpbGUpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX2VucXVldWVUaHVtYm5haWwoZmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYWNjZXB0KGZpbGUsIGZ1bmN0aW9uKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUuYWNjZXB0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpczguX2Vycm9yUHJvY2Vzc2luZyhbZmlsZV0sIGVycm9yKTsgLy8gV2lsbCBzZXQgdGhlIGZpbGUuc3RhdHVzXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5hY2NlcHRlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF90aGlzOC5vcHRpb25zLmF1dG9RdWV1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXM4LmVucXVldWVGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdH0gLy8gV2lsbCBzZXQgLmFjY2VwdGVkID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczguX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBXcmFwcGVyIGZvciBlbnF1ZXVlRmlsZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZW5xdWV1ZUZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5xdWV1ZUZpbGVzKGZpbGVzKSB7XHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTYgPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTE2ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRfaTE3ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxNiA9IF9pc0FycmF5MTYgPyBfaXRlcmF0b3IxNiA6IF9pdGVyYXRvcjE2W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjE1O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTYpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxNyA+PSBfaXRlcmF0b3IxNi5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxNSA9IF9pdGVyYXRvcjE2W19pMTcrK107XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X2kxNyA9IF9pdGVyYXRvcjE2Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxNy5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMTUgPSBfaTE3LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYxNTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZW5xdWV1ZUZpbGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbnF1ZXVlRmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXM5ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLkFEREVEICYmIGZpbGUuYWNjZXB0ZWQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5RVUVVRUQ7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOS5wcm9jZXNzUXVldWUoKTtcclxuXHRcdFx0XHRcdFx0XHR9LCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoaXMgZmlsZSBjYW4ndCBiZSBxdWV1ZWQgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCBvciB3YXMgcmVqZWN0ZWQuXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfZW5xdWV1ZVRodW1ibmFpbCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczEwID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5jcmVhdGVJbWFnZVRodW1ibmFpbHMgJiZcclxuXHRcdFx0XHRcdFx0ZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykgJiZcclxuXHRcdFx0XHRcdFx0ZmlsZS5zaXplIDw9IHRoaXMub3B0aW9ucy5tYXhUaHVtYm5haWxGaWxlc2l6ZSAqIDEwMjQgKiAxMDI0XHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdGh1bWJuYWlsUXVldWUucHVzaChmaWxlKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTAuX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpO1xyXG5cdFx0XHRcdFx0XHR9LCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19wcm9jZXNzVGh1bWJuYWlsUXVldWUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTEgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsIHx8IHRoaXMuX3RodW1ibmFpbFF1ZXVlLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IHRydWU7XHJcblx0XHRcdFx0XHR2YXIgZmlsZSA9IHRoaXMuX3RodW1ibmFpbFF1ZXVlLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoXHJcblx0XHRcdFx0XHRcdGZpbGUsXHJcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy50aHVtYm5haWxXaWR0aCxcclxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbEhlaWdodCxcclxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbE1ldGhvZCxcclxuXHRcdFx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oZGF0YVVybCkge1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzMTEuZW1pdCgndGh1bWJuYWlsJywgZmlsZSwgZGF0YVVybCk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMxMS5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczExLl9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBDYW4gYmUgY2FsbGVkIGJ5IHRoZSB1c2VyIHRvIHJlbW92ZSBhIGZpbGVcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3JlbW92ZUZpbGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW1vdmVGaWxlKGZpbGUpIHtcclxuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2FuY2VsVXBsb2FkKGZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5maWxlcyA9IHdpdGhvdXQodGhpcy5maWxlcywgZmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdyZW1vdmVkZmlsZScsIGZpbGUpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZmlsZXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVtaXQoJ3Jlc2V0Jyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlcyBhbGwgZmlsZXMgdGhhdCBhcmVuJ3QgY3VycmVudGx5IHByb2Nlc3NlZCBmcm9tIHRoZSBsaXN0XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdyZW1vdmVBbGxGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUFsbEZpbGVzKGNhbmNlbElmTmVjZXNzYXJ5KSB7XHJcblx0XHRcdFx0XHQvLyBDcmVhdGUgYSBjb3B5IG9mIGZpbGVzIHNpbmNlIHJlbW92ZUZpbGUoKSBjaGFuZ2VzIHRoZSBAZmlsZXMgYXJyYXkuXHJcblx0XHRcdFx0XHRpZiAoY2FuY2VsSWZOZWNlc3NhcnkgPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRjYW5jZWxJZk5lY2Vzc2FyeSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE3ID0gdGhpcy5maWxlcy5zbGljZSgpLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MTcgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMTggPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE3ID0gX2lzQXJyYXkxNyA/IF9pdGVyYXRvcjE3IDogX2l0ZXJhdG9yMTdbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMTY7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTE4ID49IF9pdGVyYXRvcjE3Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjE2ID0gX2l0ZXJhdG9yMTdbX2kxOCsrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTE4ID0gX2l0ZXJhdG9yMTcubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTE4LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxNiA9IF9pMTgudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjE2O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUuc3RhdHVzICE9PSBEcm9wem9uZS5VUExPQURJTkcgfHwgY2FuY2VsSWZOZWNlc3NhcnkpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJlc2l6ZXMgYW4gaW1hZ2UgYmVmb3JlIGl0IGdldHMgc2VudCB0byB0aGUgc2VydmVyLiBUaGlzIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mXHJcblx0XHRcdFx0Ly8gYG9wdGlvbnMudHJhbnNmb3JtRmlsZWAgaWYgYHJlc2l6ZVdpZHRoYCBvciBgcmVzaXplSGVpZ2h0YCBhcmUgc2V0LiBUaGUgY2FsbGJhY2sgaXMgaW52b2tlZCB3aXRoXHJcblx0XHRcdFx0Ly8gdGhlIHJlc2l6ZWQgYmxvYi5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3Jlc2l6ZUltYWdlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVzaXplSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTIgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZhbHNlLCBmdW5jdGlvbihkYXRhVXJsLCBjYW52YXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNhbnZhcyA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIFRoZSBpbWFnZSBoYXMgbm90IGJlZW4gcmVzaXplZFxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhmaWxlKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplTWltZVR5cGUgPSBfdGhpczEyLm9wdGlvbnMucmVzaXplTWltZVR5cGU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNpemVNaW1lVHlwZSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVNaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dmFyIHJlc2l6ZWREYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChyZXNpemVNaW1lVHlwZSwgX3RoaXMxMi5vcHRpb25zLnJlc2l6ZVF1YWxpdHkpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNpemVNaW1lVHlwZSA9PT0gJ2ltYWdlL2pwZWcnIHx8IHJlc2l6ZU1pbWVUeXBlID09PSAnaW1hZ2UvanBnJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm93IGFkZCB0aGUgb3JpZ2luYWwgRVhJRiBpbmZvcm1hdGlvblxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplZERhdGFVUkwgPSBFeGlmUmVzdG9yZS5yZXN0b3JlKGZpbGUuZGF0YVVSTCwgcmVzaXplZERhdGFVUkwpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soRHJvcHpvbmUuZGF0YVVSSXRvQmxvYihyZXNpemVkRGF0YVVSTCkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnY3JlYXRlVGh1bWJuYWlsJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZml4T3JpZW50YXRpb24sIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMxMyA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuXHRcdFx0XHRcdGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGZpbGUuZGF0YVVSTCA9IGZpbGVSZWFkZXIucmVzdWx0O1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgYm90aGVyIGNyZWF0aW5nIGEgdGh1bWJuYWlsIGZvciBTVkcgaW1hZ2VzIHNpbmNlIHRoZXkncmUgdmVjdG9yXHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLnR5cGUgPT09ICdpbWFnZS9zdmcreG1sJykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjayhmaWxlUmVhZGVyLnJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjayk7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2NyZWF0ZVRodW1ibmFpbEZyb21VcmwnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVUaHVtYm5haWxGcm9tVXJsKFxyXG5cdFx0XHRcdFx0ZmlsZSxcclxuXHRcdFx0XHRcdHdpZHRoLFxyXG5cdFx0XHRcdFx0aGVpZ2h0LFxyXG5cdFx0XHRcdFx0cmVzaXplTWV0aG9kLFxyXG5cdFx0XHRcdFx0Zml4T3JpZW50YXRpb24sXHJcblx0XHRcdFx0XHRjYWxsYmFjayxcclxuXHRcdFx0XHRcdGNyb3NzT3JpZ2luXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMxNCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTm90IHVzaW5nIGBuZXcgSW1hZ2VgIGhlcmUgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBsYXRlc3QgQ2hyb21lIHZlcnNpb25zLlxyXG5cdFx0XHRcdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbnlvL2Ryb3B6b25lL3B1bGwvMjI2XHJcblx0XHRcdFx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNyb3NzT3JpZ2luKSB7XHJcblx0XHRcdFx0XHRcdGltZy5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGxvYWRFeGlmID0gZnVuY3Rpb24gbG9hZEV4aWYoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soMSk7XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgRVhJRiAhPT0gJ3VuZGVmaW5lZCcgJiYgRVhJRiAhPT0gbnVsbCAmJiBmaXhPcmllbnRhdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdGxvYWRFeGlmID0gZnVuY3Rpb24gbG9hZEV4aWYoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBFWElGLmdldERhdGEoaW1nLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKEVYSUYuZ2V0VGFnKHRoaXMsICdPcmllbnRhdGlvbicpKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkRXhpZihmdW5jdGlvbihvcmllbnRhdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUud2lkdGggPSBpbWcud2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplSW5mbyA9IF90aGlzMTQub3B0aW9ucy5yZXNpemUuY2FsbChfdGhpczE0LCBmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xyXG5cdFx0XHRcdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKG9yaWVudGF0aW9uID4gNCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XHJcblx0XHRcdFx0XHRcdFx0XHRjYW52YXMuaGVpZ2h0ID0gcmVzaXplSW5mby50cmdXaWR0aDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAob3JpZW50YXRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaG9yaXpvbnRhbCBmbGlwXHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAwKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKC0xLCAxKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDM6XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDE4MMKwIHJvdGF0ZSBsZWZ0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZShNYXRoLlBJKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDQ6XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHZlcnRpY2FsIGZsaXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZSgwLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKDEsIC0xKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDU6XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHZlcnRpY2FsIGZsaXAgKyA5MCByb3RhdGUgcmlnaHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKDEsIC0xKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDY6XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDkwwrAgcm90YXRlIHJpZ2h0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoMCwgLWNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaG9yaXpvbnRhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAtY2FudmFzLmhlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5zY2FsZSgtMSwgMSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyA5MMKwIHJvdGF0ZSBsZWZ0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoLTAuNSAqIE1hdGguUEkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKC1jYW52YXMud2lkdGgsIDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBidWdmaXggZm9yIGlPUycgc2NhbGluZyBidWcuXHJcblx0XHRcdFx0XHRcdFx0ZHJhd0ltYWdlSU9TRml4KFxyXG5cdFx0XHRcdFx0XHRcdFx0Y3R4LFxyXG5cdFx0XHRcdFx0XHRcdFx0aW1nLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNYICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1ggOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNZICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1kgOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNXaWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8uc3JjSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdYICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1ggOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdZICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1kgOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdXaWR0aCxcclxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8udHJnSGVpZ2h0XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIHRodW1ibmFpbCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRodW1ibmFpbCwgY2FudmFzKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRpbWcub25lcnJvciA9IGNhbGxiYWNrO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiAoaW1nLnNyYyA9IGZpbGUuZGF0YVVSTCk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gR29lcyB0aHJvdWdoIHRoZSBxdWV1ZSBhbmQgcHJvY2Vzc2VzIGZpbGVzIGlmIHRoZXJlIGFyZW4ndCB0b28gbWFueSBhbHJlYWR5LlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncHJvY2Vzc1F1ZXVlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc1F1ZXVlKCkge1xyXG5cdFx0XHRcdFx0dmFyIHBhcmFsbGVsVXBsb2FkcyA9IHRoaXMub3B0aW9ucy5wYXJhbGxlbFVwbG9hZHM7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NpbmdMZW5ndGggPSB0aGlzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoO1xyXG5cdFx0XHRcdFx0dmFyIGkgPSBwcm9jZXNzaW5nTGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZXJlIGFyZSBhbHJlYWR5IGF0IGxlYXN0IGFzIG1hbnkgZmlsZXMgdXBsb2FkaW5nIHRoYW4gc2hvdWxkIGJlXHJcblx0XHRcdFx0XHRpZiAocHJvY2Vzc2luZ0xlbmd0aCA+PSBwYXJhbGxlbFVwbG9hZHMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBxdWV1ZWRGaWxlcyA9IHRoaXMuZ2V0UXVldWVkRmlsZXMoKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIShxdWV1ZWRGaWxlcy5sZW5ndGggPiAwKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFx0XHQvLyBUaGUgZmlsZXMgc2hvdWxkIGJlIHVwbG9hZGVkIGluIG9uZSByZXF1ZXN0XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhxdWV1ZWRGaWxlcy5zbGljZSgwLCBwYXJhbGxlbFVwbG9hZHMgLSBwcm9jZXNzaW5nTGVuZ3RoKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR3aGlsZSAoaSA8IHBhcmFsbGVsVXBsb2Fkcykge1xyXG5cdFx0XHRcdFx0XHRcdGlmICghcXVldWVkRmlsZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fSAvLyBOb3RoaW5nIGxlZnQgdG8gcHJvY2Vzc1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvY2Vzc0ZpbGUocXVldWVkRmlsZXMuc2hpZnQoKSk7XHJcblx0XHRcdFx0XHRcdFx0aSsrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gV3JhcHBlciBmb3IgYHByb2Nlc3NGaWxlc2BcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3Byb2Nlc3NGaWxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0ZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc0ZpbGVzKFtmaWxlXSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gTG9hZHMgdGhlIGZpbGUsIHRoZW4gY2FsbHMgZmluaXNoZWRMb2FkaW5nKClcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3Byb2Nlc3NGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyhmaWxlcykge1xyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE4ID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxOCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kxOSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTggPSBfaXNBcnJheTE4ID8gX2l0ZXJhdG9yMTggOiBfaXRlcmF0b3IxOFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWYxNztcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE4KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTkgPj0gX2l0ZXJhdG9yMTgubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMTcgPSBfaXRlcmF0b3IxOFtfaTE5KytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pMTkgPSBfaXRlcmF0b3IxOC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTkuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjE3ID0gX2kxOS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMTc7XHJcblxyXG5cdFx0XHRcdFx0XHRmaWxlLnByb2Nlc3NpbmcgPSB0cnVlOyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxyXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLlVQTE9BRElORztcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgncHJvY2Vzc2luZycsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdwcm9jZXNzaW5nbXVsdGlwbGUnLCBmaWxlcyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMudXBsb2FkRmlsZXMoZmlsZXMpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfZ2V0RmlsZXNXaXRoWGhyJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldEZpbGVzV2l0aFhocih4aHIpIHtcclxuXHRcdFx0XHRcdHZhciBmaWxlcyA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdHJldHVybiAoZmlsZXMgPSB0aGlzLmZpbGVzXHJcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnhociA9PT0geGhyO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcclxuXHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIENhbmNlbHMgdGhlIGZpbGUgdXBsb2FkIGFuZCBzZXRzIHRoZSBzdGF0dXMgdG8gQ0FOQ0VMRURcclxuXHRcdFx0XHQvLyAqKmlmKiogdGhlIGZpbGUgaXMgYWN0dWFsbHkgYmVpbmcgdXBsb2FkZWQuXHJcblx0XHRcdFx0Ly8gSWYgaXQncyBzdGlsbCBpbiB0aGUgcXVldWUsIHRoZSBmaWxlIGlzIGJlaW5nIHJlbW92ZWQgZnJvbSBpdCBhbmQgdGhlIHN0YXR1c1xyXG5cdFx0XHRcdC8vIHNldCB0byBDQU5DRUxFRC5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2NhbmNlbFVwbG9hZCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGNhbmNlbFVwbG9hZChmaWxlKSB7XHJcblx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORykge1xyXG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBlZEZpbGVzID0gdGhpcy5fZ2V0RmlsZXNXaXRoWGhyKGZpbGUueGhyKTtcclxuXHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTkgPSBncm91cGVkRmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTE5ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjAgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTkgPSBfaXNBcnJheTE5ID8gX2l0ZXJhdG9yMTkgOiBfaXRlcmF0b3IxOVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxODtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIwID49IF9pdGVyYXRvcjE5Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTggPSBfaXRlcmF0b3IxOVtfaTIwKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTIwID0gX2l0ZXJhdG9yMTkubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjAuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTggPSBfaTIwLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwZWRGaWxlID0gX3JlZjE4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRncm91cGVkRmlsZS5zdGF0dXMgPSBEcm9wem9uZS5DQU5DRUxFRDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZpbGUueGhyICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUueGhyLmFib3J0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjAgPSBncm91cGVkRmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTIwID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjEgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjAgPSBfaXNBcnJheTIwID8gX2l0ZXJhdG9yMjAgOiBfaXRlcmF0b3IyMFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxOTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIxID49IF9pdGVyYXRvcjIwLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTkgPSBfaXRlcmF0b3IyMFtfaTIxKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTIxID0gX2l0ZXJhdG9yMjAubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjEuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTkgPSBfaTIxLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9ncm91cGVkRmlsZSA9IF9yZWYxOTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZCcsIF9ncm91cGVkRmlsZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY2FuY2VsZWRtdWx0aXBsZScsIGdyb3VwZWRGaWxlcyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLkFEREVEIHx8IGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5RVUVVRUQpIHtcclxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5DQU5DRUxFRDtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZCcsIGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZG11bHRpcGxlJywgW2ZpbGVdKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncmVzb2x2ZU9wdGlvbicsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVPcHRpb24ob3B0aW9uKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxO1xyXG5cdFx0XHRcdFx0XHRcdF9rZXkzIDwgX2xlbjM7XHJcblx0XHRcdFx0XHRcdFx0X2tleTMrK1xyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIG9wdGlvbjtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAndXBsb2FkRmlsZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwbG9hZEZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMudXBsb2FkRmlsZXMoW2ZpbGVdKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAndXBsb2FkRmlsZXMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1cGxvYWRGaWxlcyhmaWxlcykge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTUgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybUZpbGVzKGZpbGVzLCBmdW5jdGlvbih0cmFuc2Zvcm1lZEZpbGVzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgZmlsZSBzaG91bGQgYmUgc2VudCBpbiBjaHVua3MhXHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBjaHVua2luZyBvcHRpb24gaXMgc2V0LCB3ZSAqKmtub3cqKiB0aGF0IHRoZXJlIGNhbiBvbmx5IGJlICoqb25lKiogZmlsZSwgc2luY2VcclxuXHRcdFx0XHRcdFx0XHQvLyB1cGxvYWRNdWx0aXBsZSBpcyBub3QgYWxsb3dlZCB3aXRoIHRoaXMgb3B0aW9uLlxyXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gZmlsZXNbMF07XHJcblx0XHRcdFx0XHRcdFx0dmFyIHRyYW5zZm9ybWVkRmlsZSA9IHRyYW5zZm9ybWVkRmlsZXNbMF07XHJcblx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0ZWRDaHVua0NvdW50ID0gMDtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQuY2h1bmtzID0gW107XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBoYW5kbGVOZXh0Q2h1bmsgPSBmdW5jdGlvbiBoYW5kbGVOZXh0Q2h1bmsoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2h1bmtJbmRleCA9IDA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCBpdGVtIGluIGZpbGUudXBsb2FkLmNodW5rcyB0aGF0IGlzIG5vdCBkZWZpbmVkIHlldC5cclxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlIChmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVua0luZGV4Kys7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBtZWFucywgdGhhdCBhbGwgY2h1bmtzIGhhdmUgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2h1bmtJbmRleCA+PSBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpIHJldHVybjtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRzdGFydGVkQ2h1bmtDb3VudCsrO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBzdGFydCA9IGNodW5rSW5kZXggKiBfdGhpczE1Lm9wdGlvbnMuY2h1bmtTaXplO1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgX3RoaXMxNS5vcHRpb25zLmNodW5rU2l6ZSwgZmlsZS5zaXplKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgZGF0YUJsb2NrID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBfdGhpczE1Ll9nZXRQYXJhbU5hbWUoMCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD8gdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlKHN0YXJ0LCBlbmQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiB0cmFuc2Zvcm1lZEZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVuYW1lOiBmaWxlLnVwbG9hZC5maWxlbmFtZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y2h1bmtJbmRleDogY2h1bmtJbmRleCxcclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQuY2h1bmtzW2NodW5rSW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlOiBmaWxlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleDogY2h1bmtJbmRleCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YUJsb2NrOiBkYXRhQmxvY2ssIC8vIEluIGNhc2Ugd2Ugd2FudCB0byByZXRyeS5cclxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiBEcm9wem9uZS5VUExPQURJTkcsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHByb2dyZXNzOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXRyaWVzOiAwLCAvLyBUaGUgbnVtYmVyIG9mIHRpbWVzIHRoaXMgYmxvY2sgaGFzIGJlZW4gcmV0cmllZC5cclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMxNS5fdXBsb2FkRGF0YShmaWxlcywgW2RhdGFCbG9ja10pO1xyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQgPSBmdW5jdGlvbihjaHVuaykge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGFsbEZpbmlzaGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdGNodW5rLnN0YXR1cyA9IERyb3B6b25lLlNVQ0NFU1M7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2xlYXIgdGhlIGRhdGEgZnJvbSB0aGUgY2h1bmtcclxuXHRcdFx0XHRcdFx0XHRcdGNodW5rLmRhdGFCbG9jayA9IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaGFuZGxlTmV4dENodW5rKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXS5zdGF0dXMgIT09IERyb3B6b25lLlNVQ0NFU1MpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbGxGaW5pc2hlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGFsbEZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMTUub3B0aW9ucy5jaHVua3NVcGxvYWRlZChmaWxlLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczE1Ll9maW5pc2hlZChmaWxlcywgJycsIG51bGwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMxNS5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGhhbmRsZU5leHRDaHVuaygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVOZXh0Q2h1bmsoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGRhdGFCbG9ja3MgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBfaTIyID0gMDsgX2kyMiA8IGZpbGVzLmxlbmd0aDsgX2kyMisrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkYXRhQmxvY2tzW19pMjJdID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBfdGhpczE1Ll9nZXRQYXJhbU5hbWUoX2kyMiksXHJcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHRyYW5zZm9ybWVkRmlsZXNbX2kyMl0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVuYW1lOiBmaWxlc1tfaTIyXS51cGxvYWQuZmlsZW5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRfdGhpczE1Ll91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8vIFJldHVybnMgdGhlIHJpZ2h0IGNodW5rIGZvciBnaXZlbiBmaWxlIGFuZCB4aHJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19nZXRDaHVuaycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9nZXRDaHVuayhmaWxlLCB4aHIpIHtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS54aHIgPT09IHhocikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnVwbG9hZC5jaHVua3NbaV07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGFjdHVhbGx5IHVwbG9hZHMgdGhlIGZpbGUocykgdG8gdGhlIHNlcnZlci5cclxuXHRcdFx0XHQvLyBJZiBkYXRhQmxvY2tzIGNvbnRhaW5zIHRoZSBhY3R1YWwgZGF0YSB0byB1cGxvYWQgKG1lYW5pbmcsIHRoYXQgdGhpcyBjb3VsZCBlaXRoZXIgYmUgdHJhbnNmb3JtZWRcclxuXHRcdFx0XHQvLyBmaWxlcywgb3IgaW5kaXZpZHVhbCBjaHVua3MgZm9yIGNodW5rZWQgdXBsb2FkKS5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ191cGxvYWREYXRhJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczE2ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSBmaWxlIG9iamVjdHMgdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgaXQgbGF0ZXIuXHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjEgPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTIxID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRfaTIzID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyMSA9IF9pc0FycmF5MjEgPyBfaXRlcmF0b3IyMSA6IF9pdGVyYXRvcjIxW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjIwO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjEpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kyMyA+PSBfaXRlcmF0b3IyMS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyMCA9IF9pdGVyYXRvcjIxW19pMjMrK107XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X2kyMyA9IF9pdGVyYXRvcjIxLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kyMy5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMjAgPSBfaTIzLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYyMDtcclxuXHJcblx0XHRcdFx0XHRcdGZpbGUueGhyID0geGhyO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XHJcblx0XHRcdFx0XHRcdC8vIFB1dCB0aGUgeGhyIG9iamVjdCBpbiB0aGUgcmlnaHQgY2h1bmsgb2JqZWN0LCBzbyBpdCBjYW4gYmUgYXNzb2NpYXRlZCBsYXRlciwgYW5kIGZvdW5kIHdpdGggX2dldENodW5rXHJcblx0XHRcdFx0XHRcdGZpbGVzWzBdLnVwbG9hZC5jaHVua3NbZGF0YUJsb2Nrc1swXS5jaHVua0luZGV4XS54aHIgPSB4aHI7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIG1ldGhvZCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMubWV0aG9kLCBmaWxlcyk7XHJcblx0XHRcdFx0XHR2YXIgdXJsID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy51cmwsIGZpbGVzKTtcclxuXHRcdFx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuXHJcblx0XHRcdFx0XHQvLyBTZXR0aW5nIHRoZSB0aW1lb3V0IGFmdGVyIG9wZW4gYmVjYXVzZSBvZiBJRTExIGlzc3VlOiBodHRwczovL2dpdGxhYi5jb20vbWVuby9kcm9wem9uZS9pc3N1ZXMvOFxyXG5cdFx0XHRcdFx0eGhyLnRpbWVvdXQgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnRpbWVvdXQsIGZpbGVzKTtcclxuXHJcblx0XHRcdFx0XHQvLyBIYXMgdG8gYmUgYWZ0ZXIgYC5vcGVuKClgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvaXNzdWVzLzE3OVxyXG5cdFx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9ICEhdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuXHJcblx0XHRcdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRfdGhpczE2Ll9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0X3RoaXMxNi5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhocik7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIFNvbWUgYnJvd3NlcnMgZG8gbm90IGhhdmUgdGhlIC51cGxvYWQgcHJvcGVydHlcclxuXHRcdFx0XHRcdHZhciBwcm9ncmVzc09iaiA9IHhoci51cGxvYWQgIT0gbnVsbCA/IHhoci51cGxvYWQgOiB4aHI7XHJcblx0XHRcdFx0XHRwcm9ncmVzc09iai5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMxNi5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyLCBlKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dmFyIGhlYWRlcnMgPSB7XHJcblx0XHRcdFx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdFx0XHQnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScsXHJcblx0XHRcdFx0XHRcdCdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRcdERyb3B6b25lLmV4dGVuZChoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRcdHZhciBoZWFkZXJWYWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XHJcblx0XHRcdFx0XHRcdGlmIChoZWFkZXJWYWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEFkZGluZyBhbGwgQG9wdGlvbnMgcGFyYW1ldGVyc1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5wYXJhbXMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGFkZGl0aW9uYWxQYXJhbXMgPSB0aGlzLm9wdGlvbnMucGFyYW1zO1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFkZGl0aW9uYWxQYXJhbXMgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0XHRhZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcy5jYWxsKFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcyxcclxuXHRcdFx0XHRcdFx0XHRcdGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0eGhyLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgPyB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKSA6IG51bGxcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYWRkaXRpb25hbFBhcmFtcykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IGFkZGl0aW9uYWxQYXJhbXNba2V5XTtcclxuXHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBMZXQgdGhlIHVzZXIgYWRkIGFkZGl0aW9uYWwgZGF0YSBpZiBuZWNlc3NhcnlcclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMiA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjIgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMjQgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjIyID0gX2lzQXJyYXkyMiA/IF9pdGVyYXRvcjIyIDogX2l0ZXJhdG9yMjJbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMjE7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyMikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTI0ID49IF9pdGVyYXRvcjIyLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjIxID0gX2l0ZXJhdG9yMjJbX2kyNCsrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTI0ID0gX2l0ZXJhdG9yMjIubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTI0LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyMSA9IF9pMjQudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBfZmlsZSA9IF9yZWYyMTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnc2VuZGluZycsIF9maWxlLCB4aHIsIGZvcm1EYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzZW5kaW5nbXVsdGlwbGUnLCBmaWxlcywgeGhyLCBmb3JtRGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKTtcclxuXHJcblx0XHRcdFx0XHQvLyBGaW5hbGx5IGFkZCB0aGUgZmlsZXNcclxuXHRcdFx0XHRcdC8vIEhhcyB0byBiZSBsYXN0IGJlY2F1c2Ugc29tZSBzZXJ2ZXJzIChlZzogUzMpIGV4cGVjdCB0aGUgZmlsZSB0byBiZSB0aGUgbGFzdCBwYXJhbWV0ZXJcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUJsb2Nrcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgZGF0YUJsb2NrID0gZGF0YUJsb2Nrc1tpXTtcclxuXHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKGRhdGFCbG9jay5uYW1lLCBkYXRhQmxvY2suZGF0YSwgZGF0YUJsb2NrLmZpbGVuYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLnN1Ym1pdFJlcXVlc3QoeGhyLCBmb3JtRGF0YSwgZmlsZXMpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFRyYW5zZm9ybXMgYWxsIGZpbGVzIHdpdGggdGhpcy5vcHRpb25zLnRyYW5zZm9ybUZpbGUgYW5kIGludm9rZXMgZG9uZSB3aXRoIHRoZSB0cmFuc2Zvcm1lZCBmaWxlcyB3aGVuIGRvbmUuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfdHJhbnNmb3JtRmlsZXMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdHJhbnNmb3JtRmlsZXMoZmlsZXMsIGRvbmUpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczE3ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHR2YXIgdHJhbnNmb3JtZWRGaWxlcyA9IFtdO1xyXG5cdFx0XHRcdFx0Ly8gQ2x1bXN5IHdheSBvZiBoYW5kbGluZyBhc3luY2hyb25vdXMgY2FsbHMsIHVudGlsIEkgZ2V0IHRvIGFkZCBhIHByb3BlciBGdXR1cmUgbGlicmFyeS5cclxuXHRcdFx0XHRcdHZhciBkb25lQ291bnRlciA9IDA7XHJcblxyXG5cdFx0XHRcdFx0dmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xyXG5cdFx0XHRcdFx0XHRfdGhpczE3Lm9wdGlvbnMudHJhbnNmb3JtRmlsZS5jYWxsKF90aGlzMTcsIGZpbGVzW2ldLCBmdW5jdGlvbih0cmFuc2Zvcm1lZEZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2Zvcm1lZEZpbGVzW2ldID0gdHJhbnNmb3JtZWRGaWxlO1xyXG5cdFx0XHRcdFx0XHRcdGlmICgrK2RvbmVDb3VudGVyID09PSBmaWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRvbmUodHJhbnNmb3JtZWRGaWxlcyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRfbG9vcChpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBUYWtlcyBjYXJlIG9mIGFkZGluZyBvdGhlciBpbnB1dCBlbGVtZW50cyBvZiB0aGUgZm9ybSB0byB0aGUgQUpBWCByZXF1ZXN0XHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfYWRkRm9ybUVsZW1lbnREYXRhJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2FkZEZvcm1FbGVtZW50RGF0YShmb3JtRGF0YSkge1xyXG5cdFx0XHRcdFx0Ly8gVGFrZSBjYXJlIG9mIG90aGVyIGlucHV0IGVsZW1lbnRzXHJcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdGT1JNJykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJyksXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTIzID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjUgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjMgPSBfaXNBcnJheTIzID8gX2l0ZXJhdG9yMjMgOiBfaXRlcmF0b3IyM1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyMjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI1ID49IF9pdGVyYXRvcjIzLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjIgPSBfaXRlcmF0b3IyM1tfaTI1KytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTI1ID0gX2l0ZXJhdG9yMjMubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjUuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjIgPSBfaTI1LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGlucHV0ID0gX3JlZjIyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgaW5wdXROYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGlucHV0VHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChpbnB1dFR5cGUpIGlucHV0VHlwZSA9IGlucHV0VHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgaW5wdXQgZG9lc24ndCBoYXZlIGEgbmFtZSwgd2UgY2FuJ3QgdXNlIGl0LlxyXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgaW5wdXROYW1lID09PSAndW5kZWZpbmVkJyB8fCBpbnB1dE5hbWUgPT09IG51bGwpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQudGFnTmFtZSA9PT0gJ1NFTEVDVCcgJiYgaW5wdXQuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBQb3NzaWJseSBtdWx0aXBsZSB2YWx1ZXNcclxuXHRcdFx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNCA9IGlucHV0Lm9wdGlvbnMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyNCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kyNiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjQgPSBfaXNBcnJheTI0ID8gX2l0ZXJhdG9yMjQgOiBfaXRlcmF0b3IyNFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyMztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjYgPj0gX2l0ZXJhdG9yMjQubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMjMgPSBfaXRlcmF0b3IyNFtfaTI2KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pMjYgPSBfaXRlcmF0b3IyNC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjYuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjIzID0gX2kyNi52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9IF9yZWYyMztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoaW5wdXROYW1lLCBvcHRpb24udmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICghaW5wdXRUeXBlIHx8IChpbnB1dFR5cGUgIT09ICdjaGVja2JveCcgJiYgaW5wdXRUeXBlICE9PSAncmFkaW8nKSB8fCBpbnB1dC5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoaW5wdXROYW1lLCBpbnB1dC52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gSW52b2tlZCB3aGVuIHRoZXJlIGlzIG5ldyBwcm9ncmVzcyBpbmZvcm1hdGlvbiBhYm91dCBnaXZlbiBmaWxlcy5cclxuXHRcdFx0XHQvLyBJZiBlIGlzIG5vdCBwcm92aWRlZCwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB1cGxvYWQgaXMgZmluaXNoZWQuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpIHtcclxuXHRcdFx0XHRcdHZhciBwcm9ncmVzcyA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3MgPSAoMTAwICogZS5sb2FkZWQpIC8gZS50b3RhbDtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gZmlsZXNbMF07XHJcblx0XHRcdFx0XHRcdFx0Ly8gU2luY2UgdGhpcyBpcyBhIGNodW5rZWQgdXBsb2FkLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgYXBwcm9wcmlhdGUgY2h1bmsgcHJvZ3Jlc3MuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZSwgeGhyKTtcclxuXHRcdFx0XHRcdFx0XHRjaHVuay5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG5cdFx0XHRcdFx0XHRcdGNodW5rLnRvdGFsID0gZS50b3RhbDtcclxuXHRcdFx0XHRcdFx0XHRjaHVuay5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZmlsZVByb2dyZXNzID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdGZpbGVUb3RhbCA9IHZvaWQgMCxcclxuXHRcdFx0XHRcdFx0XHRcdGZpbGVCeXRlc1NlbnQgPSB2b2lkIDA7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnRvdGFsID0gMDtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gIT09IHVuZGVmaW5lZCAmJiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3MgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5wcm9ncmVzcyArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnRvdGFsICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS50b3RhbDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQuYnl0ZXNTZW50ICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS5ieXRlc1NlbnQ7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnByb2dyZXNzID0gZmlsZS51cGxvYWQucHJvZ3Jlc3MgLyBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNSA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI1ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2kyNyA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI1ID0gX2lzQXJyYXkyNSA/IF9pdGVyYXRvcjI1IDogX2l0ZXJhdG9yMjVbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMjQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjcgPj0gX2l0ZXJhdG9yMjUubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjI0ID0gX2l0ZXJhdG9yMjVbX2kyNysrXTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pMjcgPSBfaXRlcmF0b3IyNS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTI3LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmMjQgPSBfaTI3LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfZmlsZTIgPSBfcmVmMjQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0X2ZpbGUyLnVwbG9hZC5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG5cdFx0XHRcdFx0XHRcdFx0X2ZpbGUyLnVwbG9hZC50b3RhbCA9IGUudG90YWw7XHJcblx0XHRcdFx0XHRcdFx0XHRfZmlsZTIudXBsb2FkLmJ5dGVzU2VudCA9IGUubG9hZGVkO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNiA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyNiA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRfaTI4ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI2ID0gX2lzQXJyYXkyNiA/IF9pdGVyYXRvcjI2IDogX2l0ZXJhdG9yMjZbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMjU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI2KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyOCA+PSBfaXRlcmF0b3IyNi5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI1ID0gX2l0ZXJhdG9yMjZbX2kyOCsrXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0X2kyOCA9IF9pdGVyYXRvcjI2Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI4LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI1ID0gX2kyOC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBfZmlsZTMgPSBfcmVmMjU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgndXBsb2FkcHJvZ3Jlc3MnLCBfZmlsZTMsIF9maWxlMy51cGxvYWQucHJvZ3Jlc3MsIF9maWxlMy51cGxvYWQuYnl0ZXNTZW50KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIGZpbGUgZmluaXNoZWQgdXBsb2FkaW5nXHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgYWxsRmlsZXNGaW5pc2hlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRwcm9ncmVzcyA9IDEwMDtcclxuXHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI3ID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI3ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjkgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjcgPSBfaXNBcnJheTI3ID8gX2l0ZXJhdG9yMjcgOiBfaXRlcmF0b3IyN1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjcpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI5ID49IF9pdGVyYXRvcjI3Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjYgPSBfaXRlcmF0b3IyN1tfaTI5KytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTI5ID0gX2l0ZXJhdG9yMjcubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjkuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjYgPSBfaTI5LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9maWxlNCA9IF9yZWYyNjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9maWxlNC51cGxvYWQucHJvZ3Jlc3MgIT09IDEwMCB8fCBfZmlsZTQudXBsb2FkLmJ5dGVzU2VudCAhPT0gX2ZpbGU0LnVwbG9hZC50b3RhbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0YWxsRmlsZXNGaW5pc2hlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRfZmlsZTQudXBsb2FkLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0X2ZpbGU0LnVwbG9hZC5ieXRlc1NlbnQgPSBfZmlsZTQudXBsb2FkLnRvdGFsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBOb3RoaW5nIHRvIGRvLCBhbGwgZmlsZXMgYWxyZWFkeSBhdCAxMDAlXHJcblx0XHRcdFx0XHRcdGlmIChhbGxGaWxlc0ZpbmlzaGVkKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyOCA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyOCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRfaTMwID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI4ID0gX2lzQXJyYXkyOCA/IF9pdGVyYXRvcjI4IDogX2l0ZXJhdG9yMjhbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMjc7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kzMCA+PSBfaXRlcmF0b3IyOC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI3ID0gX2l0ZXJhdG9yMjhbX2kzMCsrXTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0X2kzMCA9IF9pdGVyYXRvcjI4Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTMwLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI3ID0gX2kzMC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBfZmlsZTUgPSBfcmVmMjc7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgndXBsb2FkcHJvZ3Jlc3MnLCBfZmlsZTUsIHByb2dyZXNzLCBfZmlsZTUudXBsb2FkLmJ5dGVzU2VudCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2ZpbmlzaGVkVXBsb2FkaW5nJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2ZpbmlzaGVkVXBsb2FkaW5nKGZpbGVzLCB4aHIsIGUpIHtcclxuXHRcdFx0XHRcdHZhciByZXNwb25zZSA9IHZvaWQgMDtcclxuXHJcblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0uc3RhdHVzID09PSBEcm9wem9uZS5DQU5DRUxFRCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSAhPT0gJ2FycmF5YnVmZmVyJyAmJiB4aHIucmVzcG9uc2VUeXBlICE9PSAnYmxvYicpIHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRcdHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJykgJiZcclxuXHRcdFx0XHRcdFx0XHR+eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJylcclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGUgPSBlcnJvcjtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gJ0ludmFsaWQgSlNPTiByZXNwb25zZSBmcm9tIHNlcnZlci4nO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghKDIwMCA8PSB4aHIuc3RhdHVzICYmIHhoci5zdGF0dXMgPCAzMDApKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGVzWzBdLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkKHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIGUpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19oYW5kbGVVcGxvYWRFcnJvcicsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyLCByZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnN0YXR1cyA9PT0gRHJvcHpvbmUuQ0FOQ0VMRUQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCAmJiB0aGlzLm9wdGlvbnMucmV0cnlDaHVua3MpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XHJcblx0XHRcdFx0XHRcdGlmIChjaHVuay5yZXRyaWVzKysgPCB0aGlzLm9wdGlvbnMucmV0cnlDaHVua3NMaW1pdCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtjaHVuay5kYXRhQmxvY2tdKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdSZXRyaWVkIHRoaXMgY2h1bmsgdG9vIG9mdGVuLiBHaXZpbmcgdXAuJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjkgPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTI5ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRfaTMxID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyOSA9IF9pc0FycmF5MjkgPyBfaXRlcmF0b3IyOSA6IF9pdGVyYXRvcjI5W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjI4O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMSA+PSBfaXRlcmF0b3IyOS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyOCA9IF9pdGVyYXRvcjI5W19pMzErK107XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X2kzMSA9IF9pdGVyYXRvcjI5Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMjggPSBfaTMxLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYyODtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuX2Vycm9yUHJvY2Vzc2luZyhcclxuXHRcdFx0XHRcdFx0XHRmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSB8fCB0aGlzLm9wdGlvbnMuZGljdFJlc3BvbnNlRXJyb3IucmVwbGFjZSgne3tzdGF0dXNDb2RlfX0nLCB4aHIuc3RhdHVzKSxcclxuXHRcdFx0XHRcdFx0XHR4aHJcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnc3VibWl0UmVxdWVzdCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN1Ym1pdFJlcXVlc3QoeGhyLCBmb3JtRGF0YSwgZmlsZXMpIHtcclxuXHRcdFx0XHRcdHhoci5zZW5kKGZvcm1EYXRhKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBDYWxsZWQgaW50ZXJuYWxseSB3aGVuIHByb2Nlc3NpbmcgaXMgZmluaXNoZWQuXHJcblx0XHRcdFx0Ly8gSW5kaXZpZHVhbCBjYWxsYmFja3MgaGF2ZSB0byBiZSBjYWxsZWQgaW4gdGhlIGFwcHJvcHJpYXRlIHNlY3Rpb25zLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2ZpbmlzaGVkJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZVRleHQsIGUpIHtcclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzMCA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MzAgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMzIgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMwID0gX2lzQXJyYXkzMCA/IF9pdGVyYXRvcjMwIDogX2l0ZXJhdG9yMzBbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMjk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzMCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMyID49IF9pdGVyYXRvcjMwLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjI5ID0gX2l0ZXJhdG9yMzBbX2kzMisrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTMyID0gX2l0ZXJhdG9yMzAubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMyLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyOSA9IF9pMzIudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjI5O1xyXG5cclxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5TVUNDRVNTO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3N1Y2Nlc3MnLCBmaWxlLCByZXNwb25zZVRleHQsIGUpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NvbXBsZXRlJywgZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnc3VjY2Vzc211bHRpcGxlJywgZmlsZXMsIHJlc3BvbnNlVGV4dCwgZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGVtdWx0aXBsZScsIGZpbGVzKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gQ2FsbGVkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIGlzIGZpbmlzaGVkLlxyXG5cdFx0XHRcdC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19lcnJvclByb2Nlc3NpbmcnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCBtZXNzYWdlLCB4aHIpIHtcclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzMSA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MzEgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMzMgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMxID0gX2lzQXJyYXkzMSA/IF9pdGVyYXRvcjMxIDogX2l0ZXJhdG9yMzFbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMzA7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzMSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMzID49IF9pdGVyYXRvcjMxLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjMwID0gX2l0ZXJhdG9yMzFbX2kzMysrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTMzID0gX2l0ZXJhdG9yMzEubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMzLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYzMCA9IF9pMzMudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjMwO1xyXG5cclxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5FUlJPUjtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIGZpbGUsIG1lc3NhZ2UsIHhocik7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcm11bHRpcGxlJywgZmlsZXMsIG1lc3NhZ2UsIHhocik7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGVtdWx0aXBsZScsIGZpbGVzKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdF0sXHJcblx0XHRbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICd1dWlkdjQnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1dWlkdjQoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcblx0XHRcdFx0XHRcdHZhciByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLFxyXG5cdFx0XHRcdFx0XHRcdHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XVxyXG5cdCk7XHJcblxyXG5cdHJldHVybiBEcm9wem9uZTtcclxufSkoRW1pdHRlcik7XHJcblxyXG5Ecm9wem9uZS5pbml0Q2xhc3MoKTtcclxuXHJcbkRyb3B6b25lLnZlcnNpb24gPSAnNS4yLjAnO1xyXG5cclxuLy8gVGhpcyBpcyBhIG1hcCBvZiBvcHRpb25zIGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZXMuIEFkZCBjb25maWd1cmF0aW9uc1xyXG4vLyB0byB0aGlzIG9iamVjdCBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmUgZWxlbWVucy5cclxuLy9cclxuLy8gRXhhbXBsZTpcclxuLy9cclxuLy8gICAgIERyb3B6b25lLm9wdGlvbnMubXlEcm9wem9uZUVsZW1lbnRJZCA9IHsgbWF4RmlsZXNpemU6IDEgfTtcclxuLy9cclxuLy8gVG8gZGlzYWJsZSBhdXRvRGlzY292ZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCwgeW91IGNhbiBzZXQgYGZhbHNlYCBhcyBhbiBvcHRpb246XHJcbi8vXHJcbi8vICAgICBEcm9wem9uZS5vcHRpb25zLm15RGlzYWJsZWRFbGVtZW50SWQgPSBmYWxzZTtcclxuLy9cclxuLy8gQW5kIGluIGh0bWw6XHJcbi8vXHJcbi8vICAgICA8Zm9ybSBhY3Rpb249XCIvdXBsb2FkXCIgaWQ9XCJteS1kcm9wem9uZS1lbGVtZW50LWlkXCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT5cclxuRHJvcHpvbmUub3B0aW9ucyA9IHt9O1xyXG5cclxuLy8gUmV0dXJucyB0aGUgb3B0aW9ucyBmb3IgYW4gZWxlbWVudCBvciB1bmRlZmluZWQgaWYgbm9uZSBhdmFpbGFibGUuXHJcbkRyb3B6b25lLm9wdGlvbnNGb3JFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdC8vIEdldCB0aGUgYERyb3B6b25lLm9wdGlvbnMuZWxlbWVudElkYCBmb3IgdGhpcyBlbGVtZW50IGlmIGl0IGV4aXN0c1xyXG5cdGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSkge1xyXG5cdFx0cmV0dXJuIERyb3B6b25lLm9wdGlvbnNbY2FtZWxpemUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykpXTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBIb2xkcyBhIGxpc3Qgb2YgYWxsIGRyb3B6b25lIGluc3RhbmNlc1xyXG5Ecm9wem9uZS5pbnN0YW5jZXMgPSBbXTtcclxuXHJcbi8vIFJldHVybnMgdGhlIGRyb3B6b25lIGZvciBnaXZlbiBlbGVtZW50IGlmIGFueVxyXG5Ecm9wem9uZS5mb3JFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG5cdH1cclxuXHRpZiAoKGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuZHJvcHpvbmUgOiB1bmRlZmluZWQpID09IG51bGwpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcclxuXHRcdFx0XCJObyBEcm9wem9uZSBmb3VuZCBmb3IgZ2l2ZW4gZWxlbWVudC4gVGhpcyBpcyBwcm9iYWJseSBiZWNhdXNlIHlvdSdyZSB0cnlpbmcgdG8gYWNjZXNzIGl0IGJlZm9yZSBEcm9wem9uZSBoYWQgdGhlIHRpbWUgdG8gaW5pdGlhbGl6ZS4gVXNlIHRoZSBgaW5pdGAgb3B0aW9uIHRvIHNldHVwIGFueSBhZGRpdGlvbmFsIG9ic2VydmVycyBvbiB5b3VyIERyb3B6b25lLlwiXHJcblx0XHQpO1xyXG5cdH1cclxuXHRyZXR1cm4gZWxlbWVudC5kcm9wem9uZTtcclxufTtcclxuXHJcbi8vIFNldCB0byBmYWxzZSBpZiB5b3UgZG9uJ3Qgd2FudCBEcm9wem9uZSB0byBhdXRvbWF0aWNhbGx5IGZpbmQgYW5kIGF0dGFjaCB0byAuZHJvcHpvbmUgZWxlbWVudHMuXHJcbkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IHRydWU7XHJcblxyXG4vLyBMb29rcyBmb3IgYWxsIC5kcm9wem9uZSBlbGVtZW50cyBhbmQgY3JlYXRlcyBhIGRyb3B6b25lIGZvciB0aGVtXHJcbkRyb3B6b25lLmRpc2NvdmVyID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGRyb3B6b25lcyA9IHZvaWQgMDtcclxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCkge1xyXG5cdFx0ZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGRyb3B6b25lcyA9IFtdO1xyXG5cdFx0Ly8gSUUgOihcclxuXHRcdHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24gY2hlY2tFbGVtZW50cyhlbGVtZW50cykge1xyXG5cdFx0XHRyZXR1cm4gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMyID0gZWxlbWVudHMsXHJcblx0XHRcdFx0XHRcdF9pc0FycmF5MzIgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRfaTM0ID0gMCxcclxuXHRcdFx0XHRcdFx0X2l0ZXJhdG9yMzIgPSBfaXNBcnJheTMyID8gX2l0ZXJhdG9yMzIgOiBfaXRlcmF0b3IzMltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0dmFyIF9yZWYzMTtcclxuXHJcblx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzMikge1xyXG5cdFx0XHRcdFx0XHRpZiAoX2kzNCA+PSBfaXRlcmF0b3IzMi5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRfcmVmMzEgPSBfaXRlcmF0b3IzMltfaTM0KytdO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0X2kzNCA9IF9pdGVyYXRvcjMyLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0aWYgKF9pMzQuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdF9yZWYzMSA9IF9pMzQudmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGVsID0gX3JlZjMxO1xyXG5cclxuXHRcdFx0XHRcdGlmICgvKF58IClkcm9wem9uZSgkfCApLy50ZXN0KGVsLmNsYXNzTmFtZSkpIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goZHJvcHpvbmVzLnB1c2goZWwpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdH0pKCk7XHJcblx0XHR9O1xyXG5cdFx0Y2hlY2tFbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JykpO1xyXG5cdFx0Y2hlY2tFbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9ybScpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKFxyXG5cdFx0XHR2YXIgX2l0ZXJhdG9yMzMgPSBkcm9wem9uZXMsXHJcblx0XHRcdFx0X2lzQXJyYXkzMyA9IHRydWUsXHJcblx0XHRcdFx0X2kzNSA9IDAsXHJcblx0XHRcdFx0X2l0ZXJhdG9yMzMgPSBfaXNBcnJheTMzID8gX2l0ZXJhdG9yMzMgOiBfaXRlcmF0b3IzM1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdDtcclxuXHJcblx0XHQpIHtcclxuXHRcdFx0dmFyIF9yZWYzMjtcclxuXHJcblx0XHRcdGlmIChfaXNBcnJheTMzKSB7XHJcblx0XHRcdFx0aWYgKF9pMzUgPj0gX2l0ZXJhdG9yMzMubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRfcmVmMzIgPSBfaXRlcmF0b3IzM1tfaTM1KytdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF9pMzUgPSBfaXRlcmF0b3IzMy5uZXh0KCk7XHJcblx0XHRcdFx0aWYgKF9pMzUuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0X3JlZjMyID0gX2kzNS52YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGRyb3B6b25lID0gX3JlZjMyO1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGEgZHJvcHpvbmUgdW5sZXNzIGF1dG8gZGlzY292ZXIgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIHNwZWNpZmljIGVsZW1lbnRcclxuXHRcdFx0aWYgKERyb3B6b25lLm9wdGlvbnNGb3JFbGVtZW50KGRyb3B6b25lKSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChuZXcgRHJvcHpvbmUoZHJvcHpvbmUpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0pKCk7XHJcbn07XHJcblxyXG4vLyBTaW5jZSB0aGUgd2hvbGUgRHJhZyduJ0Ryb3AgQVBJIGlzIHByZXR0eSBuZXcsIHNvbWUgYnJvd3NlcnMgaW1wbGVtZW50IGl0LFxyXG4vLyBidXQgbm90IGNvcnJlY3RseS5cclxuLy8gU28gSSBjcmVhdGVkIGEgYmxhY2tsaXN0IG9mIHVzZXJBZ2VudHMuIFllcywgeWVzLiBCcm93c2VyIHNuaWZmaW5nLCBJIGtub3cuXHJcbi8vIEJ1dCB3aGF0IHRvIGRvIHdoZW4gYnJvd3NlcnMgKnRoZW9yZXRpY2FsbHkqIHN1cHBvcnQgYW4gQVBJLCBidXQgY3Jhc2hcclxuLy8gd2hlbiB1c2luZyBpdC5cclxuLy9cclxuLy8gVGhpcyBpcyBhIGxpc3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0ZXN0ZWQgYWdhaW5zdCBuYXZpZ2F0b3IudXNlckFnZW50XHJcbi8vXHJcbi8vICoqIEl0IHNob3VsZCBvbmx5IGJlIHVzZWQgb24gYnJvd3NlciB0aGF0ICpkbyogc3VwcG9ydCB0aGUgQVBJLCBidXRcclxuLy8gaW5jb3JyZWN0bHkgKipcclxuLy9cclxuRHJvcHpvbmUuYmxhY2tsaXN0ZWRCcm93c2VycyA9IFtcclxuXHQvLyBUaGUgbWFjIG9zIGFuZCB3aW5kb3dzIHBob25lIHZlcnNpb24gb2Ygb3BlcmEgMTIgc2VlbXMgdG8gaGF2ZSBhIHByb2JsZW0gd2l0aCB0aGUgRmlsZSBkcmFnJ24nZHJvcCBBUEkuXHJcblx0L29wZXJhLiooTWFjaW50b3NofFdpbmRvd3MgUGhvbmUpLip2ZXJzaW9uXFwvMTIvaSxcclxuXTtcclxuXHJcbi8vIENoZWNrcyBpZiB0aGUgYnJvd3NlciBpcyBzdXBwb3J0ZWRcclxuRHJvcHpvbmUuaXNCcm93c2VyU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGNhcGFibGVCcm93c2VyID0gdHJ1ZTtcclxuXHJcblx0aWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYiAmJiB3aW5kb3cuRm9ybURhdGEgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xyXG5cdFx0aWYgKCEoJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpKSkge1xyXG5cdFx0XHRjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEFQSSwgYnV0IG1heSBiZSBibGFja2xpc3RlZC5cclxuXHRcdFx0Zm9yIChcclxuXHRcdFx0XHR2YXIgX2l0ZXJhdG9yMzQgPSBEcm9wem9uZS5ibGFja2xpc3RlZEJyb3dzZXJzLFxyXG5cdFx0XHRcdFx0X2lzQXJyYXkzNCA9IHRydWUsXHJcblx0XHRcdFx0XHRfaTM2ID0gMCxcclxuXHRcdFx0XHRcdF9pdGVyYXRvcjM0ID0gX2lzQXJyYXkzNCA/IF9pdGVyYXRvcjM0IDogX2l0ZXJhdG9yMzRbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdDtcclxuXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHZhciBfcmVmMzM7XHJcblxyXG5cdFx0XHRcdGlmIChfaXNBcnJheTM0KSB7XHJcblx0XHRcdFx0XHRpZiAoX2kzNiA+PSBfaXRlcmF0b3IzNC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0X3JlZjMzID0gX2l0ZXJhdG9yMzRbX2kzNisrXTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X2kzNiA9IF9pdGVyYXRvcjM0Lm5leHQoKTtcclxuXHRcdFx0XHRcdGlmIChfaTM2LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0X3JlZjMzID0gX2kzNi52YWx1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciByZWdleCA9IF9yZWYzMztcclxuXHJcblx0XHRcdFx0aWYgKHJlZ2V4LnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuXHRcdFx0XHRcdGNhcGFibGVCcm93c2VyID0gZmFsc2U7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0Y2FwYWJsZUJyb3dzZXIgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjYXBhYmxlQnJvd3NlcjtcclxufTtcclxuXHJcbkRyb3B6b25lLmRhdGFVUkl0b0Jsb2IgPSBmdW5jdGlvbihkYXRhVVJJKSB7XHJcblx0Ly8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcclxuXHQvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xyXG5cdHZhciBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xyXG5cclxuXHQvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XHJcblx0dmFyIG1pbWVTdHJpbmcgPSBkYXRhVVJJXHJcblx0XHQuc3BsaXQoJywnKVswXVxyXG5cdFx0LnNwbGl0KCc6JylbMV1cclxuXHRcdC5zcGxpdCgnOycpWzBdO1xyXG5cclxuXHQvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxyXG5cdHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XHJcblx0dmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xyXG5cdGZvciAodmFyIGkgPSAwLCBlbmQgPSBieXRlU3RyaW5nLmxlbmd0aCwgYXNjID0gMCA8PSBlbmQ7IGFzYyA/IGkgPD0gZW5kIDogaSA+PSBlbmQ7IGFzYyA/IGkrKyA6IGktLSkge1xyXG5cdFx0aWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcblx0fVxyXG5cclxuXHQvLyB3cml0ZSB0aGUgQXJyYXlCdWZmZXIgdG8gYSBibG9iXHJcblx0cmV0dXJuIG5ldyBCbG9iKFthYl0sIHsgdHlwZTogbWltZVN0cmluZyB9KTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgcmVqZWN0ZWQgaXRlbVxyXG52YXIgd2l0aG91dCA9IGZ1bmN0aW9uIHdpdGhvdXQobGlzdCwgcmVqZWN0ZWRJdGVtKSB7XHJcblx0cmV0dXJuIGxpc3RcclxuXHRcdC5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbSAhPT0gcmVqZWN0ZWRJdGVtO1xyXG5cdFx0fSlcclxuXHRcdC5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdH0pO1xyXG59O1xyXG5cclxuLy8gYWJjLWRlZl9naGkgLT4gYWJjRGVmR2hpXHJcbnZhciBjYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xyXG5cdHJldHVybiBzdHIucmVwbGFjZSgvW1xcLV9dKFxcdykvZywgZnVuY3Rpb24obWF0Y2gpIHtcclxuXHRcdHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW4gZWxlbWVudCBmcm9tIHN0cmluZ1xyXG5Ecm9wem9uZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oc3RyaW5nKSB7XHJcblx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdGRpdi5pbm5lckhUTUwgPSBzdHJpbmc7XHJcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzBdO1xyXG59O1xyXG5cclxuLy8gVGVzdHMgaWYgZ2l2ZW4gZWxlbWVudCBpcyBpbnNpZGUgKG9yIHNpbXBseSBpcykgdGhlIGNvbnRhaW5lclxyXG5Ecm9wem9uZS5lbGVtZW50SW5zaWRlID0gZnVuY3Rpb24oZWxlbWVudCwgY29udGFpbmVyKSB7XHJcblx0aWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSAvLyBDb2ZmZWVzY3JpcHQgZG9lc24ndCBzdXBwb3J0IGRvL3doaWxlIGxvb3BzXHJcblx0d2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSkge1xyXG5cdFx0aWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuRHJvcHpvbmUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKGVsLCBuYW1lKSB7XHJcblx0dmFyIGVsZW1lbnQgPSB2b2lkIDA7XHJcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcclxuXHR9IGVsc2UgaWYgKGVsLm5vZGVUeXBlICE9IG51bGwpIHtcclxuXHRcdGVsZW1lbnQgPSBlbDtcclxuXHR9XHJcblx0aWYgKGVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGAnICsgbmFtZSArICdgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3Igb3IgYSBwbGFpbiBIVE1MIGVsZW1lbnQuJyk7XHJcblx0fVxyXG5cdHJldHVybiBlbGVtZW50O1xyXG59O1xyXG5cclxuRHJvcHpvbmUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbihlbHMsIG5hbWUpIHtcclxuXHR2YXIgZWwgPSB2b2lkIDAsXHJcblx0XHRlbGVtZW50cyA9IHZvaWQgMDtcclxuXHRpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHRcdGVsZW1lbnRzID0gW107XHJcblx0XHR0cnkge1xyXG5cdFx0XHRmb3IgKFxyXG5cdFx0XHRcdHZhciBfaXRlcmF0b3IzNSA9IGVscyxcclxuXHRcdFx0XHRcdF9pc0FycmF5MzUgPSB0cnVlLFxyXG5cdFx0XHRcdFx0X2kzNyA9IDAsXHJcblx0XHRcdFx0XHRfaXRlcmF0b3IzNSA9IF9pc0FycmF5MzUgPyBfaXRlcmF0b3IzNSA6IF9pdGVyYXRvcjM1W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHQ7XHJcblxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRpZiAoX2lzQXJyYXkzNSkge1xyXG5cdFx0XHRcdFx0aWYgKF9pMzcgPj0gX2l0ZXJhdG9yMzUubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdGVsID0gX2l0ZXJhdG9yMzVbX2kzNysrXTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X2kzNyA9IF9pdGVyYXRvcjM1Lm5leHQoKTtcclxuXHRcdFx0XHRcdGlmIChfaTM3LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0ZWwgPSBfaTM3LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxlbWVudHMucHVzaCh0aGlzLmdldEVsZW1lbnQoZWwsIG5hbWUpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRlbGVtZW50cyA9IG51bGw7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZWxzID09PSAnc3RyaW5nJykge1xyXG5cdFx0ZWxlbWVudHMgPSBbXTtcclxuXHRcdGZvciAoXHJcblx0XHRcdHZhciBfaXRlcmF0b3IzNiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKSxcclxuXHRcdFx0XHRfaXNBcnJheTM2ID0gdHJ1ZSxcclxuXHRcdFx0XHRfaTM4ID0gMCxcclxuXHRcdFx0XHRfaXRlcmF0b3IzNiA9IF9pc0FycmF5MzYgPyBfaXRlcmF0b3IzNiA6IF9pdGVyYXRvcjM2W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0O1xyXG5cclxuXHRcdCkge1xyXG5cdFx0XHRpZiAoX2lzQXJyYXkzNikge1xyXG5cdFx0XHRcdGlmIChfaTM4ID49IF9pdGVyYXRvcjM2Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0ZWwgPSBfaXRlcmF0b3IzNltfaTM4KytdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF9pMzggPSBfaXRlcmF0b3IzNi5uZXh0KCk7XHJcblx0XHRcdFx0aWYgKF9pMzguZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0ZWwgPSBfaTM4LnZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50cy5wdXNoKGVsKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKGVscy5ub2RlVHlwZSAhPSBudWxsKSB7XHJcblx0XHRlbGVtZW50cyA9IFtlbHNdO1xyXG5cdH1cclxuXHJcblx0aWYgKGVsZW1lbnRzID09IG51bGwgfHwgIWVsZW1lbnRzLmxlbmd0aCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFxyXG5cdFx0XHQnSW52YWxpZCBgJyArIG5hbWUgKyAnYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yLCBhIHBsYWluIEhUTUwgZWxlbWVudCBvciBhIGxpc3Qgb2YgdGhvc2UuJ1xyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBlbGVtZW50cztcclxufTtcclxuXHJcbi8vIEFza3MgdGhlIHVzZXIgdGhlIHF1ZXN0aW9uIGFuZCBjYWxscyBhY2NlcHRlZCBvciByZWplY3RlZCBhY2NvcmRpbmdseVxyXG4vL1xyXG4vLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBqdXN0IHVzZXMgYHdpbmRvdy5jb25maXJtYCBhbmQgdGhlbiBjYWxscyB0aGVcclxuLy8gYXBwcm9wcmlhdGUgY2FsbGJhY2suXHJcbkRyb3B6b25lLmNvbmZpcm0gPSBmdW5jdGlvbihxdWVzdGlvbiwgYWNjZXB0ZWQsIHJlamVjdGVkKSB7XHJcblx0aWYgKHdpbmRvdy5jb25maXJtKHF1ZXN0aW9uKSkge1xyXG5cdFx0cmV0dXJuIGFjY2VwdGVkKCk7XHJcblx0fSBlbHNlIGlmIChyZWplY3RlZCAhPSBudWxsKSB7XHJcblx0XHRyZXR1cm4gcmVqZWN0ZWQoKTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBWYWxpZGF0ZXMgdGhlIG1pbWUgdHlwZSBsaWtlIHRoaXM6XHJcbi8vXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0XHJcbkRyb3B6b25lLmlzVmFsaWRGaWxlID0gZnVuY3Rpb24oZmlsZSwgYWNjZXB0ZWRGaWxlcykge1xyXG5cdGlmICghYWNjZXB0ZWRGaWxlcykge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSAvLyBJZiB0aGVyZSBhcmUgbm8gYWNjZXB0ZWQgbWltZSB0eXBlcywgaXQncyBPS1xyXG5cdGFjY2VwdGVkRmlsZXMgPSBhY2NlcHRlZEZpbGVzLnNwbGl0KCcsJyk7XHJcblxyXG5cdHZhciBtaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuXHR2YXIgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpO1xyXG5cclxuXHRmb3IgKFxyXG5cdFx0dmFyIF9pdGVyYXRvcjM3ID0gYWNjZXB0ZWRGaWxlcyxcclxuXHRcdFx0X2lzQXJyYXkzNyA9IHRydWUsXHJcblx0XHRcdF9pMzkgPSAwLFxyXG5cdFx0XHRfaXRlcmF0b3IzNyA9IF9pc0FycmF5MzcgPyBfaXRlcmF0b3IzNyA6IF9pdGVyYXRvcjM3W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdDtcclxuXHJcblx0KSB7XHJcblx0XHR2YXIgX3JlZjM0O1xyXG5cclxuXHRcdGlmIChfaXNBcnJheTM3KSB7XHJcblx0XHRcdGlmIChfaTM5ID49IF9pdGVyYXRvcjM3Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdF9yZWYzNCA9IF9pdGVyYXRvcjM3W19pMzkrK107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRfaTM5ID0gX2l0ZXJhdG9yMzcubmV4dCgpO1xyXG5cdFx0XHRpZiAoX2kzOS5kb25lKSBicmVhaztcclxuXHRcdFx0X3JlZjM0ID0gX2kzOS52YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdmFsaWRUeXBlID0gX3JlZjM0O1xyXG5cclxuXHRcdHZhbGlkVHlwZSA9IHZhbGlkVHlwZS50cmltKCk7XHJcblx0XHRpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gJy4nKSB7XHJcblx0XHRcdGlmIChmaWxlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlLm5hbWUubGVuZ3RoIC0gdmFsaWRUeXBlLmxlbmd0aCkgIT09IC0xKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoL1xcL1xcKiQvLnRlc3QodmFsaWRUeXBlKSkge1xyXG5cdFx0XHQvLyBUaGlzIGlzIHNvbWV0aGluZyBsaWtlIGEgaW1hZ2UvKiBtaW1lIHR5cGVcclxuXHRcdFx0aWYgKGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sICcnKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAobWltZVR5cGUgPT09IHZhbGlkVHlwZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBBdWdtZW50IGpRdWVyeVxyXG5pZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgalF1ZXJ5ICE9PSBudWxsKSB7XHJcblx0alF1ZXJ5LmZuLmRyb3B6b25lID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEcm9wem9uZSh0aGlzLCBvcHRpb25zKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgIT09IG51bGwpIHtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IERyb3B6b25lO1xyXG59IGVsc2Uge1xyXG5cdHdpbmRvdy5Ecm9wem9uZSA9IERyb3B6b25lO1xyXG59XHJcblxyXG4vLyBEcm9wem9uZSBmaWxlIHN0YXR1cyBjb2Rlc1xyXG5Ecm9wem9uZS5BRERFRCA9ICdhZGRlZCc7XHJcblxyXG5Ecm9wem9uZS5RVUVVRUQgPSAncXVldWVkJztcclxuLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LiBOb3csIGlmIGEgZmlsZSBpcyBhY2NlcHRlZCwgaXQncyBlaXRoZXIgcXVldWVkXHJcbi8vIG9yIHVwbG9hZGluZy5cclxuRHJvcHpvbmUuQUNDRVBURUQgPSBEcm9wem9uZS5RVUVVRUQ7XHJcblxyXG5Ecm9wem9uZS5VUExPQURJTkcgPSAndXBsb2FkaW5nJztcclxuRHJvcHpvbmUuUFJPQ0VTU0lORyA9IERyb3B6b25lLlVQTE9BRElORzsgLy8gYWxpYXNcclxuXHJcbkRyb3B6b25lLkNBTkNFTEVEID0gJ2NhbmNlbGVkJztcclxuRHJvcHpvbmUuRVJST1IgPSAnZXJyb3InO1xyXG5Ecm9wem9uZS5TVUNDRVNTID0gJ3N1Y2Nlc3MnO1xyXG5cclxuLypcclxuXHJcbiBCdWdmaXggZm9yIGlPUyA2IGFuZCA3XHJcbiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE5MjkwOTkvaHRtbDUtY2FudmFzLWRyYXdpbWFnZS1yYXRpby1idWctaW9zXHJcbiBiYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vc3RvbWl0YS9pb3MtaW1hZ2VmaWxlLW1lZ2FwaXhlbFxyXG5cclxuICovXHJcblxyXG4vLyBEZXRlY3RpbmcgdmVydGljYWwgc3F1YXNoIGluIGxvYWRlZCBpbWFnZS5cclxuLy8gRml4ZXMgYSBidWcgd2hpY2ggc3F1YXNoIGltYWdlIHZlcnRpY2FsbHkgd2hpbGUgZHJhd2luZyBpbnRvIGNhbnZhcyBmb3Igc29tZSBpbWFnZXMuXHJcbi8vIFRoaXMgaXMgYSBidWcgaW4gaU9TNiBkZXZpY2VzLiBUaGlzIGZ1bmN0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3N0b21pdGEvaW9zLWltYWdlZmlsZS1tZWdhcGl4ZWxcclxudmFyIGRldGVjdFZlcnRpY2FsU3F1YXNoID0gZnVuY3Rpb24gZGV0ZWN0VmVydGljYWxTcXVhc2goaW1nKSB7XHJcblx0dmFyIGl3ID0gaW1nLm5hdHVyYWxXaWR0aDtcclxuXHR2YXIgaWggPSBpbWcubmF0dXJhbEhlaWdodDtcclxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblx0Y2FudmFzLndpZHRoID0gMTtcclxuXHRjYW52YXMuaGVpZ2h0ID0gaWg7XHJcblx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuXHJcblx0dmFyIF9jdHgkZ2V0SW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgxLCAwLCAxLCBpaCksXHJcblx0XHRkYXRhID0gX2N0eCRnZXRJbWFnZURhdGEuZGF0YTtcclxuXHJcblx0Ly8gc2VhcmNoIGltYWdlIGVkZ2UgcGl4ZWwgcG9zaXRpb24gaW4gY2FzZSBpdCBpcyBzcXVhc2hlZCB2ZXJ0aWNhbGx5LlxyXG5cclxuXHR2YXIgc3kgPSAwO1xyXG5cdHZhciBleSA9IGloO1xyXG5cdHZhciBweSA9IGloO1xyXG5cdHdoaWxlIChweSA+IHN5KSB7XHJcblx0XHR2YXIgYWxwaGEgPSBkYXRhWyhweSAtIDEpICogNCArIDNdO1xyXG5cclxuXHRcdGlmIChhbHBoYSA9PT0gMCkge1xyXG5cdFx0XHRleSA9IHB5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3kgPSBweTtcclxuXHRcdH1cclxuXHJcblx0XHRweSA9IChleSArIHN5KSA+PiAxO1xyXG5cdH1cclxuXHR2YXIgcmF0aW8gPSBweSAvIGloO1xyXG5cclxuXHRpZiAocmF0aW8gPT09IDApIHtcclxuXHRcdHJldHVybiAxO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gcmF0aW87XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQSByZXBsYWNlbWVudCBmb3IgY29udGV4dC5kcmF3SW1hZ2VcclxuLy8gKGFyZ3MgYXJlIGZvciBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uKS5cclxudmFyIGRyYXdJbWFnZUlPU0ZpeCA9IGZ1bmN0aW9uIGRyYXdJbWFnZUlPU0ZpeChjdHgsIGltZywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKSB7XHJcblx0dmFyIHZlcnRTcXVhc2hSYXRpbyA9IGRldGVjdFZlcnRpY2FsU3F1YXNoKGltZyk7XHJcblx0cmV0dXJuIGN0eC5kcmF3SW1hZ2UoaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGggLyB2ZXJ0U3F1YXNoUmF0aW8pO1xyXG59O1xyXG5cclxuLy8gQmFzZWQgb24gTWluaWZ5SnBlZ1xyXG4vLyBTb3VyY2U6IGh0dHA6Ly93d3cucGVycnkuY3ovZmlsZXMvRXhpZlJlc3RvcmVyLmpzXHJcbi8vIGh0dHA6Ly9lbGljb24uYmxvZzU3LmZjMi5jb20vYmxvZy1lbnRyeS0yMDYuaHRtbFxyXG5cclxudmFyIEV4aWZSZXN0b3JlID0gKGZ1bmN0aW9uKCkge1xyXG5cdGZ1bmN0aW9uIEV4aWZSZXN0b3JlKCkge1xyXG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4aWZSZXN0b3JlKTtcclxuXHR9XHJcblxyXG5cdF9jcmVhdGVDbGFzcyhFeGlmUmVzdG9yZSwgbnVsbCwgW1xyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdpbml0Q2xhc3MnLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdENsYXNzKCkge1xyXG5cdFx0XHRcdHRoaXMuS0VZX1NUUiA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdlbmNvZGU2NCcsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbmNvZGU2NChpbnB1dCkge1xyXG5cdFx0XHRcdHZhciBvdXRwdXQgPSAnJztcclxuXHRcdFx0XHR2YXIgY2hyMSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR2YXIgY2hyMiA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR2YXIgY2hyMyA9ICcnO1xyXG5cdFx0XHRcdHZhciBlbmMxID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmMyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmMzID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmM0ID0gJyc7XHJcblx0XHRcdFx0dmFyIGkgPSAwO1xyXG5cdFx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0XHRjaHIxID0gaW5wdXRbaSsrXTtcclxuXHRcdFx0XHRcdGNocjIgPSBpbnB1dFtpKytdO1xyXG5cdFx0XHRcdFx0Y2hyMyA9IGlucHV0W2krK107XHJcblx0XHRcdFx0XHRlbmMxID0gY2hyMSA+PiAyO1xyXG5cdFx0XHRcdFx0ZW5jMiA9ICgoY2hyMSAmIDMpIDw8IDQpIHwgKGNocjIgPj4gNCk7XHJcblx0XHRcdFx0XHRlbmMzID0gKChjaHIyICYgMTUpIDw8IDIpIHwgKGNocjMgPj4gNik7XHJcblx0XHRcdFx0XHRlbmM0ID0gY2hyMyAmIDYzO1xyXG5cdFx0XHRcdFx0aWYgKGlzTmFOKGNocjIpKSB7XHJcblx0XHRcdFx0XHRcdGVuYzMgPSBlbmM0ID0gNjQ7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XHJcblx0XHRcdFx0XHRcdGVuYzQgPSA2NDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG91dHB1dCA9XHJcblx0XHRcdFx0XHRcdG91dHB1dCArXHJcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jMSkgK1xyXG5cdFx0XHRcdFx0XHR0aGlzLktFWV9TVFIuY2hhckF0KGVuYzIpICtcclxuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmMzKSArXHJcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jNCk7XHJcblx0XHRcdFx0XHRjaHIxID0gY2hyMiA9IGNocjMgPSAnJztcclxuXHRcdFx0XHRcdGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSAnJztcclxuXHRcdFx0XHRcdGlmICghKGkgPCBpbnB1dC5sZW5ndGgpKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gb3V0cHV0O1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAncmVzdG9yZScsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZXN0b3JlKG9yaWdGaWxlQmFzZTY0LCByZXNpemVkRmlsZUJhc2U2NCkge1xyXG5cdFx0XHRcdGlmICghb3JpZ0ZpbGVCYXNlNjQubWF0Y2goJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJykpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZXNpemVkRmlsZUJhc2U2NDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIHJhd0ltYWdlID0gdGhpcy5kZWNvZGU2NChvcmlnRmlsZUJhc2U2NC5yZXBsYWNlKCdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcsICcnKSk7XHJcblx0XHRcdFx0dmFyIHNlZ21lbnRzID0gdGhpcy5zbGljZTJTZWdtZW50cyhyYXdJbWFnZSk7XHJcblx0XHRcdFx0dmFyIGltYWdlID0gdGhpcy5leGlmTWFuaXB1bGF0aW9uKHJlc2l6ZWRGaWxlQmFzZTY0LCBzZWdtZW50cyk7XHJcblx0XHRcdFx0cmV0dXJuICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyB0aGlzLmVuY29kZTY0KGltYWdlKTtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2V4aWZNYW5pcHVsYXRpb24nLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZXhpZk1hbmlwdWxhdGlvbihyZXNpemVkRmlsZUJhc2U2NCwgc2VnbWVudHMpIHtcclxuXHRcdFx0XHR2YXIgZXhpZkFycmF5ID0gdGhpcy5nZXRFeGlmQXJyYXkoc2VnbWVudHMpO1xyXG5cdFx0XHRcdHZhciBuZXdJbWFnZUFycmF5ID0gdGhpcy5pbnNlcnRFeGlmKHJlc2l6ZWRGaWxlQmFzZTY0LCBleGlmQXJyYXkpO1xyXG5cdFx0XHRcdHZhciBhQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkobmV3SW1hZ2VBcnJheSk7XHJcblx0XHRcdFx0cmV0dXJuIGFCdWZmZXI7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdnZXRFeGlmQXJyYXknLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RXhpZkFycmF5KHNlZ21lbnRzKSB7XHJcblx0XHRcdFx0dmFyIHNlZyA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR2YXIgeCA9IDA7XHJcblx0XHRcdFx0d2hpbGUgKHggPCBzZWdtZW50cy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHNlZyA9IHNlZ21lbnRzW3hdO1xyXG5cdFx0XHRcdFx0aWYgKChzZWdbMF0gPT09IDI1NSkgJiAoc2VnWzFdID09PSAyMjUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBzZWc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR4Kys7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2luc2VydEV4aWYnLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5zZXJ0RXhpZihyZXNpemVkRmlsZUJhc2U2NCwgZXhpZkFycmF5KSB7XHJcblx0XHRcdFx0dmFyIGltYWdlRGF0YSA9IHJlc2l6ZWRGaWxlQmFzZTY0LnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpO1xyXG5cdFx0XHRcdHZhciBidWYgPSB0aGlzLmRlY29kZTY0KGltYWdlRGF0YSk7XHJcblx0XHRcdFx0dmFyIHNlcGFyYXRlUG9pbnQgPSBidWYuaW5kZXhPZigyNTUsIDMpO1xyXG5cdFx0XHRcdHZhciBtYWUgPSBidWYuc2xpY2UoMCwgc2VwYXJhdGVQb2ludCk7XHJcblx0XHRcdFx0dmFyIGF0byA9IGJ1Zi5zbGljZShzZXBhcmF0ZVBvaW50KTtcclxuXHRcdFx0XHR2YXIgYXJyYXkgPSBtYWU7XHJcblx0XHRcdFx0YXJyYXkgPSBhcnJheS5jb25jYXQoZXhpZkFycmF5KTtcclxuXHRcdFx0XHRhcnJheSA9IGFycmF5LmNvbmNhdChhdG8pO1xyXG5cdFx0XHRcdHJldHVybiBhcnJheTtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ3NsaWNlMlNlZ21lbnRzJyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHNsaWNlMlNlZ21lbnRzKHJhd0ltYWdlQXJyYXkpIHtcclxuXHRcdFx0XHR2YXIgaGVhZCA9IDA7XHJcblx0XHRcdFx0dmFyIHNlZ21lbnRzID0gW107XHJcblx0XHRcdFx0d2hpbGUgKHRydWUpIHtcclxuXHRcdFx0XHRcdHZhciBsZW5ndGg7XHJcblx0XHRcdFx0XHRpZiAoKHJhd0ltYWdlQXJyYXlbaGVhZF0gPT09IDI1NSkgJiAocmF3SW1hZ2VBcnJheVtoZWFkICsgMV0gPT09IDIxOCkpIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoKHJhd0ltYWdlQXJyYXlbaGVhZF0gPT09IDI1NSkgJiAocmF3SW1hZ2VBcnJheVtoZWFkICsgMV0gPT09IDIxNikpIHtcclxuXHRcdFx0XHRcdFx0aGVhZCArPSAyO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bGVuZ3RoID0gcmF3SW1hZ2VBcnJheVtoZWFkICsgMl0gKiAyNTYgKyByYXdJbWFnZUFycmF5W2hlYWQgKyAzXTtcclxuXHRcdFx0XHRcdFx0dmFyIGVuZFBvaW50ID0gaGVhZCArIGxlbmd0aCArIDI7XHJcblx0XHRcdFx0XHRcdHZhciBzZWcgPSByYXdJbWFnZUFycmF5LnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcclxuXHRcdFx0XHRcdFx0c2VnbWVudHMucHVzaChzZWcpO1xyXG5cdFx0XHRcdFx0XHRoZWFkID0gZW5kUG9pbnQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoaGVhZCA+IHJhd0ltYWdlQXJyYXkubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gc2VnbWVudHM7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdkZWNvZGU2NCcsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZWNvZGU2NChpbnB1dCkge1xyXG5cdFx0XHRcdHZhciBvdXRwdXQgPSAnJztcclxuXHRcdFx0XHR2YXIgY2hyMSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR2YXIgY2hyMiA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR2YXIgY2hyMyA9ICcnO1xyXG5cdFx0XHRcdHZhciBlbmMxID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmMyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmMzID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBlbmM0ID0gJyc7XHJcblx0XHRcdFx0dmFyIGkgPSAwO1xyXG5cdFx0XHRcdHZhciBidWYgPSBbXTtcclxuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksICssIC8sIG9yID1cclxuXHRcdFx0XHR2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcclxuXHRcdFx0XHRpZiAoYmFzZTY0dGVzdC5leGVjKGlucHV0KSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxyXG5cdFx0XHRcdFx0XHRcIlRoZXJlIHdlcmUgaW52YWxpZCBiYXNlNjQgY2hhcmFjdGVycyBpbiB0aGUgaW5wdXQgdGV4dC5cXG5WYWxpZCBiYXNlNjQgY2hhcmFjdGVycyBhcmUgQS1aLCBhLXosIDAtOSwgJysnLCAnLycsYW5kICc9J1xcbkV4cGVjdCBlcnJvcnMgaW4gZGVjb2RpbmcuXCJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csICcnKTtcclxuXHRcdFx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRcdFx0ZW5jMSA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcclxuXHRcdFx0XHRcdGVuYzIgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XHJcblx0XHRcdFx0XHRlbmMzID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG5cdFx0XHRcdFx0ZW5jNCA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcclxuXHRcdFx0XHRcdGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xyXG5cdFx0XHRcdFx0Y2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xyXG5cdFx0XHRcdFx0Y2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNDtcclxuXHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjEpO1xyXG5cdFx0XHRcdFx0aWYgKGVuYzMgIT09IDY0KSB7XHJcblx0XHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGVuYzQgIT09IDY0KSB7XHJcblx0XHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2hyMSA9IGNocjIgPSBjaHIzID0gJyc7XHJcblx0XHRcdFx0XHRlbmMxID0gZW5jMiA9IGVuYzMgPSBlbmM0ID0gJyc7XHJcblx0XHRcdFx0XHRpZiAoIShpIDwgaW5wdXQubGVuZ3RoKSkge1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGJ1ZjtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XSk7XHJcblxyXG5cdHJldHVybiBFeGlmUmVzdG9yZTtcclxufSkoKTtcclxuXHJcbkV4aWZSZXN0b3JlLmluaXRDbGFzcygpO1xyXG5cclxuLypcclxuICogY29udGVudGxvYWRlZC5qc1xyXG4gKlxyXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcclxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXHJcbiAqIFVwZGF0ZWQ6IDIwMTAxMDIwXHJcbiAqIExpY2Vuc2U6IE1JVFxyXG4gKiBWZXJzaW9uOiAxLjJcclxuICpcclxuICogVVJMOlxyXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cclxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvTUlULUxJQ0VOU0VcclxuICovXHJcblxyXG4vLyBAd2luIHdpbmRvdyByZWZlcmVuY2VcclxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxyXG52YXIgY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xyXG5cdHZhciBkb25lID0gZmFsc2U7XHJcblx0dmFyIHRvcCA9IHRydWU7XHJcblx0dmFyIGRvYyA9IHdpbi5kb2N1bWVudDtcclxuXHR2YXIgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcblx0dmFyIGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JztcclxuXHR2YXIgcmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnO1xyXG5cdHZhciBwcmUgPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICcnIDogJ29uJztcclxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uIGluaXQoZSkge1xyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9PSAnY29tcGxldGUnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdChlLnR5cGUgPT09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcclxuXHRcdGlmICghZG9uZSAmJiAoZG9uZSA9IHRydWUpKSB7XHJcblx0XHRcdHJldHVybiBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBwb2xsID0gZnVuY3Rpb24gcG9sbCgpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0c2V0VGltZW91dChwb2xsLCA1MCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJldHVybiBpbml0KCdwb2xsJyk7XHJcblx0fTtcclxuXHJcblx0aWYgKGRvYy5yZWFkeVN0YXRlICE9PSAnY29tcGxldGUnKSB7XHJcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0b3AgPSAhd2luLmZyYW1lRWxlbWVudDtcclxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHt9XHJcblx0XHRcdGlmICh0b3ApIHtcclxuXHRcdFx0XHRwb2xsKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGRvY1thZGRdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xyXG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XHJcblx0XHRyZXR1cm4gd2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQXMgYSBzaW5nbGUgZnVuY3Rpb24gdG8gYmUgYWJsZSB0byB3cml0ZSB0ZXN0cy5cclxuRHJvcHpvbmUuX2F1dG9EaXNjb3ZlckZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0aWYgKERyb3B6b25lLmF1dG9EaXNjb3Zlcikge1xyXG5cdFx0cmV0dXJuIERyb3B6b25lLmRpc2NvdmVyKCk7XHJcblx0fVxyXG59O1xyXG5jb250ZW50TG9hZGVkKHdpbmRvdywgRHJvcHpvbmUuX2F1dG9EaXNjb3ZlckZ1bmN0aW9uKTtcclxuXHJcbmZ1bmN0aW9uIF9fZ3VhcmRfXyh2YWx1ZSwgdHJhbnNmb3JtKSB7XHJcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwgPyB0cmFuc2Zvcm0odmFsdWUpIDogdW5kZWZpbmVkO1xyXG59XHJcbmZ1bmN0aW9uIF9fZ3VhcmRNZXRob2RfXyhvYmosIG1ldGhvZE5hbWUsIHRyYW5zZm9ybSkge1xyXG5cdGlmICh0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9ialttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0cmV0dXJuIHRyYW5zZm9ybShvYmosIG1ldGhvZE5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxufVxyXG5cclxuU2FwcGhpcmVXaWRnZXRzLkRyb3B6b25lID0gRHJvcHpvbmU7XHJcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlTGluayAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gd2lkZ2V0SUQgPT4ge1xyXG5cdFx0Y29uc3QgJGVsZW1lbnRXcmFwcGVyID0gJChgIyR7d2lkZ2V0SUR9YCk7XHJcblxyXG5cdFx0aWYgKCRlbGVtZW50V3JhcHBlci5wYXJlbnQoJy5FeHBhbmRhYmxlTGlzdCcpLmhhc0NsYXNzKCdIaWRlV2hlbkVtcHR5JykpIHtcclxuXHRcdFx0Y29uc3QgdGV4dCA9ICRlbGVtZW50V3JhcHBlci5maW5kKCcuRXhwYW5kYWJsZUxpbmtXcmFwcGVyX2NvbnRlbnQnKS50ZXh0KCk7XHJcblxyXG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDApICRlbGVtZW50V3JhcHBlci5wYXJlbnQoJy5FeHBhbmRhYmxlTGlzdCcpLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRiaW5kRXZlbnRzKHdpZGdldElEKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBiaW5kRXZlbnRzID0gd2lkZ2V0SUQgPT4ge1xyXG5cdFx0JChgIyR7d2lkZ2V0SUR9IC5FeHBhbmRhYmxlTGlua1dyYXBwZXJfSGVhZGVyYCkuY2xpY2soKCkgPT4gb3BlbkNsb3NlKGAjJHt3aWRnZXRJRH1gKSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgb3BlbkNsb3NlID0gZWxlbWVudElEID0+ICQoZWxlbWVudElEKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5FeHBhbmRhYmxlTGluayA9IHtcclxuXHRcdGNyZWF0ZVxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBGdWxsU2NyZWVuVGFic1dyYXBwZXIgKi9cclxuU2FwcGhpcmVXaWRnZXRzLkZ1bGxTY3JlZW5UYWJzV3JhcHBlciA9ICgpID0+IHtcclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5UYWJXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ0FjdGl2ZScpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBHZW5lcmljR2FsbGVyeSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbEdlbmVyaWNHYWxsZXJpZXMgPSBbXTtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0YmluZEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XHJcblx0XHRpZiAob3NBamF4QmFja2VuZCkge1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGJpbmRHZW5lcmljR2FsbGVyeShjb25maWcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRiaW5kR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIGJpbmRHZW5lcmljR2FsbGVyeSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxHZW5lcmljR2FsbGVyaWVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhbGxHZW5lcmljR2FsbGVyaWVzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XHJcblx0XHRcdFx0YWxsR2VuZXJpY0dhbGxlcmllcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XHJcblx0XHRhbGxHZW5lcmljR2FsbGVyaWVzLnB1c2god2luZG93W2NvbmZpZy53aWRnZXRJZF0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBHZW5lcmljR2FsbGVyeSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy5nZW5lcmljR2FsbGVyeVJlc2l6ZVRpbWVyID0gMDtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgdGhpcy5jb25maWcud2lkZ2V0SWQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0dGhpcy5lcXVhbEhlaWdodCA9IHRoaXMuY29uZmlnLmVxdWFsSGVpZ2h0O1xyXG5cdFx0aWYgKFxyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuJykubGVuZ3RoID09PSAxICYmXHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5oYXNDbGFzcygnTGlzdFJlY29yZHMnKVxyXG5cdFx0KSB7XHJcblx0XHRcdHRoaXMuJGdhbGxlcnkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuLkxpc3RSZWNvcmRzJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRnYWxsZXJ5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1jb250ZW50Jyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLiRnYWxsZXJ5SXRlbXMgPSB0aGlzLiRnYWxsZXJ5LmNoaWxkcmVuKCk7XHJcblx0XHR0aGlzLiRnYWxsZXJ5SXRlbXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdHZW5lcmljR2FsbGVyeS1pdGVtJykpIHtcclxuXHRcdFx0XHQkKHRoaXMpLndyYXAoJzxkaXYgY2xhc3M9XCJHZW5lcmljR2FsbGVyeS1pdGVtXCI+PC9kaXY+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0X3RoaXMuY2FsY3VsYXRlKDApO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0R2VuZXJpY0dhbGxlcnkucHJvdG90eXBlLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuZ2VuZXJpY0dhbGxlcnlSZXNpemVUaW1lcik7XHJcblx0XHR0aGlzLmdlbmVyaWNHYWxsZXJ5UmVzaXplVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHdpZGdldFdpZHRoID0gX3RoaXMuJHdpZGdldC5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHR2YXIgcGVyTGluZTtcclxuXHRcdFx0aWYgKHdpZGdldFdpZHRoID49IDE5MDApIHtcclxuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcEhEO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDE2MDApIHtcclxuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcEJpZztcclxuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSAxMzY2KSB7XHJcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc0Rlc2t0b3A7XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTAyNCkge1xyXG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wU21hbGw7XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gNDIwKSB7XHJcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc1RhYmxldDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zUGhvbmU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpdGVtV2lkdGggPSAxMDAgLyBwZXJMaW5lO1xyXG5cclxuXHRcdFx0dmFyIG1hcmdpbkxlZnQgPSBfdGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWFyZ2luLWxlZnQnKTtcclxuXHJcblx0XHRcdF90aGlzLiRnYWxsZXJ5LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJykuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpIHtcclxuXHRcdFx0XHRpZiAoJChlbCkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0tLXRyaXBsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdCQoZWwpLmNzcygnd2lkdGgnLCBpdGVtV2lkdGggKiAzICsgJyUnKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCQoZWwpLmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtLS1kb3VibGUnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHQkKGVsKS5jc3MoJ3dpZHRoJywgJ2NhbGMoJyArIGl0ZW1XaWR0aCAqIDIgKyAnJSknKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JChlbCkuY3NzKCd3aWR0aCcsICdjYWxjKCcgKyBpdGVtV2lkdGggKyAnJSAtICcgKyBtYXJnaW5MZWZ0ICsgJyknKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKF90aGlzLmNvbmZpZy5pdGVtc0JvcmRlciA9PT0gJ1JpZ2h0Jykge1xyXG5cdFx0XHRcdFx0aWYgKChpbmRleCArIDEpICUgcGVyTGluZSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHQkKGVsKS5jc3MoeyBib3JkZXJSaWdodDogMCB9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCQoZWwpLmNzcyh7IGJvcmRlclJpZ2h0OiAnJyB9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbCkuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdC5maW5kKCc+IHNwYW4nKVxyXG5cdFx0XHRcdFx0LmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRcdCQoZWwpLmFkZENsYXNzKF90aGlzLmNvbmZpZy5pdGVtc0JnQ29sb3IpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaXRlbXNCb3JkZXIgPT09ICdSaWdodCcpIHtcclxuXHRcdFx0XHRfdGhpcy4kZ2FsbGVyeVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJylcclxuXHRcdFx0XHRcdC5sYXN0KClcclxuXHRcdFx0XHRcdC5jc3MoeyBib3JkZXJSaWdodDogMCB9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5lcXVhbEhlaWdodCkge1xyXG5cdFx0XHRcdF90aGlzLnNhbWVIZWlnaHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGltZW91dCk7XHJcblx0fTtcclxuXHJcblx0R2VuZXJpY0dhbGxlcnkucHJvdG90eXBlLnNhbWVIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5jc3MoJ21pbi1oZWlnaHQnLCAnYXV0bycpO1xyXG5cdFx0dmFyIG1heEhlaWdodCA9IE1hdGgubWF4LmFwcGx5KFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR0aGlzLiRnYWxsZXJ5XHJcblx0XHRcdFx0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJylcclxuXHRcdFx0XHQubWFwKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuICQodGhpcykub3V0ZXJIZWlnaHQoZmFsc2UpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmdldCgpXHJcblx0XHQpO1xyXG5cdFx0dGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWluLWhlaWdodCcsIG1heEhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkdlbmVyaWNHYWxsZXJ5ID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRhbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gYWxsR2VuZXJpY0dhbGxlcmllcztcclxuXHRcdH0sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpXHJcblx0Lm9mZigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JylcclxuXHQub24oJ3Jlc2l6ZS5HZW5lcmljR2FsbGVyeScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGFsbEdlbmVyaWNHYWxsZXJpZXMgPSBTYXBwaGlyZVdpZGdldHMuR2VuZXJpY0dhbGxlcnkuYWxsKCk7XHJcblx0XHRhbGxHZW5lcmljR2FsbGVyaWVzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRlbGVtZW50LmNhbGN1bGF0ZSgyMDApO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbiIsIi8qIENvbXBvbmVudCBIb3Jpem9udGFsVG9vbGJhciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IGluaXQoKSk7XHJcblx0XHQkKHdpbmRvdykubG9hZCgoKSA9PiB7XHJcblx0XHRcdCQoJy5NZW51SXRlbVdyYXBwZXIuQWN0aXZlJylbMF0uc2Nyb2xsSW50b1ZpZXcoe1xyXG5cdFx0XHRcdGJlaGF2aW9yOiAnYXV0bycsXHJcblx0XHRcdFx0YmxvY2s6ICdlbmQnXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cclxuXHRcdGhhbmRsZUFycm93cygpO1xyXG5cclxuXHRcdCQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbCgoKSA9PiB7XHJcblx0XHRcdGhhbmRsZUFycm93cygpXHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjdXJyZW50U2Nyb2xsID0gJCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0XHR2YXIgbWF4U2Nyb2xsbCA9ICQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKS53aWR0aCgpIC0gJCgnLlRvb2xiYXJfX0l0ZW1zJykud2lkdGgoKTtcclxuXHRcdFx0dmFyIHNpZGVXaWR0aCA9IG1heFNjcm9sbGwgLSA1MDtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsTGVmdChjdXJyZW50U2Nyb2xsICsgNTApO1xyXG5cdFx0XHRpZiAoY3VycmVudFNjcm9sbCA9PSBzaWRlV2lkdGgpIHtcclxuXHRcdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY3VycmVudFNjcm9sbCAhPSA1MCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFNjcm9sbCA9ICQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoKTtcclxuXHRcdFx0dmFyIG1heFNjcm9sbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMgLkxpc3RSZWNvcmRzJykud2lkdGgoKSAtICQoJy5Ub29sYmFyX19JdGVtcycpLndpZHRoKCk7XHJcblx0XHRcdHZhciBzaWRlV2lkdGggPSBtYXhTY3JvbGxsIC0gNTA7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoY3VycmVudFNjcm9sbCAtIDUwKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgIT0gc2lkZVdpZHRoKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT0gNTApIHtcclxuXHRcdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS50b29sYmFyJywgKCkgPT4ge1xyXG5cdFx0XHRoYW5kbGVBcnJvd3MoKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHJcblx0aGFuZGxlQXJyb3dzID0gKCkgPT4ge1xyXG5cdFx0bGV0IGN1cnJlbnRTY3JvbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRsZXQgbWVudVdpZHRoID0gJCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpLndpZHRoKCk7XHJcblx0XHRsZXQgZXh0ZXJuYWxXaWR0aCA9ICQoJy5Ub29sYmFyX19JdGVtcycpLndpZHRoKCk7XHJcblx0XHR2YXIgbWF4U2Nyb2xsbCA9IG1lbnVXaWR0aCAtIGV4dGVybmFsV2lkdGg7XHJcblxyXG5cdFx0aWYgKGV4dGVybmFsV2lkdGggPiBtZW51V2lkdGgpIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLmhpZGUoKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfY29udGFpbmVyJykuYWRkQ2xhc3MoJ1Rvb2xiYXJfY29udGFpbmVyLS1ub2Fycm93cycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5zaG93KCk7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLnNob3coKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ1Rvb2xiYXJfY29udGFpbmVyLS1ub2Fycm93cycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjdXJyZW50U2Nyb2xsID09PSAwKSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjdXJyZW50U2Nyb2xsID49IG1heFNjcm9sbGwpIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkhvcml6b250YWxUb29sYmFyID0ge1xyXG5cdFx0Y3JlYXRlXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBIb3VyUGlja2VyICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNsYXNzIEhvdXJQaWNrZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoY29uZmlnKSB7XHJcblx0XHRcdC8vIE9wdGlvbnMgdXNlZCBieSBqUXVlcnkgVGltZXJwaWNrZXIgKEV4dGVybmFsIExpYilcclxuXHRcdFx0dGhpcy5vcHRpb25zID0ge1xyXG5cdFx0XHRcdC4uLmNvbmZpZyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMub25Db21wb25lbnRJbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNDb21wb25lbnRWYWxpZCgpIHtcclxuXHRcdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0bGV0IG1lc3NhZ2UgPSBgQ29tcG9uZW50IEhvdXJQaWNrZXIgKCR7dGhpcy5vcHRpb25zLndpZGdldElkfSk6YDtcclxuXHJcblx0XHRcdGlmICghdGhpcy4kaW5wdXQubGVuZ3RoIHx8IHRoaXMuJGlucHV0Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRtZXNzYWdlID0gYCR7bWVzc2FnZX0gbmVlZHMgb25lIC0gYW5kIGp1c3Qgb25lIC0gSU5QVVQgZWxlbWVudCFgO1xyXG5cdFx0XHRcdHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdmFsaWQpIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsaWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0Q29tcG9uZW50UG9zaXRpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3aWRnZXQgPSAkKCcudWktdGltZXBpY2tlci1jb250YWluZXInKTtcclxuXHRcdFx0Y29uc3QgbGFiZWxMZWZ0ID0gdGhpcy4kbGFiZWwub2Zmc2V0KCkubGVmdDtcclxuXHRcdFx0Y29uc3QgbGFiZWxXaWR0aCA9IHRoaXMuJGxhYmVsLndpZHRoKCk7XHJcblx0XHRcdGNvbnN0IGxhYmVsT3V0ZXJXaWR0aCA9IHRoaXMuJGxhYmVsLm91dGVyV2lkdGgoKTtcclxuXHRcdFx0Y29uc3Qgd2lkZ2V0T3V0ZXJXaWR0aCA9ICR3aWRnZXQub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRjb25zdCB3aWRnZXRNaW5XaWR0aCA9ICskd2lkZ2V0LmNzcygnbWluLXdpZHRoJykucmVwbGFjZSgncHgnLCAnJyk7XHJcblx0XHRcdGNvbnN0IGlzT3V0c2lkZVdpbmRvdyA9XHJcblx0XHRcdFx0bGFiZWxMZWZ0ICsgbGFiZWxPdXRlcldpZHRoID4gJCh3aW5kb3cpLnNjcm9sbExlZnQoKSArICQod2luZG93KS53aWR0aCgpIC0gd2lkZ2V0T3V0ZXJXaWR0aDtcclxuXHJcblx0XHRcdCR3aWRnZXQuY3NzKHtcclxuXHRcdFx0XHRsZWZ0OiAoKSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBsYWJlbExlZnQgLSAod2lkZ2V0TWluV2lkdGggLSBsYWJlbFdpZHRoKSAvIDI7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzT3V0c2lkZVdpbmRvdykgdmFsdWUgPSBsYWJlbExlZnQgKyBsYWJlbFdpZHRoIC0gd2lkZ2V0T3V0ZXJXaWR0aDtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSBsYWJlbExlZnQ7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldEVsZW1lbnRDbGFzcyhzZWxlY3RvciwgY2xhc3NOYW1lKSB7XHJcblx0XHRcdHJldHVybiBjbGFzc05hbWUgPyAkKHNlbGVjdG9yKS5hZGRDbGFzcyhjbGFzc05hbWUpIDogZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVmaW5lVGltZUZvcm1hdCgpIHtcclxuXHRcdFx0bGV0IGZvcm1hdCA9IFtdO1xyXG5cdFx0XHRsZXQgYW1QbSA9ICcnO1xyXG5cclxuXHRcdFx0Zm9ybWF0LnB1c2godGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0ID8gJ0hIJyA6ICdoaCcpO1xyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNob3dNaW51dGVzKSBmb3JtYXQucHVzaCgnbW0nKTtcclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaG93U2Vjb25kcykgZm9ybWF0LnB1c2goJ3NzJyk7XHJcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0KSBhbVBtID0gJyBwJztcclxuXHJcblx0XHRcdHJldHVybiBgJHtmb3JtYXQuam9pbignOicpfSR7YW1QbX1gO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnZlcnRUaW1lMTJ0bzI0KHZhbHVlKSB7XHJcblx0XHRcdGNvbnN0IFt0aW1lLCBtb2RpZmllcl0gPSB2YWx1ZS5zcGxpdCgnICcpO1xyXG5cdFx0XHRsZXQgW2hvdXJzLCBtaW51dGVzID0gJzAwJywgc2Vjb25kcyA9ICcwMCddID0gdGltZS5zcGxpdCgnOicpO1xyXG5cclxuXHRcdFx0aWYgKGhvdXJzID09PSAnMTInKSBob3VycyA9ICcwMCc7XHJcblx0XHRcdGlmIChtb2RpZmllciA9PT0gJ1BNJykgaG91cnMgPSBwYXJzZUludChob3VycywgMTApICsgMTI7XHJcblxyXG5cdFx0XHRyZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udmVydFRpbWVGb3JtYXRUb01hc2sodmFsdWUgPSAnJykge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUucmVwbGFjZSgvW2EtekEtWl0rL2csICctLScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uQ2hhbmdlRXZlbnQodmFsdWUgPSAnJykge1xyXG5cdFx0XHRsZXQgbW9kZWwgPSAnMDEtMDEtMTkwMCAwMDowMDowMCc7IC8vaS5lLiBudWxsXHJcblx0XHRcdGxldCBsYWJlbCA9IHRoaXMuY29udmVydFRpbWVGb3JtYXRUb01hc2sodGhpcy5vcHRpb25zLnRpbWVGb3JtYXQpO1xyXG5cclxuXHRcdFx0aWYgKHZhbHVlICYmICEhdmFsdWUudHJpbSgpKSB7XHJcblx0XHRcdFx0bW9kZWwgPSB0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQgPyB2YWx1ZSA6IHRoaXMuY29udmVydFRpbWUxMnRvMjQodmFsdWUpO1xyXG5cdFx0XHRcdGxhYmVsID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNOb3RpZnlFbmFibGVkKSBPc05vdGlmeVdpZGdldCh0aGlzLm9wdGlvbnMuaG91clBpY2tlckZha2VOb3RpZnlJZCwgbW9kZWwpO1xyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzVGV4dFRyaWdnZXJhYmxlKSB0aGlzLiRsYWJlbC50ZXh0KGxhYmVsKTtcclxuXHJcblx0XHRcdHRoaXMuJG1vZGVsLnZhbChtb2RlbCk7XHJcblx0XHRcdHRoaXMuJG1vZGVsLmNoYW5nZSgpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uQ29tcG9uZW50SW5pdCgpIHtcclxuXHRcdFx0dGhpcy4kY29tcG9uZW50ID0gJChgIyR7dGhpcy5vcHRpb25zLndpZGdldElkfWApO1xyXG5cdFx0XHR0aGlzLiRtb2RlbCA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fUGxhY2Vob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuXHRcdFx0dGhpcy4kaW5wdXQgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLkhvdXJQaWNrZXJfX0Rpc3BsYXllZCAuSG91clBpY2tlcl9fSW5wdXRWYWx1ZScpO1xyXG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gdGhpcy4kaW5wdXQ7XHJcblxyXG5cdFx0XHR0aGlzLm9wdGlvbnMudGltZUZvcm1hdCA9IHRoaXMuZGVmaW5lVGltZUZvcm1hdCgpO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLmlzQ29tcG9uZW50VmFsaWQoKSkgcmV0dXJuO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJ2Rpdi5Ib3VyUGlja2VyJyk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNUZXh0VHJpZ2dlcmFibGUpIHtcclxuXHRcdFx0XHRcdCRjb250YWluZXIuYWRkQ2xhc3MoJ0hvdXJQaWNrZXItLXRleHRUcmlnZ2VyJyk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kbGFiZWwgPSAkY29udGFpbmVyLmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0xhYmVsVmFsdWUnKTtcclxuXHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRsYWJlbDtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRsYWJlbC50ZXh0KHRoaXMuY29udmVydFRpbWVGb3JtYXRUb01hc2sodGhpcy5vcHRpb25zLnRpbWVGb3JtYXQpKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRsYWJlbC5vbignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGxhYmVsLnRpbWVwaWNrZXIoKS5vcGVuKCk7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLnNldENvbXBvbmVudFBvc2l0aW9uKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNDbGVhcmFibGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGJ1dHRvbkNsZWFyID0gJGNvbnRhaW5lci5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19CdXR0b25DbGVhcicpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGJ1dHRvbkNsZWFyLm9uKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5vbkNoYW5nZUV2ZW50KCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuJGVsZW1lbnQudGltZXBpY2tlcih7XHJcblx0XHRcdFx0XHQuLi50aGlzLm9wdGlvbnMsXHJcblx0XHRcdFx0XHRjaGFuZ2U6IHRpbWUgPT4gdGhpcy5vbkNoYW5nZUV2ZW50KHRpbWUgPyAkKCkudGltZXBpY2tlci5mb3JtYXRUaW1lKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0LCB0aW1lKSA6IG51bGwpLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnNldEVsZW1lbnRDbGFzcygnLnVpLXRpbWVwaWNrZXItY29udGFpbmVyJywgdGhpcy5vcHRpb25zLmN1cnJlbnRMb2NhbGUgPT09ICdBUicgPyAncnRsJyA6ICdsdHInKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknLCAhdGhpcy5vcHRpb25zLmlzVHlwZUVuYWJsZWQpO1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgdGhpcy5vcHRpb25zLnRpbWVGb3JtYXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEhvdXJQaWNrZXIoY29uZmlnKSk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ib3VyUGlja2VyID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICBjbGFzcyBJbnB1dFdpdGhDbGVhciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICB0aGlzLiR3aWRnZXQgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9YCk7XHJcbiAgICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJyk7XHJcbiAgICAgIHRoaXMuJGNsZWFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JbnB1dFdpdGhDbGVhci1jbGVhcicpO1xyXG4gICAgICB0aGlzLiRub3RpZnlMaW5rID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JbnB1dFdpdGhDbGVhci1ub3RpZnktbGluaycpO1xyXG4gICAgICB0aGlzLiR3aWRnZXRTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLS1zaGllbGQnKTtcclxuICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoKSB7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1cycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRjbGVhci5zaG93KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRpbnB1dC5vbignYmx1cicsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy4kaW5wdXQudmFsKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRub3RpZnlMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRjbGVhci5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kaW5wdXQudmFsKCcnKTtcclxuICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy4kbm90aWZ5TGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmhhc1NoaWVsZCkge1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHdpZGdldFNoaWVsZC5oaWRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy5jb25maWcuc2hpZWxkVGltZW91dCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNoaWVsZFRpbWVvdXQgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLiR3aWRnZXRTaGllbGQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgSW5wdXRXaXRoQ2xlYXIoY29uZmlnKSk7XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5JbnB1dFdpdGhDbGVhciA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH07XHJcblxyXG59KSgpOyIsIi8qIENvbXBvbmVudCBMb2NhdGlvbkJveCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuTG9jYXRpb25Cb3ggPSBmdW5jdGlvbihjbGlja2VkRWxlbWVudElkKSB7XHJcblx0aWYgKCQoJyMnICsgY2xpY2tlZEVsZW1lbnRJZCArICcnKS5oYXNDbGFzcygnT24nKSkge1xyXG5cdFx0JCgnLkRpc2FibGVSb29tJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnT2ZmJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ09uJyk7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucGFyZW50KCcuUm9vbUJveCcpXHJcblx0XHRcdFx0LmNzcyh7XHJcblx0XHRcdFx0XHRvcGFjaXR5OiAnMScsXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnIycgKyBjbGlja2VkRWxlbWVudElkICsgJycpXHJcblx0XHRcdC5hZGRDbGFzcygnT24nKVxyXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ09mZicpXHJcblx0XHRcdC5wYXJlbnQoJy5Sb29tQm94JylcclxuXHRcdFx0LmNzcyh7XHJcblx0XHRcdFx0b3BhY2l0eTogJzEnLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcblxyXG5cdFx0JCgnLkRpc2FibGVSb29tOm5vdCgjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnKScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ09mZicpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdPbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLkRpc2FibGVSb29tLk9mZicpXHJcblx0XHRcdC5wYXJlbnQoJy5Sb29tQm94JylcclxuXHRcdFx0LmNzcyh7XHJcblx0XHRcdFx0b3BhY2l0eTogJzAuMjUnLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcblx0fVxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgTWFpbkludGVyYWN0aXZlQ2FyZCAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFtdO1xyXG5cdHZhciBkZWZhdWx0RHVyYXRpb24gPSAzMDA7XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhbGxNYWluSW50ZXJhY3RpdmVDYXJkc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTWFpbkludGVyYWN0aXZlQ2FyZChjb25maWcpO1xyXG5cdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblxyXG5cdFx0aWYgKCEhIVNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgJiYgISFvc0FqYXhCYWNrZW5kKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xyXG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIE1haW5JbnRlcmFjdGl2ZUNhcmQgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmlzTG9ja2VkT25DbG9zZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pc09wZW4gPSBjb25maWcuaXNPcGVuO1xyXG5cdFx0dGhpcy5pc0VuYWJsZWQgPSBjb25maWcuaXNFbmFibGVkO1xyXG5cdFx0dGhpcy5pc1NlbGVjdGFibGUgPSBjb25maWcuaXNTZWxlY3RhYmxlO1xyXG5cdFx0dGhpcy5hbGxvd09wZW5pbmcgPSBjb25maWcuYWxsb3dPcGVuaW5nO1xyXG5cdFx0dGhpcy5ncmFkaWVudFdoZW5PcGVuID0gY29uZmlnLmdyYWRpZW50V2hlbk9wZW47XHJcblx0XHR0aGlzLmFsbG93TXVsdGlwbGVPcGVuID0gY29uZmlnLmFsbG93TXVsdGlwbGVPcGVuO1xyXG5cdFx0dGhpcy5lbWl0Tm90aWZ5T25PcGVuID0gY29uZmlnLmVtaXROb3RpZnlPbk9wZW47XHJcblx0XHR0aGlzLmhpZGVBY3Rpb25zT25PcGVuID0gY29uZmlnLmhpZGVBY3Rpb25zT25PcGVuO1xyXG5cdFx0dGhpcy5oaWRlQ2FwdGlvbk9uT3BlbiA9IGNvbmZpZy5oaWRlQ2FwdGlvbk9uT3BlbjtcclxuXHRcdHRoaXMuaGlkZVRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVUaXRsZU9uT3BlbjtcclxuXHRcdHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVTdWJUaXRsZU9uT3BlbjtcclxuXHRcdHRoaXMuaGVhZGVySGVpZ2h0V2hlbk9wZW4gPSBjb25maWcuaGVhZGVySGVpZ2h0V2hlbk9wZW47XHJcblx0XHR0aGlzLk1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQgPSBjb25maWcubWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZDtcclxuXHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3aWRnZXQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR0aGlzLiRjYXJkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQnKTtcclxuXHRcdHRoaXMuJGhlYWRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJUZXh0ID0gdGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0Jyk7XHJcblx0XHR0aGlzLiRib2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiBkaXYgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1ib2R5Jyk7XHJcblx0XHR0aGlzLiRhY3Rpb25zID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLWFjdGlvbnMnKTtcclxuXHRcdHRoaXMuJGNhcHRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC1jYXB0aW9uJyk7XHJcblx0XHR0aGlzLiR0aXRsZSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LXRpdGxlJyk7XHJcblx0XHR0aGlzLiRzdWJUaXRsZSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LXN1YnRpdGxlJyk7XHJcblx0XHR0aGlzLiRzZWxlY3RUcmlnZ2VyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItc2VsZWN0YWJsZSA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJHNlbGVjdFBsYWNlaG9sZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUtcGxhY2Vob2xkZXInKTtcclxuXHRcdHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRyaWdnZXJBY3Rpb24tcGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRpZiAodGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlciA9IHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlci5maW5kKCdhJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNPcGVuKSB7XHJcblx0XHRcdHRoaXMub3BlbihmYWxzZSwgLTEpO1xyXG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdmb3JjZU9wZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKHRoaXMuaGVhZGVySGVpZ2h0V2hlbk9wZW4gKyAnSGVhZGVyJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuYWxsb3dPcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2FsbG93T3BlbmluZycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmdyYWRpZW50V2hlbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnZ3JhZGllbnRXaGVuT3BlbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblxyXG5cdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG5cdFx0XHRtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24sIGluZGV4KSB7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uZmlnLndpZGdldElkKSwge1xyXG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdHN1YnRyZWU6IHRydWUsXHJcblx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRpZiAoISF0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMnKS5sZW5ndGggJiYgdGhpcy5pc09wZW4pIHtcclxuXHRcdFx0dmFyIGFic29sdXRlQWN0aW9uc1dpZHRoID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zJykubWFwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHR9KS5nZXQoKSk7XHJcblx0XHRcdHZhciBoZWFkZXJNYXhXaWR0aCA9IHRoaXMuJGhlYWRlci53aWR0aCgpIC0gYWJzb2x1dGVBY3Rpb25zV2lkdGg7XHJcblx0XHRcdGlmIChoZWFkZXJNYXhXaWR0aCA+IDEwKSB7XHJcblx0XHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IGhlYWRlck1heFdpZHRoICsgJ3B4J1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGJvZHkuZmluZCgnPiBkaXYgLk1haW5JbnRlcmFjdGl2ZUNhcmQtYWJzb2x1dGUtYWN0aW9ucyAuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XHJcblx0XHRcdFx0bWF4V2lkdGg6ICc5OSUnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKCEhX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKVswXSAmJiAhIV90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdyAmJiBfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cuU2FwcGhpcmVXaWRnZXRzICYmIF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdy5TYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdy5TYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5hdHRhY2hFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1vcGVuOm5vdChbZGlzYWJsZWRdKScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdF90aGlzLm9wZW4odHJ1ZSk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGhlYWRlci5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRfdGhpcy5jbG9zZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5hbGxvd09wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdGlmICgkKGV2dC50YXJnZXQpLmhhc0NsYXNzKCdCdXR0b24nKSkge1xyXG5cdFx0XHRcdFx0Ly8gdGhlIHVzZXIgY2xpY2tlZCBvbiBhIEJ1dHRvbiBpbnNpZGUgdGhlIGhlYWRlciwgbm90aGluZyB0byBkbyBoZXJlXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChfdGhpcy5pc09wZW4pIHtcclxuXHRcdFx0XHRcdFx0aWYgKF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gZG8gbm90IGNsb3NlIHdoZW4gYW5kIGlmcmFtZSBleGlzdHNcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5maW5kKCdhJykubGVuZ3RoID4gMCAmJlxyXG5cdFx0XHRcdFx0XHRcdF90aGlzLiRhY3Rpb25zLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLmxlbmd0aCA+IDBcclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gZG8gbm90IGNsb3NlIHdoZW4gdGhlIGNhcmQgaGFzIGFjdGlvbnNcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5vcGVuKHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc1NlbGVjdGFibGUpIHtcclxuXHRcdFx0dGhpcy4kc2VsZWN0VHJpZ2dlci5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRpZiAoX3RoaXMuJHNlbGVjdFBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdF90aGlzLiRzZWxlY3RQbGFjZWhvbGRlci5maW5kKCdhJykuY2xpY2soKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdZb3UgbmVlZCAxIGxpbmsgaW4gdGhpcyBwbGFjZWhvbGRlci4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoc2VuZE5vdGlmeSwgZHVyYXRpb24pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IGRlZmF1bHREdXJhdGlvbjtcclxuXHRcdHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuXHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0aWYgKHRoaXMuaGlkZUFjdGlvbnNPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kYWN0aW9ucy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHRpdGxlLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlU3ViVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kc3ViVGl0bGUuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmhpZGVDYXB0aW9uT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGNhcHRpb24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmVtaXROb3RpZnlPbk9wZW4pIHtcclxuXHRcdFx0aWYgKHNlbmROb3RpZnkpIHtcclxuXHRcdFx0XHRPc05vdGlmeVdpZGdldCh0aGlzLk1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQsICdvcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kYm9keS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy4kdHJpZ2dlcikge1xyXG5cdFx0XHR0aGlzLiR0cmlnZ2VyLmNsaWNrKCk7XHJcblx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoZHVyYXRpb24gPiAwKSB7XHJcblx0XHRcdFx0dGhpcy4kYm9keS5zbGlkZURvd24oZHVyYXRpb24pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxICYmICF0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuaGFzQ2xhc3MoJ2NrZV93eXNpd3lnX2ZyYW1lJykpIHtcclxuXHRcdFx0dmFyIGlmcmFtZUNvbnRlbnRzID0gdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmNvbnRlbnRzKCk7XHJcblx0XHRcdGlmcmFtZUNvbnRlbnRzLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmFsbG93TXVsdGlwbGVPcGVuKSB7XHJcblx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goaXRlbSA9PiAoaXRlbSAhPT0gdGhpcyAmJiBpdGVtLmFsbG93T3BlbmluZyA/IGl0ZW0uY2xvc2UoZHVyYXRpb24pIDogbnVsbCkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBkZWZhdWx0RHVyYXRpb247XHJcblx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kY2FyZC5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmhhc0NsYXNzKCdja2Vfd3lzaXd5Z19mcmFtZScpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kYm9keS5zbGlkZVVwKGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChzZWxmLiRjYXJkLmhhc0NsYXNzKCdmb3JjZU9wZW4nKSkge1xyXG5cdFx0XHRcdHNlbGYuJGNhcmQucmVtb3ZlQ2xhc3MoJ2ZvcmNlT3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmhpZGVBY3Rpb25zT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGFjdGlvbnMuc2hvdygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHRpdGxlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHN1YlRpdGxlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZUNhcHRpb25Pbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kY2FwdGlvbi5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGhlYWRlclRleHQuY3NzKHtcclxuXHRcdFx0bWF4V2lkdGg6ICc5OSUnXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pc09wZW47XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYWxsTWFpbkludGVyYWN0aXZlQ2FyZHM7XHJcblx0XHR9LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoISEkKCcuTWFpbkludGVyYWN0aXZlQ2FyZCcpLmxlbmd0aCkge1xyXG5cdFx0aWYgKCEhIVNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQpIHtcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XHJcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XHJcblx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0fSk7XHJcblx0fSwgMTAwMCk7XHJcblxyXG59KTsiLCIvKiBDb21wb25lbnQgTWVudUJhciAqL1xyXG5TYXBwaGlyZVdpZGdldHMuTWVudUJhciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdCQoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgJG1lbnVXaWRnZXQgPSAkKCcjJyArIGNvbmZpZy5tZW51V2lkZ2V0KTtcclxuXHJcblx0XHR2YXIgbWVudVJlc2lkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIG5hdldpZHRoID0gMDtcclxuXHRcdFx0dmFyIGF2YWlsYWJlRXNwYWNlID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbScpLndpZHRoKCk7XHJcblxyXG5cdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9pdGVtIC5NZW51SXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bmF2V2lkdGggKz0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChuYXZXaWR0aCA+IGF2YWlsYWJlRXNwYWNlKSB7XHJcblx0XHRcdFx0dmFyIGxhc3RJdGVtID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5sYXN0KCk7XHJcblx0XHRcdFx0bGFzdEl0ZW0uYXR0cignZGF0YS13aWR0aCcsIGxhc3RJdGVtLm91dGVyV2lkdGgodHJ1ZSkpO1xyXG5cdFx0XHRcdGxhc3RJdGVtLnByZXBlbmRUbygkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKSk7XHJcblx0XHRcdFx0bWVudVJlc2lkZXIoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZmlyc3RNb3JlRWxlbWVudCA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lciAuTWVudUl0ZW0nKS5maXJzdCgpO1xyXG5cdFx0XHRcdGlmIChuYXZXaWR0aCArIGZpcnN0TW9yZUVsZW1lbnQuZGF0YSgnd2lkdGgnKSA8IGF2YWlsYWJlRXNwYWNlKSB7XHJcblx0XHRcdFx0XHRmaXJzdE1vcmVFbGVtZW50Lmluc2VydEFmdGVyKCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykubGFzdCgpKTtcclxuXHRcdFx0XHRcdG1lbnVSZXNpZGVyKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoISRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lcicpLmlzKCc6ZW1wdHknKSkge1xyXG5cdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudUl0ZW0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdCEkKHRoaXMpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5oYXNDbGFzcygnTWVudWJhcl9fZXh0cmFDb250YWluZXInKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmVJbmRpY2F0b3InKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkbWVudVdpZGdldC5maW5kKCcuYWN0aXZlSW5kaWNhdG9yJykuYWRkQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcclxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlSW5kaWNhdG9yJykpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcclxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxyXG5cdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbSAuaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXIgJykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm1vdXNldXAoZSA9PiB7XHJcblx0XHRcdHZhciAkbWVudSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbS5hY3RpdmUnKTtcclxuXHRcdFx0dmFyICRtb3JlT3B0aW9ucyA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpO1xyXG5cclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIG1lbnUgb3IgYSBkZXNjZW5kYW50IG9mIHRoZSBtZW51XHJcblx0XHRcdGlmICgkbWVudS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0aWYgKCEkbWVudS5pcyhlLnRhcmdldCkgJiYgJG1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdCRtZW51LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghJG1vcmVPcHRpb25zLmlzKGUudGFyZ2V0KSAmJiAkbW9yZU9wdGlvbnMuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHQkbW9yZU9wdGlvbnMuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZSBsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdG1lbnVSZXNpZGVyKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuIiwiLyogQ29tcG9uZW50IE11bHRpcGxlU2VsZWN0aW9uQnV0dG9uICovXHJcblNhcHBoaXJlV2lkZ2V0cy5NdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKFdyYXBwZXJJZCkge1xyXG5cdHZhciAkd2lkZ2V0ID0gJChXcmFwcGVySWQpO1xyXG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcblxyXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpkaXNhYmxlZCcpKSB7XHJcblx0XHQkKFdyYXBwZXJJZCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHR9XHJcblxyXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdCQoV3JhcHBlcklkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG5cclxuXHQkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCR3aWRnZXQuZmluZCgnLk11bHRpcGxlU2VsZWN0aW9uQnV0dG9uLWxhYmVsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHQvLyAkY29udHJvbC5wcm9wKFwiY2hlY2tlZFwiLCAhJGNvbnRyb2wucHJvcChcImNoZWNrZWRcIikpO1xyXG5cdFx0JGNvbnRyb2xbMF0uY2xpY2soKTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxMCk7XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBDb25maXJtYXRpb25QYW5lbDNPcHRpb25zIENvbmZpcm1hdGlvblBhbmVsIHNhbWUgamF2YXNjcmlwdCBjb2RlKi9cclxuXHJcblNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbCA9IHtcclxuXHRpc0FueVBhbmVsT3BlbmVkOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJykgJiYgJCgnLlBhbmVsQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcclxuXHRcdGlmICghT3NWYWxpZGF0b3JPblN1Ym1pdCgpKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCFTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuaXNBbnlQYW5lbE9wZW5lZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlSW4oMTQwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBQYW5lbElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVUb2dnbGUoMTUwKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjbG9zZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0c2V0UGFuZWxCZWhhdmlvcjogZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRoaXNfcGFuZWwgPSAkKHRoaXMpO1xyXG5cdFx0XHQkKCcjJyArIHRoaXNfcGFuZWwuYXR0cigncGFuZWwtdHJpZ2dlci1lbGVtZW50aWQnKSArICcnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwudG9nZ2xlUGFuZWwodGhpc19wYW5lbC5hdHRyKCdpZCcpKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcigpO1xyXG5cdGlmIChvc0FqYXhCYWNrZW5kLkV2ZW50SGFuZGxlcnMuQWZ0ZXJBamF4UmVxdWVzdC50b1N0cmluZygpLmluZGV4T2YoJ3NldFBhbmVsQmVoYXZpb3InKSA9PSAtMSkge1xyXG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XHJcblx0fVxyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IFBhbmVsQnlJRE5vdGlmeSAqL1xyXG52YXIgcGFuZWxOb3RpZnlXaWRnZXQ7XHJcblNhcHBoaXJlV2lkZ2V0cy5QYW5lbEJ5SWROb3RpZnkgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cdHRvZ2dsZVBhbmVsQnlOb3RpZnk6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHRpZiAoIWlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoanVzdERyYWdnZWQgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdCQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ21hcmdpbi1sZWZ0JywgcGFuZWxNYXJnaW5MZWZ0KVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MocGFuZWxBcnJvd0NsYXNzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVEb3duKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZU91dCgxNDApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0b2dnbGVQYW5lbE5vdGlmeUJ5SWQ6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHQkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdC5mYWRlVG9nZ2xlKDE0MCk7XHJcblxyXG5cdFx0cGFuZWxOb3RpZnlXaWRnZXQgPSAkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5hdHRyKCdOb3RpZnlJZCcpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBQYW5lbEJ5SUQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlBhbmVsQnlJZCA9e1xyXG5cdGlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkOmZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0fSxcclxuXHRcclxuXHR0b2dnbGVQYW5lbEJ5SWQ6ZnVuY3Rpb24gKElkKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcblx0XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZUluKDE0MCk7XHJcblx0XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBqdXN0RHJhZ2dlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdGlmIChqdXN0RHJhZ2dlZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHQkKCcuUGFuZWxCeUlkTmV3X1BhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhwYW5lbEFycm93Q2xhc3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHRcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlT3V0KDE0MCk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4iLCIvKiBDb21wb25lbnQgUG9wVXBNZW51ICovXHJcblxyXG5TYXBwaGlyZVdpZGdldHMuUG9wVXBNZW51ID0ge1xyXG5cdG1lbnVQb3NpdGlvbjogZnVuY3Rpb24gKGlkLCBDb250ZXh0KSB7XHJcblx0XHQvKiBIaWRlIGFueSBvdGhlciBtZW51cyBvbiBwYWdlIGFuZCBzZXQgYnV0dG9uIGFzIGNvbGxhcHNlZC4gKi9cclxuXHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblxyXG5cdFx0Ly92YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIF90aGlzID0gJCgnIycgKyBpZCk7XHJcblx0XHR2YXIgWHggPSAwO1xyXG5cdFx0dmFyIFl5ID0gMDtcclxuXHRcdHZhciBXdyA9IDA7XHJcblx0XHR2YXIgSGggPSAwO1xyXG5cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWV4cGFuZDp2aXNpYmxlJykuaGlkZSgpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgbWVudSBlbGVtZW50LiAqL1xyXG5cdFx0dmFyIF9lbCA9IF90aGlzLm5leHQoJy5wb3B1cC1tZW51Jyk7XHJcblxyXG5cdFx0LyogRGlzcGxheSB0aGUgbWVudS4gKi9cclxuXHRcdF9lbC5zaG93KCk7XHJcblxyXG5cdFx0LyogU2V0IGJ1dHRvbiBjb2xsYXBzZS4gKi9cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWNvbGxhcHNlJykuc2hvdygpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYnV0dG9uLiAqL1xyXG5cdFx0YnV0dG9uSGggPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG5cdFx0YnV0dG9uV3cgPSBfdGhpcy5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvblkgPSBfdGhpcy5wb3NpdGlvbigpLnRvcCArIGJ1dHRvbkhoO1xyXG5cdFx0dmFyIGJ1dHRvblggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0Ly92YXIgYnV0dG9uWCA9IF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpc3RhbmNlIG9mIG1lbnUgYnV0dG9uIGFuZCB0aGUgcGFyZW50IGVsZW1lbnQgKi9cclxuXHRcdHZhciBwb3B1cFBhcmVudFh4ID0gX3RoaXMub2Zmc2V0KCkubGVmdCAtIF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHR2YXIgcG9wdXBYeCA9IF9lbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvcHVwV3cgPSBfZWwub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdFh4ID0gTWF0aC5hYnMoYnV0dG9uWCAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4KTtcclxuXHRcdFl5ID0gTWF0aC5hYnMoYnV0dG9uSGggLSBidXR0b25ZIC0gJCgnYm9keScpLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHQvKiBDaGVjayBpZiBjbGlja2VkIHBvc2l0aW9uIHBsdXMgdGhlIHBvcHVwIHdpZHRoIGV4Y2VlZCB0aGUgd2luZG93IHdpZHRoLiAqL1xyXG5cdFx0aWYgKGJ1dHRvblggKyBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSA+ICQoQ29udGV4dCkud2lkdGgoKSkge1xyXG5cdFx0XHRYeCA9IGJ1dHRvblggLSBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSAtIHBvcHVwUGFyZW50WHggKyBidXR0b25XdztcclxuXHRcdFx0Ly9YeCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIHBvcHVwV3cpIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgbWVudSBwb3NpdGlvbi4gKi9cclxuXHRcdF9lbC5jc3Moe1xyXG5cdFx0XHRsZWZ0OiBYeCArICdweCcsXHJcblx0XHRcdHRvcDogYnV0dG9uWSArICdweCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qIFJlZnJlc2ggdmFsdWUgKi9cclxuXHRcdHBvcHVwWHggPSBfZWwub2Zmc2V0KCkubGVmdDtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25FbCA9IF9lbC5jaGlsZHJlbignLnBvcHVwLW1lbnUtYmFsbG9vbicpO1xyXG5cclxuXHRcdHZhciBfYmFsbG9vblh4ID0gX2JhbGxvb25FbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIF9iYWxsb29uV3cgPSBfYmFsbG9vbkVsLm91dGVyV2lkdGgoKTtcclxuXHRcdHZhciBfYmFsbG9vblBvc1h4ID0gTWF0aC5hYnMoYnV0dG9uWCAtIFh4IC0gcG9wdXBQYXJlbnRYeCk7XHJcblxyXG5cdFx0LyogSXMgdGhlIGJhbGxvb24gaWNvbiBwb3NpdGlvbmVkIG91dCBvZiB0aGUgcG9wdXAgbWVudT8gKi9cclxuXHRcdGlmIChfYmFsbG9vblBvc1h4ICsgWHggKyBfYmFsbG9vbld3ID4gWHggKyBwb3B1cFd3KSB7XHJcblx0XHRcdF9iYWxsb29uUG9zWHggPSBfYmFsbG9vblBvc1h4IC0gX2JhbGxvb25XdztcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgcG9zaXRpb24gb2YgdGhlIGJhbGxvb24gZWZmZWN0LiAqL1xyXG5cdFx0X2JhbGxvb25FbC5jc3MoJ2xlZnQnLCBfYmFsbG9vblBvc1h4ICsgJ3B4Jyk7XHJcblx0fSxcclxuXHRtZW51RXZlbnRzOiBmdW5jdGlvbiAoQ29udGV4dCkge1xyXG5cdFx0JCgnLnBvcHVwLWJ1dHRvbicpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Qb3BVcE1lbnUubWVudVBvc2l0aW9uKGlkLCBDb250ZXh0KTtcclxuXHJcblx0XHRcdFx0LyplLnN0b3BQcm9wYWdhdGlvbigpOyovXHJcblxyXG5cdFx0XHRcdC8qIFByZXZlbnQgbGluayBzdWJtaXNzaW9uICovXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQvKiB2ICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogdiAqL1xyXG5cdFx0ZnVuY3Rpb24gUE1DbGlja091dHNpZGUoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50Lmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0LyppZiAoKHRhcmdldC5wYXJlbnRzKCkuaW5kZXgoJCgnYVtzYXBwaGlyZWhvc3BpdGFsXSwgLkhvc3BpdGFsUG9wVXAnKSkgPT0gLTEpKSB7fSovXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFxyXG5cdFx0XHRcdFx0XHQnLnBvcHVwLWJ1dHRvbiwgLnBvcHVwLW1lbnUsIC5vcy1pbnRlcm5hbC11aS1hdXRvY29tcGxldGUsIC5vcy1pbnRlcm5hbC11aS1tZW51LWl0ZW0sIC5vcy1pbnRlcm5hbC11aS1jb3JuZXItYWxsLCB1aS1hdXRvY29tcGxldGUtaXRlbSdcclxuXHRcdFx0XHRcdCkubGVuZ3RoXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQkKCcucG9wdXAtbWVudTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1leHBhbmQnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0dmFyIF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0UE1DbGlja091dHNpZGUoZXZlbnQpO1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKCFfUE1Jc0RyYWcgJiYgX1BNSXNDbGljaykge1xyXG5cdFx0XHRcdFBNQ2xpY2tPdXRzaWRlKGV2ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkKCdib2R5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQvKiBeICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogXiAqL1xyXG5cdH1cclxufTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVQYW5lbCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVQYW5lbCA9IHtcclxuXHRjaGVja09wZW5QYW5lbDogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpICYmICQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZVNhcHBoaXJlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcclxuXHRcdGlmICghT3NWYWxpZGF0b3JPblN1Ym1pdCgpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIVNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLmNoZWNrT3BlblBhbmVsKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0XHQuZmluZCgnLlNhcHBoaXJlUGFuZWxfQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNsb3NlU2FwcGhpcmVQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xyXG5cdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlT3V0KDE0MCk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBQYW5lbElkKVxyXG5cdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxyXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcblxyXG5cdHNldFBhbmVsQmVoYXZpb3I6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlBhbmVsW3BhbmVsLXRyaWdnZXItZWxlbWVudGlkXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcclxuXHRcdFx0JCgnIycgKyB0aGlzX3BhbmVsLmF0dHIoJ3BhbmVsLXRyaWdnZXItZWxlbWVudGlkJykgKyAnJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwudG9nZ2xlU2FwcGhpcmVQYW5lbCh0aGlzX3BhbmVsLmF0dHIoJ2lkJykpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcclxuXHJcblx0aWYgKG9zQWpheEJhY2tlbmQuRXZlbnRIYW5kbGVycy5BZnRlckFqYXhSZXF1ZXN0LnRvU3RyaW5nKCkuaW5kZXhPZignc2V0UGFuZWxCZWhhdmlvcicpID09IC0xKSB7XHJcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IpO1xyXG5cdH1cclxufSk7XHJcbiIsInJlcXVpcmUoJy4vY29uZmlybWF0aW9uLXBhbmVsJyk7XHJcbnJlcXVpcmUoJy4vcGFuZWwtYnktaWQnKTtcclxuLy9yZXF1aXJlKCcuL3BhbmVsLWJ5LWlkLW5vdGlmeScpO1xyXG5yZXF1aXJlKCcuL3BvcHVwLW1lbnUnKTtcclxucmVxdWlyZSgnLi9zYXBwaGlyZS1wYW5lbCcpO1xyXG5cclxuIiwiLyogQ29tcG9uZW50IFBhdGllbnRDYWxsQ2FuY2VsICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgaW50ZXJ2YWw7XHJcblx0XHR2YXIgdGltZUNvdW50ZXI7XHJcblx0XHR2YXIgJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKS5maW5kKCcuUGF0aWVudENhbGxDYW5jZWwnKTtcclxuXHRcdHZhciAkY291bnRkb3duID0gJHdpZGdldC5maW5kKCcuUGF0aWVudENhbGxDYW5jZWwtY291bnRlcicpO1xyXG5cdFx0dmFyICRsYWJlbCA9ICR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWxhYmVsJyk7XHJcblxyXG5cdFx0dmFyIHNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGVfaW4sIHRleHRfaW4pIHtcclxuXHRcdFx0Ly9qcy1pZGxlLCBqcy1jYWxsaW5nXHJcblx0XHRcdCR3aWRnZXQuZmluZCgnPiBkaXYnKS5wcm9wKCdjbGFzcycsIHN0YXRlX2luKTtcclxuXHRcdFx0JGxhYmVsLnRleHQodGV4dF9pbik7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBjYWxsUGF0aWVudCA9IGZ1bmN0aW9uKCR3aWRnZXQpIHtcclxuXHRcdFx0c2V0U3RhdGUoJ2pzLWNhbGxpbmcnLCBjb25maWcudHh0Q2FsbFBhdGllbnQpO1xyXG5cdFx0XHRpZiAoY29uZmlnLnNob3dDb3VudGRvd24pIHtcclxuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbiArICcgJyArIGNvbmZpZy50aW1lVG9DYW5jZWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRjb3VudGRvd24udGV4dChjb25maWcudHh0Q2FsbGluZ0luKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdGFydENvdW50ZXIoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHN0YXJ0Q291bnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aW1lQ291bnRlciA9IGNvbmZpZy50aW1lVG9DYW5jZWw7XHJcblx0XHRcdGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHVwZGF0ZUNvdW50ZXIsIDEwMDApO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgdXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aW1lQ291bnRlci0tO1xyXG5cdFx0XHRpZiAodGltZUNvdW50ZXIgPT09IDApIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0XHR2YXIgbm90aWZpY2F0aW9uID0gJyc7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoY29uZmlnLnBhdGllbnRDYWxsRmFrZU5vdGlmeUlkLCBub3RpZmljYXRpb24pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikge1xyXG5cdFx0XHRcdCRjb3VudGRvd24udGV4dChjb25maWcudHh0Q2FsbGluZ0luICsgJyAnICsgdGltZUNvdW50ZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRjb3VudGRvd24udGV4dChjb25maWcudHh0Q2FsbGluZ0luKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQkd2lkZ2V0LmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbC1jYW5jZWwtLWxhYmVsJykudGV4dChjb25maWcudHh0Q2FuY2VsKTtcclxuXHJcblx0XHRzZXRTdGF0ZSgnanMtaWRsZScsIGNvbmZpZy50eHRDYWxsUGF0aWVudCk7XHJcblxyXG5cdFx0JHdpZGdldC5vbignY2xpY2snLCAnLmpzLWlkbGUgLlBhdGllbnRDYWxsQ2FuY2VsLWxhYmVsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNhbGxQYXRpZW50KCR3aWRnZXQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JHdpZGdldC5vbignY2xpY2snLCAnLmpzLWlkbGUgLlBhdGllbnRDYWxsQ2FuY2VsLWljb24nLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbFBhdGllbnQoJHdpZGdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkd2lkZ2V0Lm9uKCdjbGljaycsICcuanMtY2FsbGluZyAuUGF0aWVudENhbGxDYW5jZWwtY2FuY2VsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcclxuXHRcdFx0JGNvdW50ZG93bi50ZXh0KHRpbWVDb3VudGVyKTtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcblx0XHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5QYXRpZW50Q2FsbENhbmNlbCA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFBlcnNvbkNhcmQgKi9cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0dmFyIFBlcnNvbkNhcmRFdmVudCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlBlcnNvbkNhcmRfX3RpdGxlLCAuUGVyc29uQ2FyZF9fY29udGVudCcpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRoZWFkZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5QZXJzb25DYXJkX2hlYWRlcicpO1xyXG5cdFx0XHRcdCRjb250ZW50ID0gJGhlYWRlci5uZXh0KCk7XHJcblx0XHRcdFx0aWYgKCRjb250ZW50LmNoaWxkcmVuKCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0JGNvbnRlbnQuc2xpZGVUb2dnbGUoNTAwKTtcclxuXHRcdFx0XHRcdGlmICgkKCcuUGVyc29uQ2FyZC5Jc09wZW4nKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLlBlcnNvbkNhcmQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnSXNPcGVuJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5QZXJzb25DYXJkJylcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0lzT3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JCgnLlN0b3BQcm9wYWdhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9KTtcclxuXHJcblx0UGVyc29uQ2FyZEV2ZW50KCk7XHJcblxyXG5cdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoUGVyc29uQ2FyZEV2ZW50KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBQcmVzY3JpcHRpb25DYXJkICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkuY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRzaG93TW9yZSgkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2hvd01vcmUgPSBlbGVtZW50ID0+IHtcclxuXHRcdGNvbnN0IHBhcmVudHMgPSBlbGVtZW50LnBhcmVudHMoJy5QcmVzY3JpcHRpb25DYXJkJyk7XHJcblxyXG5cdFx0aWYgKHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykuaGFzQ2xhc3MoJ0lzT3BlbicpKSB7XHJcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykucmVtb3ZlQ2xhc3MoJ0lzT3BlbicpO1xyXG5cclxuXHRcdFx0ZWxlbWVudC50ZXh0KCdTZWUgTW9yZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5hZGRDbGFzcygnSXNPcGVuJyk7XHJcblxyXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBMZXNzJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlByZXNjcmlwdGlvbkNhcmQgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFByZXNjcmlwdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0ZnVuY3Rpb24gUHJlc2NyaXB0aW9uRXhwYW5kYWJsZU9iaigpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHQvLyBpZigkKG9iKS5oYXNDbGFzcyhcImlzTGlua0VwYW5kYWJsZVwiKSl7XHJcblx0XHRcdGlmICgkKG9iKS5oYXNDbGFzcygnUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXJfX0xpbmtzRGl2JykpIHtcclxuXHRcdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKTtcclxuXHJcblx0XHRcdC8vIGdldCBpZFxyXG5cdFx0XHR2YXIgaWQgPSBTZWN0aW9uLmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0XHR2YXIgdGVtcEhlaWdodCA9IDA7XHJcblxyXG5cdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHQsIGR1cmluZyB0aGlzIHByb2Nlc3MsIHRyYW5zaXRpb25zIGFyZSBkaXNhYmxlZFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblxyXG5cdFx0XHRcdC8vIENvbGxhcHNlIGNvbnRlbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0dGVtcEhlaWdodCA9IFNlY3Rpb25Db250ZW50LmhlaWdodCgpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQodGVtcEhlaWdodCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gcmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0U2VjdGlvbi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQub24odHJhbnNpdGlvbkV2ZW50LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyJykub2ZmKCk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgaW5wdXQsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBzZWxlY3QsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBhJ1xyXG5cdFx0XHQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25QcmVzY3JpcHRpb25FeHBhbmRhYmxlQXJlYScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gaWYgbmV3IFNlY3Rpb25FeHBhbmRhYmxlIHRoZW4gYWRkIHRvIHByZXZpZXdzdGF0IGFycmF5XHJcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uUHJlc2NyaXB0aW9uRXhwYW5kYWJsZUFyZWEnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCQoJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ05vdEV4cGFuZGFibGUnKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXNMaW5rRXBhbmRhYmxlQ2xpY2snKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyX19MaW5rc0RpdicpXHJcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGlucHV0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgc2VsZWN0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgUHJlc2NyaXB0aW9uRXhwYW5kYWJsZU9iaigpO1xyXG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBXZWJQYXR0ZXJucy9Db250ZW50L1NlY3Rpb25FeHBhbmRhYmxlJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlByZXNjcmlwdGlvbkV4cGFuZGFibGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBTYXBwaGlyZUhlYWRlciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTYXBwaGlyZUhlYWRlcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBoYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgU2FwcGhpcmVIZWFkZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmlzQ29uZmlkZW50aWFsID0gY29uZmlnLmlzQ29uZmlkZW50aWFsO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmNzcyh7XHJcblx0XHRcdGRpc3BsYXk6ICdibG9jaydcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlcicpO1xyXG5cdFx0dGhpcy4kZGVtb2dyYXBoaWMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWRlbW9ncmFwaGljcycpO1xyXG5cdFx0dGhpcy4kaW5mb3JtYXRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWluZm9ybWF0aW9uJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC10cmlnZ2VyJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC1jb250ZW50Jyk7XHJcblx0XHR0aGlzLmhhbmRsZVJlc2l6ZSgpO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcclxuXHRcdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHRcdFx0fSwgNTAwKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb25maWc7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0X3RoaXMuaGFuZGxlRGVtb2dyYXBoaWNzKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKF90aGlzLiRoZWFkZXIuaGFzQ2xhc3MoJ2lzT3BlbicpKSB7XHJcblx0XHRcdFx0X3RoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kZGVtb2dyYXBoaWMuZmluZCgnLkRlbW9ncmFwaGljLWl0ZW0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0dGhpcy4kYWRkaXRpb25hbFRyaWdnZXIuaGlkZSgpO1xyXG5cdFx0dGhpcy4kYWRkaXRpb25hbENvbnRlbnQuZW1wdHkoKTtcclxuXHRcdHZhciBkZW1vZ3JhcGhpY1dpZHRoID0gdGhpcy4kZGVtb2dyYXBoaWMub3V0ZXJXaWR0aCh0cnVlKTtcclxuXHRcdHZhciBpdGVtc1RvdGFsID0gMDtcclxuXHRcdHRoaXMuJGRlbW9ncmFwaGljLmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuXHRcdFx0aXRlbXNUb3RhbCArPSBwYXJzZUludCgkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSksIDEwKTtcclxuXHRcdFx0aWYgKGl0ZW1zVG90YWwgKyA2MCA8IGRlbW9ncmFwaGljV2lkdGgpIHtcclxuXHRcdFx0XHQkKHRoaXMpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpLmNsb25lKCkuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpLmFwcGVuZFRvKF90aGlzLiRhZGRpdGlvbmFsQ29udGVudCk7XHJcblx0XHRcdFx0X3RoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy4kYWRkaXRpb25hbENvbnRlbnQuZmluZCgnLkRlbW9ncmFwaGljLWl0ZW0nKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0dGhpcy4kaGVhZGVyLnJlbW92ZUNsYXNzKCdpc09wZW4nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuc2hvd0FkZGl0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kaGVhZGVyLmFkZENsYXNzKCdpc09wZW4nKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuaGlkZUFkZGl0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy4kaGVhZGVyLnJlbW92ZUNsYXNzKCdpc09wZW4nKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVIZWFkZXIgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGhhbmRsZURlbW9ncmFwaGljczogaGFuZGxlRGVtb2dyYXBoaWNzLFxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLlNhcHBoaXJlSGVhZGVyLWRlbW9ncmFwaGljcycpLmxlbmd0aCkge1xyXG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVIZWFkZXIud2lkZ2V0SWRdLmhhbmRsZURlbW9ncmFwaGljcygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVSYWRpb0J1dHRvbiAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVSYWRpb0J1dHRvbiA9IHdpZGdldElkID0+IHtcclxuXHR2YXIgJHdpZGdldCA9ICQoJyMnICsgd2lkZ2V0SWQpO1xyXG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcblx0dmFyIG5hbWUgPSAkY29udHJvbC5wcm9wKCduYW1lJyk7XHJcblxyXG5cdCRjb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl1bbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQuY2xvc2VzdCgnLkJ1dHRvblJhZGlvSW5wJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkd2lkZ2V0LmZpbmQoJy5CdXR0b25SYWRpb0lucF9yYWRpb1RleHQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5jbG9zZXN0KCcuQnV0dG9uUmFkaW9JbnAnKVxyXG5cdFx0XHRcdC5oYXNDbGFzcygnZGlzYWJsZWQnKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdCRjb250cm9sLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0aWYgKCRjb250cm9sLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblxyXG5cdGZ1bmN0aW9uIFNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9iamVjdCB0byBzYXZlIHN0YXRzXHJcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcclxuXHJcblx0XHR2YXIgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXHJcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xyXG5cdFx0XHQvLyBzdG9yZSBxdWVyeXMgaW4gYSBzaW5nbGUgdmFyXHJcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50Jyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gU2VjdGlvbi5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmICgkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTgnKSB8fCAkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTknKSkge1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbScpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gaWYgbmV3IFNlY3Rpb25FeHBhbmRhYmxlIHRoZW4gYWRkIHRvIHByZXZpZXdzdGF0IGFycmF5XHJcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9ucyB0byBjcmVhdGUgYXJyYXkgc3RhdFxyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b20nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHtcclxuXHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnSGlkZVdoZW5FbXB0eScpICYmICQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQnKS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGhhY2sgdG8gZGlzcGxheSBhIG1lc3NhZ2Ugd2hlbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSBoYXMgbm8gY2hpbGQgaXRlbXNcclxuXHRcdFx0XHR2YXIgaXNFbXB0eSA9IHRydWU7XHJcblx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBkaXYsIC5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50IHNwYW4nKS5ub3QoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50LS1lbXB0eScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykudGV4dCgpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0aXNFbXB0eSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aWYgKCFpc0VtcHR5KSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50LS1lbXB0eScpLmNzcyh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJyxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cclxuXHRcdFx0XHR2YXIgJGV4cGFuZGFibGVJbnN0YW5jZSA9ICQodGhpcyk7XHJcblx0XHRcdFx0dmFyICR0b2dnbGVyID0gJCh0aGlzKS5maW5kKCc+IC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gLlNlY3Rpb25FeHBhbmRhYmxlLXRvZ2dsZXInKTtcclxuXHRcdFx0XHRpZiAoJHRvZ2dsZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHR2YXIgJHRvZ2dsZXJTdGF0ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWx2YWx1ZV0nKS50ZXh0KCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsc2hvd10nKS5kYXRhKCdsYWJlbHNob3cnKSk7XHJcblx0XHRcdFx0XHQkdG9nZ2xlci5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdFx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdCR0b2dnbGVyU3RhdGUgPSAhJHRvZ2dsZXJTdGF0ZTtcclxuXHRcdFx0XHRcdFx0aWYgKCR0b2dnbGVyU3RhdGUpIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbGhpZGVdJykuZGF0YSgnbGFiZWxoaWRlJykpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCRleHBhbmRhYmxlSW5zdGFuY2UuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlLXRvZ2dsZWQnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0JHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWx2YWx1ZV0nKS50ZXh0KCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsc2hvd10nKS5kYXRhKCdsYWJlbHNob3cnKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbScpLm9mZihcImNsaWNrXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGlucHV0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBhJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZXZlbnQgYWpheFxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KHRoYXQuYWpheFJlZnJlc2gpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpO1xyXG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBTaWxrVUlGcmFtZXdvcmsvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TZWN0aW9uRXhwYW5kYWJsZSA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGZ1bmN0aW9uIFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9iamVjdCB0byBzYXZlIHN0YXRzXHJcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcclxuXHJcblx0XHR2YXIgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXHJcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xyXG5cdFx0XHQvLyBzdG9yZSBxdWVyeXMgaW4gYSBzaW5nbGUgdmFyXHJcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50Jyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gU2VjdGlvbi5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBhamF4IHJlZnJlcyBmdW5jdGlvblxyXG5cdFx0dGhhdC5hamF4UmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub2ZmKCk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBhJ1xyXG5cdFx0XHQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIG5ldyBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY3VyZW50IHN0YXRlIChhamF4IHN0YXRlIHggaW5pdGlhbCBzdGF0ZSlcclxuXHRcdFx0XHR2YXIgY3VyU3RhdGUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgc3RhcnQgZXhwYW5kYWJsZVxyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRjdXJTdGF0ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBhamF4ICE9IGluaXRpYWwgc2VydmVyXHJcblx0XHRcdFx0aWYgKGN1clN0YXRlICE9IHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ3NlcnZlciddKSB7XHJcblx0XHRcdFx0XHQvLyBjdXJzdGF0ZVxyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ3NlcnZlciddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IGZhbHNlICYmICQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbignLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2NvbnRlbnQnKVxyXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IHRydWUgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBzZXQgZXZlbnRzXHJcblx0XHR0aGF0LmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub2ZmKFwiY2xpY2tcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBzZXRPcGVuQ2xvc2VDbGFzcyA9IGlkID0+IHtcclxuXHRcdGlkLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoaWQucGFyZW50KCkuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUoKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRzZXRPcGVuQ2xvc2VDbGFzcyxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFNlbGVjdFN5c3RlbSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2VsZWN0U3lzdGVtID0gY29uZmlnID0+IHtcclxuXHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBXaWRnZXRJZCA9IGNvbmZpZy5XaWRnZXRJZDsgLy9Db21ibyBCb3ggSWQgdG8gYmUgdXNlZC5cclxuXHRcdHZhciBDbGFzcyA9IGNvbmZpZy5DbGFzczsgLy9BbGwgQ29tYm8gYm94ZXMgd2l0aCB0aGlzIGNsYXNzIHdpbGwgYmUgYmUgdHJhbnNmb3JtZWQuXHJcblx0XHR2YXIgTm9SZXN1bHRzVGV4dCA9IGNvbmZpZy5Ob1Jlc3VsdHNUZXh0OyAvL1RleHQgdG8gZGlzcGxheSB3aGVuIHRoZXJlIGFyZSBubyByZXN1bHRzLlxyXG5cdFx0dmFyIGlucHV0VHlwZSA9IGNvbmZpZy5JbnB1VHlwZTsgLy9PcHRpb25zOiBGSWx0ZXJzLCBEcm9wZG93biwgU2VsZWN0MlxyXG5cdFx0dmFyIFByb21wdCA9IGNvbmZpZy5Qcm9tcHQ7IC8vUHJvbXB0IGluIHNlYXJjaFxyXG5cdFx0dmFyIFNlbGVjdDJUeXBlID0gY29uZmlnLlNlbGVjdFR5cGU7IC8vIFR5cGUgb2Ygc2VsZWN0MiBjb25maWd1cmF0aW9uXHJcblx0XHR2YXIgSGFzU2VhcmNoID0gY29uZmlnLkhhc1NlYXJjaDsgLy8gaGFzIHNlYXJjaFxyXG5cdFx0dmFyIE9uU2VsZWN0aW5nSlMgPSBjb25maWcuT25TZWxlY3RpbmdKUztcclxuXHRcdHZhciBPblVuU2VsZWN0aW5nSlMgPSBjb25maWcuT25VblNlbGVjdGluZ0pTO1xyXG5cdFx0dmFyIE1heGltdW1MZW5ndGggPSBjb25maWcuTWF4aW11bUxlbmd0aDtcclxuXHRcdHZhciBTZWxlY3RlZFZhbHVlID0gY29uZmlnLlNlbGVjdGVkVmFsdWU7XHJcblx0XHR2YXIgYWxsb3dDbGVhciA9IGNvbmZpZy5hbGxvd0NsZWFyO1xyXG5cdFx0Ly8gIFNlbGVjdDIgQWpheCBDb25maWd1cmF0aW9uXHJcblx0XHR2YXIgQWpheFVSTCA9IGNvbmZpZy5BamF4VVJMO1xyXG5cdFx0dmFyIEFqYXhEZWxheSA9IGNvbmZpZy5BamF4RGVsYXk7XHJcblx0XHR2YXIgUGFnaW5hdGlvblNpemUgPSBjb25maWcuUGFnaW5hdGlvblNpemU7XHJcblx0XHR2YXIgTWluaW11bUlucHV0TGVuZ2h0ID0gY29uZmlnLk1pbmltdW1JbnB1dExlbmdodDtcclxuXHRcdHZhciBTZWFyY2hUZXJtID0gY29uZmlnLlNlYXJjaFRlcm07XHJcblx0XHR2YXIgU2VhcmNoRXh0cmFQYXJhbTEgPSBjb25maWcuU2VhcmNoRXh0cmFQYXJhbTE7XHJcblx0XHR2YXIgUGFnZVRlcm0gPSBjb25maWcuUGFnZVRlcm07XHJcblx0XHR2YXIgQW1vdW50UGFnZSA9IGNvbmZpZy5QYWdlQW1vdW50O1xyXG5cdFx0dmFyIGlzTXVsdGlwbGUgPSBjb25maWcuaXNNdWx0aXBsZTtcclxuXHRcdHZhciBTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0dmFyICRXaWRnZXRJZGVudGlmaWVyO1xyXG5cclxuXHRcdC8qICBcclxuICAgICAgICAgIENoYW5nZSBzZWxlY3QyIHNlYXJjaCBkaXNwbGF5IFxyXG4gICAgICAgICAgICAgIC1NdWx0aXBsZSBTZWxlY3QyIHNlYXJjaCBVSSBsaWtlIFNpbmdsZSBTZWxlY3QyXHJcbiAgICAgICovXHJcblx0XHQkLmZuLnNlbGVjdDIuYW1kLmRlZmluZShcclxuXHRcdFx0J1NlYXJjaExpa2VTaW5nbGUnLFxyXG5cdFx0XHRbXHJcblx0XHRcdFx0J3NlbGVjdDIvdXRpbHMnLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9hdHRhY2hCb2R5JyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9hdHRhY2hDb250YWluZXInLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL3NlYXJjaCcsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vbWluaW11bVJlc3VsdHNGb3JTZWFyY2gnLFxyXG5cdFx0XHRdLFxyXG5cdFx0XHRmdW5jdGlvbiAoVXRpbHMsIERyb3Bkb3duLCBBdHRhY2hCb2R5LCBBdHRhY2hDb250YWluZXIsIFNlYXJjaCwgbWluaW11bVJlc3VsdHNGb3JTZWFyY2gpIHtcclxuXHRcdFx0XHRsZXQgZHJvcGRvd25TZWFyY2ggPSBVdGlscy5EZWNvcmF0ZShEcm9wZG93biwgU2VhcmNoKTtcclxuXHRcdFx0XHRkcm9wZG93blNlYXJjaC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dmFyICRyZW5kZXJlZCA9IERyb3Bkb3duLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRcdC8vIEFkZCBhYmlsaXR5IGZvciBhIHBsYWNlaG9sZGVyIGluIHRoZSBzZWFyY2ggYm94XHJcblx0XHRcdFx0XHRsZXQgcGxhY2Vob2xkZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdwbGFjZWhvbGRlckZvclNlYXJjaCcpIHx8ICcnO1xyXG5cdFx0XHRcdFx0dmFyICRzZWFyY2ggPSAkKFxyXG5cdFx0XHRcdFx0XHQnPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlYXJjaCBzZWxlY3QyLXNlYXJjaC0tZHJvcGRvd25cIj4nICtcclxuXHRcdFx0XHRcdFx0JzxpbnB1dCBjbGFzcz1cInNlbGVjdDItc2VhcmNoX19maWVsZFwiIHBsYWNlaG9sZGVyPVwiJyArXHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyICtcclxuXHRcdFx0XHRcdFx0J1wiIHR5cGU9XCJzZWFyY2hcIicgK1xyXG5cdFx0XHRcdFx0XHQnIHRhYmluZGV4PVwiLTFcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwib2ZmXCInICtcclxuXHRcdFx0XHRcdFx0JyBzcGVsbGNoZWNrPVwiZmFsc2VcIiByb2xlPVwidGV4dGJveFwiIC8+JyArXHJcblx0XHRcdFx0XHRcdCc8L3NwYW4+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRzZWFyY2hDb250YWluZXIgPSAkc2VhcmNoO1xyXG5cdFx0XHRcdFx0dGhpcy4kc2VhcmNoID0gJHNlYXJjaC5maW5kKCdpbnB1dCcpO1xyXG5cdFx0XHRcdFx0JHNlYXJjaC5hZGRDbGFzcygnTXVsdGlwbGVTZWxlY3QnKTtcclxuXHJcblx0XHRcdFx0XHQkcmVuZGVyZWQucHJlcGVuZCgkc2VhcmNoKTtcclxuXHRcdFx0XHRcdCRzZWFyY2gucGFyZW50KCkuYWRkQ2xhc3MoJ011bHRpcGxlU2VsZWN0Jyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gJHJlbmRlcmVkO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIERlY29yYXRlIHRoZSBkcm9wZG93bitzZWFyY2ggd2l0aCB0aGUgY29udGFpbmVyc1xyXG5cdFx0XHRcdGxldCBhZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoZHJvcGRvd25TZWFyY2gsIEF0dGFjaENvbnRhaW5lcik7XHJcblx0XHRcdFx0YWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKGFkYXB0ZXIsIEF0dGFjaEJvZHkpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gYWRhcHRlcjtcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlZmF1bHQgQ29uZmlndXJhdGlvbiBuZWVkZWQgdG8gYXNzb2NpYXRlIHRoZSB3aWRnZXQgdG8gdGhlIHNlbGVjdDIgcGx1Z2luXHJcblx0XHQgKi9cclxuXHRcdGlmIChXaWRnZXRJZCA9PT0gJycgJiYgQ2xhc3MgIT0gJycpIHtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIgPSAkKCcuJyArIENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyID0gJCgnIycgKyBXaWRnZXRJZCk7XHJcblx0XHR9XHJcblx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdzZWxlY3QtaGlkZSAnICsgaW5wdXRUeXBlO1xyXG5cclxuXHRcdC8vICBTZWxlY3QyT3B0aW9ucy5kcm9wZG93blBhcmVudD0gJCgnIycrUGFyZW50RGl2KTtcclxuXHJcblx0XHR2YXIgZm9ybWF0UmVzdWx0ID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHR2YXIgJHNlbGVjdGVkT3B0aW9uc1ZhbHVlID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkJyk7XHJcblx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbnMgPSAkc2VsZWN0ZWRPcHRpb25zVmFsdWUubGVuZ3RoO1xyXG5cdFx0XHR2YXIgdG90YWxPcHRpb25zID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uJykubGVuZ3RoO1xyXG5cdFx0XHR2YXIgc2VsZWN0QWxsT3B0ID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkOnNlbGVjdGVkJykubGVuZ3RoO1xyXG5cdFx0XHR2YXIgYWN0aXZlVmFsdWVzID0gJyc7XHJcblx0XHRcdHZhciBhbGxPcHRFeGNlcHRBbGwgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQ6bm90KFwiLlNlbGVjdGVkQWxsXCIpJykubGVuZ3RoO1xyXG5cdFx0XHR2YXIgJGFsbE9wdEV4Y2VwdEFsbE9iaiA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZDpub3QoXCIuU2VsZWN0ZWRBbGxcIiknKTtcclxuXHJcblx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPT09IHRvdGFsT3B0aW9ucykge1xyXG5cdFx0XHRcdGlmICh0b3RhbE9wdGlvbnMgLSAxID4gMykge1xyXG5cdFx0XHRcdFx0cmV0dXJuICdBbGwgU2VsZWN0ZWQnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkYWxsT3B0RXhjZXB0QWxsT2JqLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzLnJlcGxhY2UoLyxcXHMqJC8sICcnKTtcclxuXHRcdFx0XHRcdHJldHVybiBhY3RpdmVWYWx1ZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciB0b3RhbG9wdCA9IHRvdGFsT3B0aW9ucyAtIDE7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzZWxlY3RlZE9wdGlvbnMgKyAnIG9mICcgKyB0b3RhbG9wdCArICcgc2VsZWN0ZWQnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID4gMCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZWN0ZWRPcHRpb25zVmFsdWUuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzICsgJyAnICsgJCh0aGlzKVswXS5pbm5lclRleHQgKyAnLCAnO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzLnJlcGxhY2UoLyxcXHMqJC8sICcnKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFjdGl2ZVZhbHVlcztcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAnU2VsZWN0IGFuIG9wdGlvbic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChOb1Jlc3VsdHNUZXh0ICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmZvcm1hdE5vTWF0Y2hlcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gTm9SZXN1bHRzVGV4dDtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW5wdXRUeXBlICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSBpbnB1dFR5cGU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFsbG93Q2xlYXIgPT09ICdUcnVlJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0NsZWFyID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoTWF4aW11bUxlbmd0aCAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5tYXhpbXVtSW5wdXRMZW5ndGggPSBNYXhpbXVtTGVuZ3RoO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChQcm9tcHQgIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSBQcm9tcHQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5wbGFjZWhvbGRlciA9IHtcclxuXHRcdFx0XHRpZDogJy0xJywgLy8gdGhlIHZhbHVlIG9mIHRoZSBvcHRpb25cclxuXHRcdFx0XHR0ZXh0OiAnU2VsZWN0IGFuIG9wdGlvbicsXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMycpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBBamF4XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zID0ge307XHJcblx0XHRcdC8qIFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzPSc6YWxsJzsqL1xyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dDbGVhciA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIChyZXBvKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlcG8uZnVsbF9uYW1lIHx8IHJlcG8udGV4dDtcclxuXHRcdFx0fTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVSZXN1bHQgPSBmdW5jdGlvbiAocmVwbykge1xyXG5cdFx0XHRcdGlmIChyZXBvLmxvYWRpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybiByZXBvLnRleHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBtYXJrdXAgPSAnPGRpdiBjbGFzcz1cIlwiQ2xlYXJmaXhcIlwiPicgKyAnPGRpdiBjbGFzcz1cIlwiVGhlbWVHcmlkX1dpZHRoMTJcIlwiPicgKyByZXBvLnRleHQgKyAnPC9kaXY+JztcclxuXHRcdFx0XHRpZiAocmVwby5kZXNjcmlwdGlvbikge1xyXG5cdFx0XHRcdFx0bWFya3VwICs9ICc8ZGl2IGNsYXNzPVwiXCJPU0F1dG9NYXJnaW5Ub3BcIlwiPicgKyByZXBvLmRlc2NyaXB0aW9uICsgJzwvZGl2Pic7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG1hcmt1cCArPSAnPC9kaXY+JztcclxuXHRcdFx0XHRyZXR1cm4gbWFya3VwO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0KFNlbGVjdDJPcHRpb25zLmFqYXggPSB7XHJcblx0XHRcdFx0dXJsOiBBamF4VVJMLFxyXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXHJcblx0XHRcdFx0ZGVsYXk6IEFqYXhEZWxheSxcclxuXHRcdFx0XHRkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcblx0XHRcdFx0XHR2YXIgU2VsZWN0MkFqYXhPcHQgPSB7fTtcclxuXHRcdFx0XHRcdHZhciBTcGxpdFBhcmFtZXRlciA9IFNlYXJjaEV4dHJhUGFyYW0xLnNwbGl0KCcsJyk7XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5TZWFyY2hUZXJtID0gcGFyYW1zLnRlcm07XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5QYWdlID0gcGFyYW1zLnBhZ2UgfHwgMTtcclxuXHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0LlBhZ2VBbW91bnQgPSBBbW91bnRQYWdlO1xyXG5cclxuXHRcdFx0XHRcdFNwbGl0UGFyYW1ldGVyLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzcGxpdFRleHQgPSBlbC5zcGxpdCgnOicpO1xyXG5cdFx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdFtzcGxpdFRleHRbMF1dID0gc3BsaXRUZXh0WzFdO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIFNlbGVjdDJBamF4T3B0O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhLCBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMTtcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdHM6IGRhdGEuaXRlbXMsXHJcblx0XHRcdFx0XHRcdHBhZ2luYXRpb246IHtcclxuXHRcdFx0XHRcdFx0XHRtb3JlOiBwYXJhbXMucGFnZSAqIFBhZ2luYXRpb25TaXplIDwgZGF0YS50b3RhbF9jb3VudCxcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjYWNoZTogdHJ1ZSxcclxuXHRcdFx0fSksXHJcblx0XHRcdChTZWxlY3QyT3B0aW9ucy5taW5pbXVtSW5wdXRMZW5ndGggPSBNaW5pbXVtSW5wdXRMZW5naHQpO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5lc2NhcGVNYXJrdXAgPSBmdW5jdGlvbiAobWFya3VwKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHRcdFx0aWYgKGNvbmZpZy5pc011bHRpcGxlKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSB0cnVlO1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ1NlbGVjdDJBamF4IE11bHRpcGxlJztcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ1NlbGVjdDJBamF4IE11bHRpcGxlJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5tdWx0aXBsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ1NlbGVjdDJBamF4JztcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ1NlbGVjdDJBamF4JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAwO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50YWdzID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY2xvc2VPbnNlbGVjdCA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0gUHJvbXB0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzInKSB7XHJcblx0XHRcdC8vU2VsZWN0MiB3aXRoIENoZWNrQm94XHJcblxyXG5cdFx0XHR2YXIgaXNBbGxTZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoJFdpZGdldElkZW50aWZpZXJbMF0ub3B0aW9ucy5sZW5ndGggPT09ICRXaWRnZXRJZGVudGlmaWVyWzBdLnNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpIHtcclxuXHRcdFx0XHRpc0FsbFNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFdpZGdldElkICE9ICcnKSB7XHJcblx0XHRcdFx0b3B0aW9uID0gbmV3IE9wdGlvbignU2VsZWN0IEFsbCcsICdBbGwnLCB0cnVlLCBpc0FsbFNlbGVjdGVkKTtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5wcmVwZW5kKG9wdGlvbik7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJykuYWRkQ2xhc3MoJ1NlbGVjdGVkQWxsJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jbG9zZU9uU2VsZWN0ID0gZmFsc2U7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmFsbG93SHRtbCA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50YWdzID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoSGFzU2VhcmNoID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIgPSAkLmZuLnNlbGVjdDIuYW1kLnJlcXVpcmUoJ1NlYXJjaExpa2VTaW5nbGUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCA9IC0xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdNdWx0aXBsZVNlbGVjdCc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnTXVsdGlwbGVTZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVNlbGVjdGlvbiA9IGZvcm1hdFJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICc2Jykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIEh0bWxPcHRpb25zXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zID0ge307XHJcblx0XHRcdHZhciBkYXRhSHRtbE9wdGlvbiA9IFtdO1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdFx0dmFyIG9wdGlvbk9iamVjdCA9IHtcclxuXHRcdFx0XHRcdGlkOiAkKHRoaXMpLnZhbCgpLFxyXG5cdFx0XHRcdFx0dGV4dDogJCh0aGlzKS50ZXh0KCksXHJcblx0XHRcdFx0XHRodG1sOiAkKHRoaXMpLnRleHQoKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGRhdGFIdG1sT3B0aW9uLnB1c2gob3B0aW9uT2JqZWN0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdjdXN0b21TZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ2Ryb3Bkb3duQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZGF0YSA9IGRhdGFIdG1sT3B0aW9uO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5lc2NhcGVNYXJrdXAgPSBmdW5jdGlvbiAobWFya3VwKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmIChTZWxlY3RlZFZhbHVlICE9ICcnKSB7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKFNlbGVjdGVkVmFsdWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbCgnJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcxJykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIFRhZ0N1c3RvbVxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50YWdzID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAndGFnQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICd0YWdDdXN0b20nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5Ub2tlblNlcGFyYXRvcyA9IFsnLCcsICcgJ107XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNyZWF0ZVNlYXJjaENob2ljZSA9IGZ1bmN0aW9uICh0ZXJtLCBkYXRhKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0JChkYXRhKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy50ZXh0LmxvY2FsZUNvbXBhcmUodGVybSkgPT09IDA7XHJcblx0XHRcdFx0XHR9KS5sZW5ndGggPT09IDBcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGlkOiB0ZXJtLFxyXG5cdFx0XHRcdFx0XHR0ZXh0OiB0ZXJtLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnNScpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBUYWdNdWx0aXBsZVxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50YWdzID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAndGFnU3lzdGVtJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICd0YWdTeXN0ZW0nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jcmVhdGVUYWcgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcblx0XHRcdFx0dmFyIHRlcm0gPSAkLnRyaW0ocGFyYW1zLnRlcm0pO1xyXG5cdFx0XHRcdGlmICh0ZXJtID09PSAnJykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRpZDogJyMnICsgdGVybSxcclxuXHRcdFx0XHRcdHRleHQ6IHRlcm0sXHJcblx0XHRcdFx0XHRuZXdUYWc6IHRydWUsIC8vIGFkZCBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChIYXNTZWFyY2ggPT09ICdGYWxzZScpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAtMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoT25VblNlbGVjdGluZ0pTICE9ICcnIHx8IE9uU2VsZWN0aW5nSlMgIT0gJycpIHtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXJcclxuXHRcdFx0XHQuc2VsZWN0MihTZWxlY3QyT3B0aW9ucylcclxuXHRcdFx0XHQub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycsIHRydWUpO1xyXG5cdFx0XHRcdFx0T25VblNlbGVjdGluZ0pTO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6c2VsZWN0aW5nJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdE9uU2VsZWN0aW5nSlM7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDpvcGVuaW5nJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ3Vuc2VsZWN0aW5nJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVEYXRhKCd1bnNlbGVjdGluZycpO1xyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDpvcGVuJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDI6Y2xvc2UnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzInKSB7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0dmFyIGlkd2lkZ2V0ID0gJyMnICsgV2lkZ2V0SWQ7XHJcblxyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRVbnNlbGVjdGVkSWQgPSBlLnBhcmFtcy5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0aWYgKFVuc2VsZWN0ZWRJZCA9PT0gJ0FsbCcpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHRcdFx0XHRcdFx0dmFyIGFsbE9wdGlvbnMgPSAkKGlkd2lkZ2V0ICsgJyBvcHRpb24nKTtcclxuXHRcdFx0XHRcdFx0YWxsT3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChzZWxlY3RlZEl0ZW1zKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdHZhciB0b3RhbE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPT09IHRvdGFsT3B0aW9ucyAtIDEgJiYgJChpZHdpZGdldCArICcgPiAgb3B0aW9uOnNlbGVjdGVkOmZpcnN0LWNoaWxkJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYWxsT3B0aW9ucyA9ICQoaWR3aWRnZXQgKyAnIG9wdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MignZGVzdHJveScpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChzZWxlY3RlZEl0ZW1zKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdvcGVuJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIub24oJ3NlbGVjdDI6dW5zZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0VW5zZWxlY3RlZElkID0gZS5wYXJhbXMuZGF0YS5pZDtcclxuXHRcdFx0XHRcdGlmIChVbnNlbGVjdGVkSWQgPT09ICdBbGwnKSB7XHJcblx0XHRcdFx0XHRcdCQoaWR3aWRnZXQgKyAnID4gb3B0aW9uJykucmVtb3ZlQXR0cignc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MignZGVzdHJveScpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0KVxyXG5cdFx0XHRcdFx0XHRcdC52YWwoJycpXHJcblx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHQvLyQoaWR3aWRnZXQgKycgPiBvcHRpb24nKS5hdHRyKCdzZWxlY3RlZCcsIFwic2VsZWN0ZWRcIik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0ICsgJyA+IG9wdGlvbjpmaXJzdC1jaGlsZCcpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdvcGVuJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufTsiLCIvKiBDb21wb25lbnQgU2hpZnRDb250YWluZXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcblx0bGV0IHNoaWZ0VGltZWxpbmVSZXNpemVUaW1lcjtcclxuXHRsZXQgJHNoaWZ0Q29udGFpbmVySWQgPSAkKCk7XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IHNoaWZ0Q29udGFpbmVySWQgPT4ge1xyXG5cclxuXHRcdC8vICQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51ICcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFx0JHNoaWZ0Q29udGFpbmVySWQgPSAkKHNoaWZ0Q29udGFpbmVySWQpO1xyXG5cclxuXHRcdGhhc1Njcm9sbEJhcigpO1xyXG5cdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xyXG5cclxuXHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gXHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdC8vIFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51ICcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0Ly8gfSwgMTUwMCk7XHJcblxyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9fYXJyb3cnKS5vZmYoJ21vdXNlZG93bicpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHRcdFx0fSwgMTUwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0Y29uc3QgaGFuZGxlU2hpZnRUYWJsZSA9ICgpID0+IHtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHRcdFx0dmFyICRlbEZsYWcgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5GbGFnTGluZScpO1xyXG5cdFx0XHR2YXIgJGVsRmxhZ1RpbWUgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5GbGFnTGluZV90aW1lJyk7XHJcblx0XHRcdHZhciAkY29sdW1uRmxhZyA9ICRlbEZsYWcuZGF0YSgnY29sdW1uJyk7XHJcblx0XHRcdHZhciAkbWludXRlc0ZsYWcgPSAkZWxGbGFnLmRhdGEoJ21pbnV0ZXMnKTtcclxuXHRcdFx0dmFyICRzbG90cyA9ICQodGhpcykuY2xvc2VzdCgnLlNoaWZ0Q29udGFpbmVyJykuZmluZCgnLlNoaWZ0Q29udGFpbmVyX2hlYWRlcicpLmZpbmQoJy5TaGlmdENlbGxDb250ZW50Jyk7XHJcblx0XHRcdHZhciAkc2xvdFdpZHRoID0gTWF0aC5yb3VuZCgkc2xvdHMuZXEoMCkud2lkdGgoKSk7XHJcblx0XHRcdHZhciBtaW51dGVzUG9zaXRpb24gPSAoJG1pbnV0ZXNGbGFnICogJHNsb3RXaWR0aCkgLyA2MDtcclxuXHJcblx0XHRcdC8vIGhhbmRsZSBjdXJyZW50IHRpbWUgZmxvZyBob3Jpem9udGFsIHBvc2l0aW9uaW5nXHJcblx0XHRcdHZhciBzbG90c1Bvc2l0aW9uID0gW107XHJcblx0XHRcdCRzbG90cy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHRcdFx0XHRzbG90c1Bvc2l0aW9uLnB1c2goJCh0aGlzKS5wb3NpdGlvbigpLmxlZnQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JGVsRmxhZy5jc3MoJ2xlZnQnLCBzbG90c1Bvc2l0aW9uWyRjb2x1bW5GbGFnIC0gMV0gKyBtaW51dGVzUG9zaXRpb24pO1xyXG5cdFx0XHQkZWxGbGFnLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0XHRpZiAoJGNvbHVtbkZsYWcgPT09ICRzbG90cy5sZW5ndGgpIHtcclxuXHRcdFx0XHQkZWxGbGFnVGltZS5jc3Moe1xyXG5cdFx0XHRcdFx0cmlnaHQ6ICcxcHgnLFxyXG5cdFx0XHRcdFx0bGVmdDogJ2F1dG8nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgY2VsbHMgdGhhdCBtaWdodCBzcGFuIG92ZXIgc2V2ZXJhbCBzbG90c1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJy5TaGlmdENhcmQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxSb3cpIHtcclxuXHRcdFx0XHR2YXIgcm93SGFzU3Bhbm5lZENlbGwgPSBmYWxzZTtcclxuXHRcdFx0XHQkKGVsUm93KS5maW5kKCcuU2hpZnRDZWxsQ29udGVudCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbENlbGwpIHtcclxuXHRcdFx0XHRcdHZhciBjb2xzcGFuID0gJChlbENlbGwpLmRhdGEoJ2NvbHNwYW4nKTtcclxuXHRcdFx0XHRcdGlmIChjb2xzcGFuID09PSBzbG90c1Bvc2l0aW9uLmxlbmd0aCB8fCByb3dIYXNTcGFubmVkQ2VsbCkge1xyXG5cdFx0XHRcdFx0XHQkKGVsQ2VsbCkuY3NzKHtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnMSAxIGF1dG8nLFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoY29sc3BhbiA+IDEpIHtcclxuXHRcdFx0XHRcdFx0cm93SGFzU3Bhbm5lZENlbGwgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHQkKGVsQ2VsbCkuY3NzKHtcclxuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnbm9uZScsXHJcblx0XHRcdFx0XHRcdFx0d2lkdGg6ICsoc2xvdHNQb3NpdGlvbltjb2xzcGFuXSAtIHNsb3RzUG9zaXRpb25bMF0pICsgJ3B4JyxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIGhvcml6b250YWwgc2Nyb2xsIGJlaGF2aW9yXHJcblx0XHRcdGlmIChlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoKSB7XHJcblx0XHRcdFx0JChlbCkud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xyXG5cdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnLlNoaWZ0Q29udGFpbmVyJykuZmluZCgnLlNoaWZ0Q29udGFpbmVyX2hlYWRlcicpLndpZHRoKGVsLnNjcm9sbFdpZHRoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKGVsKS53aWR0aCgnYXV0bycpO1xyXG5cdFx0XHRcdCQodGhpcykuY2xvc2VzdCgnLlNoaWZ0Q29udGFpbmVyJykuZmluZCgnLlNoaWZ0Q29udGFpbmVyX2hlYWRlcicpLndpZHRoKCdhdXRvJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGhhc1Njcm9sbEJhciA9ICgpID0+IHtcclxuXHRcdHZhciAkU2Nyb2xsYWJsZURpdiA9ICRzaGlmdENvbnRhaW5lcklkLmZpbmQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyJyk7XHJcblx0XHRpZiAoJHNoaWZ0Q29udGFpbmVySWQuZmluZCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXInKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGlmICgkU2Nyb2xsYWJsZURpdi5nZXQoMCkuc2Nyb2xsSGVpZ2h0ID4gJFNjcm9sbGFibGVEaXYuaGVpZ2h0KCkpIHtcclxuXHRcdFx0XHR2YXIgJGxhc3RDZWxsID0gJHNoaWZ0Q29udGFpbmVySWQuZmluZCgnLklzVGltZXI6bGFzdC1jaGlsZCcpO1xyXG5cdFx0XHRcdCRsYXN0Q2VsbC5jc3MoJ3BhZGRpbmctcmlnaHQnLCAnN3B4Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRjb25zdCByZWRyYXdTaGlmdFRpbWVsaW5lID0gKCkgPT4ge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHNoaWZ0VGltZWxpbmVSZXNpemVUaW1lcik7XHJcblx0XHRzaGlmdFRpbWVsaW5lUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aGFzU2Nyb2xsQmFyKCk7XHJcblx0XHRcdGhhbmRsZVNoaWZ0VGFibGUoKTtcclxuXHRcdH0sIDQwMCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY2hlY2tTY3JvbGwgPSAoKSA9PiB7XHJcblx0XHR2YXIgaENvbnRlbnQgPSAkKCcuQ29udGVudCcpLmhlaWdodCgpO1xyXG5cdFx0dmFyIGhXaW5kb3cgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG5cdFx0aWYgKGhDb250ZW50ID4gaFdpbmRvdykgcmVkcmF3U2hpZnRUaW1lbGluZSgpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lciA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdGNoZWNrU2Nyb2xsLFxyXG5cdFx0cmVkcmF3U2hpZnRUaW1lbGluZVxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcblxyXG4kKHdpbmRvdykub2ZmKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknKS5vbigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JywgZnVuY3Rpb24gKCkge1xyXG5cclxuXHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblxyXG5cdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUpO1xyXG5cclxuXHRzZXRUaW1lb3V0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5jaGVja1Njcm9sbCwgMTAwMCk7XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHR9LCAxNTAwKTtcclxuXHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghISQoJy5TaGlmdENvbnRhaW5lcicpLmxlbmd0aCkge1xyXG5cclxuXHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZSgpO1xyXG5cdFx0fSwgNDAwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5jaGVja1Njcm9sbCwgNTAwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fSwgNjAwKTtcclxuXHJcblx0XHQkKCcubmF2aWdhdGlvbi1jb250cm9sLWl0ZW0nKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9WZXJpZnkgdGhlIHNjcm9sbCBpZiB0b29sdGlwIG9wZW5lZFxyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXInKS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoJCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdCQoJy50b29sdGlwc3Rlci1iYXNlJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0XHRcdH0sIDQwMCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5jaGVja1Njcm9sbCwgNTAwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0XHR9LCA2MDApO1xyXG5cclxuXHRcdFx0Ly8gU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmU7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IElTaWRlYmFyICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IFNpZGViYXIoY29uZmlnKTtcclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBjbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuU2lkZWJhci53aWRnZXRJZF0uY2xvc2UoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgU2lkZWJhciA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRzaWRlYmFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JU2lkZWJhcicpO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLW1lbnUnKTtcclxuXHRcdHRoaXMuJHNpZGViYXJNZW51SXRlbSA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2lkZWJhck1lbnVJdGVtJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyU2hpZWxkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JU2lkZWJhci1zaGllbGQnKTtcclxuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JU2lkZWJhci1jb250ZW50Jyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCc+IGRpdicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnUEgnKSAmJiAkKHRoaXMpLnRleHQoKSA9PT0gJycpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblx0XHRpZiAoIXRoaXMuaXNFeHBhbmRhYmxlKSB7XHJcblx0XHRcdHRoaXMub3Blbk1lbnVJdGVtKDApO1xyXG5cdFx0fVxyXG5cdFx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLmxkcy1yaW5nJykuZmFkZU91dCgpO1xyXG5cdFx0XHRpZiAoIXRoaXMuaXNFeHBhbmRhYmxlKSB7XHJcblx0XHRcdFx0JCgnaW5wdXRbdHlwZT1cInRleHRcIl06dmlzaWJsZScpLmVxKDApLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh3aW5kb3cpLnVubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLmxkcy1yaW5nJykuZmFkZU91dCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2lkZWJhci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXJNZW51Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRpZiAoIV90aGlzLiRzaWRlYmFyLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuXHRcdFx0XHRfdGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHNlbGVjdGVkUG9zaXRpb24gPSAkKHRoaXMpLmluZGV4KCk7XHJcblx0XHRcdF90aGlzLm9wZW5NZW51SXRlbShzZWxlY3RlZFBvc2l0aW9uKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhclNoaWVsZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246Zmlyc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLiRzaWRlYmFyXHJcblx0XHRcdFx0LmZpbmQoJy5GaWVsZHNTbGlkZXInKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnVGFiMScpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdUYWIyJyk7XHJcblx0XHRcdF90aGlzLnNldEZpZWxkRm9jdXMoX3RoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmVxKDApKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5vbignY2xpY2snLCAnLlNlYXJjaFNpZGVCYXJGaWVsZHMgLkJ1dHRvbkdyb3VwX2J1dHRvbjpsYXN0LWNoaWxkJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy4kc2lkZWJhclxyXG5cdFx0XHRcdC5maW5kKCcuRmllbGRzU2xpZGVyJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYjInKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnVGFiMScpO1xyXG5cdFx0XHRfdGhpcy5zZXRGaWVsZEZvY3VzKF90aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5vcGVuTWVudUl0ZW0gPSBmdW5jdGlvbiAoc2VsZWN0ZWRQb3NpdGlvbikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXJcclxuXHRcdFx0LmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKVxyXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcblx0XHRcdC5lcShzZWxlY3RlZFBvc2l0aW9uKVxyXG5cdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0dGhpcy4kc2lkZWJhclxyXG5cdFx0XHQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQgPiAuSVNpZGViYXItY29udGVudC1wYW5lbCcpXHJcblx0XHRcdC5oaWRlKClcclxuXHRcdFx0LmVxKHNlbGVjdGVkUG9zaXRpb24pXHJcblx0XHRcdC5zaG93KCk7XHJcblx0XHR0aGlzLiRzaWRlYmFyLmFkZENsYXNzKCdvcGVuJyk7XHJcblx0XHRpZiAod2luZG93LnBhcmVudC5sZW5ndGggJiYgdGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5vcGVuU2lkZWJhcklmcmFtZSgwKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMuc2V0RmllbGRGb2N1cyh0aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2lkZWJhci5wcm90b3R5cGUuc2V0RmllbGRGb2N1cyA9IGZ1bmN0aW9uICgkaW5wdXQpIHtcclxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JGlucHV0LmNsaWNrKCkuc2VsZWN0KCk7XHJcblx0XHR9LCAyNTApO1xyXG5cdH07XHJcblxyXG5cdFNpZGViYXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LlNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLmNsb3NlU2lkZWJhcklmcmFtZSgwKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRXhwYW5kYWJsZSkge1xyXG5cdFx0XHR0aGlzLiRzaWRlYmFyLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcblx0XHRcdHRoaXMuJHNpZGViYXIuZmluZCgnLlNpZGViYXJNZW51SXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuSVNpZGViYXItY29udGVudCA+IC5JU2lkZWJhci1jb250ZW50LXBhbmVsJykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRjbG9zZTogY2xvc2UsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTcGlubmVySG9yaXpvbnRhbCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU3Bpbm5lckhvcml6b250YWwgPSB7XHJcblx0aW5jcmVtZW50OiBmdW5jdGlvbiAoZWxlbWVudElkLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0dmFyIF9lbGVtZW50ID0gJChlbGVtZW50SWQpLmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKS5maXJzdCgpO1xyXG5cdFx0aWYgKF9lbGVtZW50LnZhbCgpID09IHVuZGVmaW5lZCB8fCBfZWxlbWVudC52YWwoKSA9PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPCBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSArIDEpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZCkuZmluZCgnYS5NaW51cycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpID49IG1heFZhbHVlKSB7XHJcblx0XHRcdFx0JChlbGVtZW50SWQpLmZpbmQoJ2EuUGx1cycpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRlY3JlbWVudDogZnVuY3Rpb24gKGVsZW1lbnRJZCwgbWluVmFsdWUsIHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0dmFyIF9lbGVtZW50ID0gJChlbGVtZW50SWQpXHJcblx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJylcclxuXHRcdFx0LmZpcnN0KCk7XHJcblx0XHRpZiAoX2VsZW1lbnQudmFsKCkgPT0gdW5kZWZpbmVkIHx8IF9lbGVtZW50LnZhbCgpID09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpKSkge1xyXG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xyXG5cdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA+IG1pblZhbHVlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudmFsKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpIC0gMSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuUGx1cycpXHJcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPD0gbWluVmFsdWUpIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLk1pbnVzJylcclxuXHRcdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxufTsiLCIvKiBDb21wb25lbnQgU3Bpbm5lclZlcnRpY2FsICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgTWluVmFsdWUgPSAnICsgTWluVmFsdWUgKyAnO1xyXG5cclxuXHRcdFx0JChgIyR7Y29uZmlnLndpZGdldElEfSAuU3Bpbm5lcklucHV0VmVydGljYWwgaW5wdXRgKS5vbignYmx1ciBrZXl1cCBpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBDdXJyZW50SW5wdXRWYWx1ZSA9ICQoYCMke2NvbmZpZy53aWRnZXRJRH0gLlNwaW5uZXJJbnB1dFZlcnRpY2FsIGlucHV0YCkudmFsKCk7XHJcblxyXG5cdFx0XHRcdGlmIChDdXJyZW50SW5wdXRWYWx1ZSA8IE1pblZhbHVlKSB7XHJcblx0XHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JChgIyR7Y29uZmlnLndpZGdldElEfWApXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmICgkKGAjJHtjb25maWcud2lkZ2V0SUR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApLnZhbCgpIDw9IE1pblZhbHVlKSB7XHJcblx0XHRcdFx0JChgIyR7Y29uZmlnLndpZGdldElEfWApXHJcblx0XHRcdFx0XHQuZmluZCgnLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvbmZpZy5pc0N1cnNvck9uRm9jdXMpIHtcclxuXHRcdFx0XHQkKCdib2R5Jykub24oJ2ZvY3VzJywgYCMke2NvbmZpZy5pbnB1dElEfSBpbnB1dGAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRoYXQuc2VsZWN0aW9uU3RhcnQgPSB0aGF0LnNlbGVjdGlvbkVuZCA9IDEwMDAwMDtcclxuXHRcdFx0XHRcdH0sIDMwMCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGluY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCkgPT4ge1xyXG5cdFx0bGV0IF9lbGVtZW50ID0gJChlbGVtZW50SWQpXHJcblx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0dmFyIGZvcmNlSW50ZWdlciA9ICQoZWxlbWVudElkKS5kYXRhKCdmb3JjZWludGVnZXInKSA9PT0gJ1RydWUnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpO1xyXG5cdFx0dmFyIGluY3JlbWVudFVuaXQgPSAxO1xyXG5cdFx0dmFyIGlzRGVjaW1hbHMgPSBjdXJyZW50VmFsdWUgJSAxICE9IDA7XHJcblxyXG5cdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdC5maW5kKCcuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblxyXG5cdFx0aWYgKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSA8IG1pblZhbHVlKSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZm9yY2VJbnRlZ2VyKSB7XHJcblx0XHRcdGlmIChpc0RlY2ltYWxzKSB7XHJcblx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRWYWx1ZSA9PT0gJycgfHwgaXNOYU4ocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpKSkge1xyXG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xyXG5cdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSA8IG1heFZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiAhZm9yY2VJbnRlZ2VyKSB7XHJcblx0XHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlICsgaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uSW5wdXQpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNoZWNrU3Bpbm5lclZlcnRpY2FsRGlzYWJsZWRTdGF0dXMoZWxlbWVudElkLCBwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSwgbWluVmFsdWUsIG1heFZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBkZWNyZW1lbnQgPSAoZWxlbWVudElkLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpID0+IHtcclxuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxyXG5cdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0nKVxyXG5cdFx0XHQuZmlyc3QoKTtcclxuXHRcdHZhciBmb3JjZUludGVnZXIgPSAkKGVsZW1lbnRJZCkuZGF0YSgnZm9yY2VpbnRlZ2VyJykgPT09ICdUcnVlJyA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHZhciBjdXJyZW50VmFsdWUgPSBwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKTtcclxuXHRcdHZhciBpbmNyZW1lbnRVbml0ID0gMTtcclxuXHRcdHZhciBpc0RlY2ltYWxzID0gY3VycmVudFZhbHVlICUgMSAhPSAwO1xyXG5cdFx0aWYgKCFmb3JjZUludGVnZXIpIHtcclxuXHRcdFx0aWYgKGlzRGVjaW1hbHMpIHtcclxuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XHJcblx0XHRcdF9lbGVtZW50LnZhbChtaW5WYWx1ZSk7XHJcblx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodHJpZ2dlck9uSW5wdXQpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpID4gbWluVmFsdWUpIHtcclxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09PSAxICYmICFmb3JjZUludGVnZXIpIHtcclxuXHRcdFx0XHRcdGluY3JlbWVudFVuaXQgPSBwYXJzZUZsb2F0KDAuMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KChjdXJyZW50VmFsdWUgLSBpbmNyZW1lbnRVbml0KS50b0ZpeGVkKDEpKSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNoZWNrU3Bpbm5lclZlcnRpY2FsRGlzYWJsZWRTdGF0dXMgPSAoZWxlbWVudElkLCB2YWx1ZVRvQ2hlY2ssIG1pblZhbHVlLCBtYXhWYWx1ZSkgPT4ge1xyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA+PSBtYXhWYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0LmZpbmQoJ2EuUGx1c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU3Bpbm5lclZlcnRpY2FsID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0aW5jcmVtZW50LFxyXG5cdFx0ZGVjcmVtZW50LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFNwbGl0QnV0dG9uICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTcGxpdEJ1dHRvbihjb25maWcpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRidXR0b24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWJ1dHRvbicpO1xyXG5cdFx0dGhpcy4kYnV0dG9uTGluayA9IHRoaXMuJGJ1dHRvbi5maW5kKCc+IGEnKTtcclxuXHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWFjdGlvbnMnKTtcclxuXHRcdGlmICghIXRoaXMuJGFjdGlvbnMudGV4dCgpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCc+IC5TcGxpdEJ1dHRvbicpLmFkZENsYXNzKCdoYXNUcmlnZ2VyJyk7XHJcblx0XHRcdHRoaXMuYnVpbGRBY3Rpb25zVHJpZ2dlcigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNwbGl0QnV0dG9uLnByb3RvdHlwZS5idWlsZEFjdGlvbnNUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGNsYXNzTGlzdCA9IHRoaXMuJGJ1dHRvbkxpbmtbMF0uY2xhc3NMaXN0LnZhbHVlO1xyXG5cdFx0dGhpcy4kdHJpZ2dlci5hZGRDbGFzcyhjbGFzc0xpc3QpO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coX3RoaXMuY29uZmlnLndpZGdldElkLCBfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKTtcclxuXHRcdFx0aWYgKCFfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKSB7XHJcblx0XHRcdFx0X3RoaXMuJHRyaWdnZXIudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0YXJyb3c6IHRydWUsXHJcblx0XHRcdFx0XHRjb250ZW50OiAkKCc8c2VjdGlvbi8+JykuYXBwZW5kKF90aGlzLiRhY3Rpb25zLmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IF90aGlzLmNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogX3RoaXMuY29uZmlnLnBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IF90aGlzLmNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItc3BsaXRidXR0b24gUGFkZGluZy0nICsgX3RoaXMuY29uZmlnLnBhZGRpbmcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X3RoaXMuJGFjdGlvbnMucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGxpdEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwidmFyIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG52YXIgc3RvcHRpbWVyID0gdHJ1ZTtcclxudmFyIG15VGltb3V0ICA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBvbktleWRvd25GdW5jdGlvbigpIHtcclxuICAgIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG4gIFxyXG4gICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgIG15VGltb3V0ID0gbnVsbDtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljaykge1xyXG4gIHN0b3B0aW1lciA9IGZhbHNlO1xyXG4gIFxyXG4gIGlmKG1pbGlzZWNvbmRwYXNzZWQgPT0gMCAmJiBteVRpbW91dD09bnVsbCl7XHJcbiAgICAgIG15VGltb3V0ID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkKz0xMDA7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1pbGlzZWNvbmRwYXNzZWQgPj0gNDAwICYmIHN0b3B0aW1lcj09ZmFsc2UpIHtcclxuICAgICAgICAgICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgICAgICAgICAgIHN0b3B0aW1lcj10cnVlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3RvcHRpbWVyPT10cnVlKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteVRpbW91dCk7XHJcbiAgICAgICAgICAgIG15VGltb3V0ID0gbnVsbDtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5pZih0eXBlb2Yoc3NkQ29tcG9uZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICBzc2RDb21wb25lbnQgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG4gICAgICAgIG51bWJlck9mQWN0aXZlOiAwLFxyXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdG9EZXN0cm95OiBmYWxzZSxcclxuICAgICAgICBvbkJsdXJEZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNzZENvbXBvbmVudC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSAkKCcjJyArIHNzZENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dyYXBwZXIgPSAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LnRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhLnRvLWRlc3Ryb3knKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudFdpZGdldCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5jaGlsZHJlbignZGl2LlNTRC1XcmFwcGVyOm5vdCguU2VsZWN0ZWQpJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhpcyBTU0QtV3JhcHBlciBpcyBhbHJlYWR5IFNlbGVjdGVkLCByZXR1cm4uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpOyAvL0JsdXJzIHRoZSBvdGhlciBmb2N1c2VkIFNTRCdzLlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKys7XHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKHRoaXMpLm91dGVyV2lkdGgoKSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLlNTRC1MaXN0JykuYXR0cignY3VycmVudC1mb2N1cycsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5wYXJlbnQoKS5oYXNDbGFzcygnU1NEUG9wdXAnKSl7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5hcHBlbmQoX3NzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnUG9zaXRpb25lZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5Qb3NpdGlvbmVkLlNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQoJyMnICsgJCh0aGlzKS5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ1Bvc2l0aW9uZWQnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdTZWFyY2hpbmcgRml4ZWQgS2V5Ym9hcmROYXYnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuU1NELUJhcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUtLTtcclxuICAgICAgICAgICAgJChcIi5TU0RfTGlzdFJlY29yZHMgc3BhbiwgLlNTRF9MaXN0TGluZS5TaG93TW9yZSwgLlNTRF9EZWxldGVPbkJsdXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL0lmIHRoZXJlJ3Mgbm8gU1NEIGFjdGl2ZSwgdGhlcmUncyBubyBuZWVkIHRvIHJlc2l6ZSBpdC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfc3NkV3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJCgnIycgKyBfc3NkV3JhcHBlci5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKVswXTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSBfc3NkV3JhcHBlci5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoX3NzZENvbXBvbmVudFdpZGdldCkud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LyosXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpIC0gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS5vdXRlcldpZHRoKCkgLSBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiU2VsZWN0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsIHNzZEJhciwgc2VsZWN0ZWRUYWIsIGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkVGFiID0gJChzZWxlY3RlZFRhYik7XHJcblxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRUYWIuaXMoJy5TZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFic0NsZWFyKHNzZEJhcik7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRUYWIuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKHNzZEJhcixpc0lucHV0RXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXNTZWxlY3RlZFRhYjogZnVuY3Rpb24oc3NkQmFyLGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNlYXJjaCBpbnB1dD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvQ2xpY2sgPSBzc2RCYXIuc2libGluZ3MoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhOm5vdCgudG8tZGVzdHJveSknKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNJbnB1dEV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBvbktleVVwRnVuY3Rpb24oZWxlbWVudFRvQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5JbnB1dFBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCg6Zm9jdXMpJykuZmlyc3QoKS5zZWxlY3QoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNob3J0IGxpc3Q/XHJcbiAgICAgICAgICAgIGlmKHNzZEJhci5jaGlsZHJlbignLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lci5TZWxlY3RlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5TaG9ydExpc3RTZWxlY3Rvci1Db250YWluZXIgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBNZXRob2QgYmVpbmcgY2FsbGVkIGJ5IHVzZXIgYWN0aW9uIGpzX3NzZENvbXBvbmVudF9mb2N1c0N1cnJlbnRSb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0N1cnJlbnRSb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJykuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJzQ2xlYXI6IGZ1bmN0aW9uKHNzZEJhcikge1xyXG4gICAgICAgICAgICAkKHNzZEJhcikuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEljb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCAkKGV2ZW50LmRhdGEuc3NkQmFyKS5jaGlsZHJlbignLlNlYXJjaElucHV0LUNvbnRhaW5lcicpLGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQG5hbWUgaW5wdXRFdmVudFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dEV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0Q29udGFpbmVyID0gJChldmVudC5kYXRhLmlucHV0KS5jbG9zZXN0KCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgX2lucHV0Q29udGFpbmVyLHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoJChldmVudC5kYXRhLmlucHV0KS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuYWRkQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgb25LZXlkb3duRnVuY3Rpb24oKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWJvYXJkSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJDb250cm9sXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJUYWJcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9jdXJyZW50Rm9jdXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpudGgtY2hpbGQoJyArIF9jdXJyZW50Rm9jdXMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLnByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbicpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5pcygnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9ICQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCAmJiBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1CYXInKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX3NlbGVjdGVkRWxlbWVudC5maW5kKCcuU1NEX0xpc3RMaW5lLkRpc2FibGVkJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdhLk90aGVyQ29udHJvbExpbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgX2N1cnJlbnRGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhfc3NkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyS2V5Ym9hcmROYXZTdGF0dXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgMClcclxuICAgICAgICAgICAgICAgIC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW4uZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmJsdXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPD0gMTAyNCl7XHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkgKyAncHgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLypOb3QgTW9iaWxlIGFwcGx5IGZpeGVkIGJlaGF2aW91ciovXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICgkKCcuVG9wUGF0aWVudEhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJCgnLkhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJChcIi50b29sYmFyLXdyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpICkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpICsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihfaW5wdXRJZCkgeyAvKiBVc2VkIHRvIGRlc3Ryb3kgYSBzcGVjaWZpYyBzc2QgY29tcG9uZW50IGJ5IHJlY2VpdmUgdGhlIGlucHV0IGlkZW50aWZpZXIgYXMgcGFyYW1ldGVyIGFuZCBkZXRlcm1pbmUgdGhlIHdyYXBwZXIgdG8gcmVtb3ZlLiAqL1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsX3RvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubGVuZ3RoKys7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5pc1JUTCA9ICQoJ2h0bWwnKS5pcygnLnJ0bCcpO1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudG9EZXN0cm95ID0gX3RvRGVzdHJveTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzc2RDb21wb25lbnRXaWRnZXQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5pZCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RDb21wb25lbnRXaWRnZXQuZmluZCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RCYXIgPSBfc3NkQ29tcG9uZW50LmNoaWxkcmVuKCcuU1NELUJhcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc2VhcmNoSWNvbiA9IF9zc2RCYXIuZmluZCgnLlNlYXJjaEljb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0ID0gX3NzZEJhci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfY2xlYXJDb250cm9sID0gX3NzZEJhci5maW5kKCcuQ2xlYXJDb250cm9sJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9zZWFyY2hJY29uLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXJcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LnNlYXJjaEljb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NzZEJhci5jaGlsZHJlbignZGl2Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsIHRoaXMsZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jbGVhckNvbnRyb2wub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleXVwJykub24oJ2tleXVwJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dFxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfaW5wdXQub2ZmKCdrZXlkb3duJykub24oJ2tleWRvd24nLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5rZXlkb3duRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChfc3NkQ29tcG9uZW50KS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50OiBfc3NkQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhldmVudC5kYXRhLnNzZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc3NkQ29tcG9uZW50LnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5pcygnOnZpc2libGUnKSkgeyAvKiBDbGlja3Mgb24gaGlkZGVuIGVsZW1lbnRzIGFyZSBkaXNtaXNzZWQuICovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighZS5sZW5ndGgpIHsgLy8gVXNlciBjbGlja2VkIG91dHNpZGUgdGhlIFNTRC1Db21wb25lbnQ/XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gXCIyN1wiKSB7IC8vIFVzZXIgaGl0IEVzY2FwZVxyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBLZXlib2FyZCBoYW5kbGVyXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5rZXlib2FyZEhhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID4gMCkgeyAvLyBJZiB0aGVyZSdzIGFuIFNTRCBjb21wb25lbnQgYWN0aXZlLCBnbyBmb3Igc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnNjcm9sbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBTU0RMaXN0TGluZSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU1NETGlzdExpbmUgPSB7XHJcblx0dG9nZ2xlOiAobGluZUlkLCBsaW5lSGFuZGxlciA9ICcnKSA9PiB7XHJcblx0XHR2YXIgX2xpbmUgPSAkKGxpbmVJZCkuaXMoJy5TU0RfTGlzdExpbmUnKVxyXG5cdFx0XHQ/ICQobGluZUlkKVxyXG5cdFx0XHQ6ICQobGluZUlkKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuU1NEX0xpc3RMaW5lJylcclxuXHRcdFx0XHRcdC5maXJzdCgpO1xyXG5cclxuXHRcdGlmICghX2xpbmUubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIF9leHBhbmRDb250cm9sID0gJCgnLmV4cGFuZC1jb250cm9sLWN1c3RvbS13aWR0aCcpO1xyXG5cclxuXHRcdGlmIChfZXhwYW5kQ29udHJvbC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRfZXhwYW5kQ29udHJvbC5yZW1vdmVDbGFzcygnZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XHJcblx0XHRcdF9leHBhbmRDb250cm9sLmNzcygnd2lkdGgnLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfbGluZS5pcygnLkFjdGl2ZScpKSB7XHJcblx0XHRcdHZhciBfbGluZUhlYWRlciA9IF9saW5lXHJcblx0XHRcdFx0LmNsb3Nlc3QoJ2Rpdi5TZWxlY3RhYmxlTGlzdCwgLlNlbGVjdGFibGVMaXN0LUxpc3RSZWNvcmRzJylcclxuXHRcdFx0XHQuZmluZCgnZGl2LlNlbGVjdGFibGVMaXN0LUxpbmUuQWN0aXZlJylcclxuXHRcdFx0XHQubm90KF9saW5lKTtcclxuXHJcblx0XHRcdF9saW5lSGVhZGVyLmZpbmQoJ2FbaGlkZS1hY3Rpb25dJykuY2xpY2soKTtcclxuXHRcdFx0X2xpbmVIZWFkZXJcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCdzcGFuJylcclxuXHRcdFx0XHQuaGlkZSgyMDApO1xyXG5cdFx0XHRfbGluZS5hZGRDbGFzcygnQWN0aXZlJyk7XHJcblxyXG5cdFx0XHRpZiAoJChsaW5lSGFuZGxlcikubGVuZ3RoKSB7XHJcblx0XHRcdFx0JChsaW5lSGFuZGxlcikuY2xpY2soKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X2xpbmUucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBUYWJzRXh0ZW5kZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCA9IGZ1bmN0aW9uKCkge1xyXG5cdCQoJy5UYWJzX0V4dGVuZGVkIC5UYWJzX2hlYWRlciA+IC5UYWJzX190YWInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykudGV4dCgpID09PSAnJykge1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcuVGFic19FeHRlbmRlZCAuVGFic19oZWFkZXIgLlRhYnNfX3RhYjpub3QoLmFjdGl2ZSknKVxyXG5cdFx0Lm9mZignbW91c2Vkb3duJylcclxuXHRcdC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xyXG5cdFx0XHQkdGFic0V4dGVuZGVkLnJlbW92ZUNsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkLkhpZGVBY3RpdmVPbkNsaWNrIC5UYWJzX2hlYWRlcicpXHJcblx0XHQub2ZmKCdtb3VzZWRvd24nKVxyXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0dmFyICR0YWJzRXh0ZW5kZWQgPSAkKGV2dC50YXJnZXQpLmNsb3Nlc3QoJy5UYWJzX0V4dGVuZGVkJyk7XHJcblx0XHRcdHZhciAkdGFic0JvZHkgPSAkdGFic0V4dGVuZGVkLmZpbmQoJy5UYWJzX2JvZHknKTtcclxuXHJcblx0XHRcdGlmICgkdGFic0JvZHkuaGFzQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJykpIHtcclxuXHRcdFx0XHQkdGFic0JvZHkucmVtb3ZlQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkdGFic0JvZHkuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5hZGRDbGFzcygnaXNDbG9zZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkLS1kaXNhYmxlZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHQkKGVsKVxyXG5cdFx0XHQucGFyZW50KClcclxuXHRcdFx0LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKVxyXG5cdFx0XHQub2ZmKCdjbGljaycpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuVGFic19FeHRlbmRlZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHRpZiAoJChlbCkuaGFzQ2xhc3MoJ1RhYnNfRXh0ZW5kZWQtLWNsb3NlZG9uc3RhcnQnKSkge1xyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5maW5kKCcuVGFic19ib2R5JylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdCQoZWwpLmFkZENsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0XHQkKGVsKS5yZW1vdmVDbGFzcygnVGFic19FeHRlbmRlZC0tY2xvc2Vkb25zdGFydCcpO1xyXG5cdFx0fVxyXG5cdFx0JChlbClcclxuXHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdCQoZXZ0LnRhcmdldClcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuVGFic19ib2R5JylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKCk7XHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBUcmlnZ2VySWZyYW1lVG9vbHRpcCAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcbiAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIHZhciAkZWxlbWVudElkID0gJCgnIycgKyBjb25maWcuZWxlbWVudElkKTtcclxuICAgICRlbGVtZW50SWQuYWRkQ2xhc3MoJ3Rvb2x0aXAnKTtcclxuXHJcbiAgICB2YXIgZXh0cmFEYXRhUGFyYW1zID0gJ2RhdGEtaWZyYW1ldG9vbHRpcHRyaWdnZXJpZD1cIicgKyBjb25maWcuZWxlbWVudElkICsgJ1wiJztcclxuICAgIHZhciB3aWRnZXROb3RpZnlEaXYgPSAkLmZpbmQoJ1tkYXRhLWlmcmFtZXRvb2x0aXB0cmlnZ2VyaWQ9XCInICsgY29uZmlnLmVsZW1lbnRJZCArICdcIl0nKTtcclxuICAgIGlmICh3aWRnZXROb3RpZnlEaXYubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGV4dHJhRGF0YVBhcmFtcyArPSBcIiBkYXRhLWlmcmFtZXRvb2x0aXBub3RpZnlpZD1cIiArICQod2lkZ2V0Tm90aWZ5RGl2KS5kYXRhKCdpZnJhbWV0b29sdGlwbm90aWZ5aWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbWVudElkLnRvb2x0aXBzdGVyKHtcclxuICAgICAgY29udGVudEFzSFRNTDogdHJ1ZSxcclxuICAgICAgdGhlbWU6IGNvbmZpZy50aGVtZSxcclxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uOiBjb25maWcucG9zaXRpb25JZCxcclxuICAgICAgdHJpZ2dlcjogY29uZmlnLnRyaWdnZXJJZCxcclxuICAgICAgbWluV2lkdGg6IGNvbmZpZy5taW5XaWR0aCxcclxuICAgICAgbWF4V2lkdGg6IGNvbmZpZy5tYXhXaWR0aCxcclxuICAgICAgemluZGV4OiBjb25maWcuemluZGV4LFxyXG4gICAgICBjb250ZW50OiAnPGlmcmFtZSBzcmM9XCInICsgY29uZmlnLlVSTCArICdcIiBzdHlsZT1cImJvcmRlcjpub25lXCIgaWQ9XCJ0b29sdGlwc3Rlci1mcmFtZVwiICcgKyBleHRyYURhdGFQYXJhbXMgKyAnPjwvaWZyYW1lPicsXHJcbiAgICAgIGZ1bmN0aW9uUmVhZHk6IGZ1bmN0aW9uIChpbnN0YW5jZSwgaGVscGVyKSB7XHJcbiAgICAgICAgJChoZWxwZXIpLmNzcyh7XHJcbiAgICAgICAgICAndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcyh7XHJcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5UcmlnZ2VySWZyYW1lVG9vbHRpcCA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH1cclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvL1NhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9