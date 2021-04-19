/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./database/index.ts":
/*!***************************!*\
  !*** ./database/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getConnection = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const uri = "mongodb+srv://gatsby:hBNWt650IxGpSDJI@cluster0.cqcjd.mongodb.net/gatsby?retryWrites=true&w=majority";
let conn = null;
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if ((conn = null)) {
        conn = yield mongoose_1.default.createConnection(uri, {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
        });
    }
    return conn;
});
exports.getConnection = getConnection;


/***/ }),

/***/ "./database/models/koha.ts":
/*!*********************************!*\
  !*** ./database/models/koha.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const collectionName = "kohaclub";
const kohaclubSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.SchemaTypes.ObjectId, required: true },
    name: { type: mongoose_1.default.SchemaTypes.String, required: true },
    Amount: { type: mongoose_1.default.SchemaTypes.Number, required: true },
});
const Kohaclub = mongoose_1.default.model(collectionName, kohaclubSchema);
exports.default = Kohaclub;


/***/ }),

/***/ "./database/resolvers/kohaclub.ts":
/*!****************************************!*\
  !*** ./database/resolvers/kohaclub.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_errors_1 = __webpack_require__(/*! apollo-server-errors */ "apollo-server-errors");
const koha_1 = __importDefault(__webpack_require__(/*! ../../database/models/koha */ "./database/models/koha.ts"));
exports.default = {
    Query: {
        kohaclub: (parent, args, { dbConn }) => __awaiter(void 0, void 0, void 0, function* () {
            let list;
            try {
                list = yield koha_1.default.find().exec();
            }
            catch (error) {
                console.error("> getAllClubs error: ", error);
                throw new apollo_server_errors_1.ApolloError("Error retrieving all koha clubs");
            }
            return list;
        }),
    },
};


/***/ }),

/***/ "./database/schema/koha.ts":
/*!*********************************!*\
  !*** ./database/schema/koha.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.default = apollo_server_lambda_1.gql `
  type kohaclub {
    _id: ID!
    name: String!
    Amount: Int
  }
  type Query {
    kohaclub: [kohaclub]
  }
`;


/***/ }),

/***/ "./src/apollo-server.ts":
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const database_1 = __webpack_require__(/*! ../database */ "./database/index.ts");
const koha_1 = __importDefault(__webpack_require__(/*! ../database/schema/koha */ "./database/schema/koha.ts"));
const kohaclub_1 = __importDefault(__webpack_require__(/*! ../database/resolvers/kohaclub */ "./database/resolvers/kohaclub.ts"));
const apolloServer = new apollo_server_lambda_1.ApolloServer({
    resolvers: kohaclub_1.default,
    typeDefs: koha_1.default,
    context: () => __awaiter(void 0, void 0, void 0, function* () {
        const dbConn = yield database_1.getConnection();
        return { dbConn };
    }),
    playground: true,
    introspection: true,
});
exports.graphqlHandler = apolloServer.createHandler();


/***/ }),

/***/ "apollo-server-errors":
/*!***************************************!*\
  !*** external "apollo-server-errors" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-errors");;

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/apollo-server.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rZXRhLWthaS1rb2hhLy4vZGF0YWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8va2V0YS1rYWkta29oYS8uL2RhdGFiYXNlL21vZGVscy9rb2hhLnRzIiwid2VicGFjazovL2tldGEta2FpLWtvaGEvLi9kYXRhYmFzZS9yZXNvbHZlcnMva29oYWNsdWIudHMiLCJ3ZWJwYWNrOi8va2V0YS1rYWkta29oYS8uL2RhdGFiYXNlL3NjaGVtYS9rb2hhLnRzIiwid2VicGFjazovL2tldGEta2FpLWtvaGEvLi9zcmMvYXBvbGxvLXNlcnZlci50cyIsIndlYnBhY2s6Ly9rZXRhLWthaS1rb2hhL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1lcnJvcnNcIiIsIndlYnBhY2s6Ly9rZXRhLWthaS1rb2hhL2V4dGVybmFsIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly9rZXRhLWthaS1rb2hhL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly9rZXRhLWthaS1rb2hhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tldGEta2FpLWtvaGEvd2VicGFjay9zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCB7IGVudmlyb21lbnQgfSBmcm9tIFwiLi4vZW52aXJvbWVudFwiO1xuXG4vLyBjb25zdCB1cmk6IHN0cmluZyA9IGVudmlyb21lbnQubW9uZ29VUkw7XG5cbmNvbnN0IHVyaTogc3RyaW5nID1cbiAgXCJtb25nb2RiK3NydjovL2dhdHNieTpoQk5XdDY1MEl4R3BTREpJQGNsdXN0ZXIwLmNxY2pkLm1vbmdvZGIubmV0L2dhdHNieT9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlcIjtcblxubGV0IGNvbm46IG1vbmdvb3NlLkNvbm5lY3Rpb24gPSBudWxsO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9IGFzeW5jICgpOiBQcm9taXNlPG1vbmdvb3NlLkNvbm5lY3Rpb24+ID0+IHtcbiAgaWYgKChjb25uID0gbnVsbCkpIHtcbiAgICBjb25uID0gYXdhaXQgbW9uZ29vc2UuY3JlYXRlQ29ubmVjdGlvbih1cmksIHtcbiAgICAgIC8vIGF1dGhTb3VyY2U6IFwiYWRtaW5cIixcbiAgICAgIC8vIHVzZXI6IFwiZ2F0c2J5XCIsXG4gICAgICAvLyBwYXNzOiBcImhCTld0NjUwSXhHcFNESklcIixcbiAgICAgIC8vIHNzbDogdHJ1ZSxcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICAgIGJ1ZmZlck1heEVudHJpZXM6IDAsXG4gICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXG4gICAgICB1c2VDcmVhdGVJbmRleDogdHJ1ZSxcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuICAvLyBjb25uLm9uY2UoXCJvcGVuXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBkYXRhYmFzZVwiKTtcbiAgLy8gfSk7XG5cbiAgLy8gY29ubi5vbihcImVycm9yXCIsICgpID0+IHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIkVycm9yIGNvbm5lY3RpbmcgdG8gZGF0YWJhc2VcIik7XG4gIC8vIH0pO1xuXG4gIHJldHVybiBjb25uO1xufTtcbiIsImltcG9ydCBtb25nb29zZSwgeyBOdW1iZXIgfSBmcm9tIFwibW9uZ29vc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJS29oYSBleHRlbmRzIG1vbmdvb3NlLkRvY3VtZW50IHtcbiAgX2lkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgQW1vdW50OiBOdW1iZXI7XG59XG5cbi8vIGNvbnN0IHNjaGVtYTogbW9uZ29vc2UuU2NoZW1hRGVmaW5pdGlvbiA9IHtcbi8vICAgX2lkOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYVR5cGVzLk51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbi8vICAgbmFtZTogeyB0eXBlOiBtb25nb29zZS5TY2hlbWFUeXBlcy5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4vLyAgIEFtb3VudDogeyB0eXBlOiBtb25nb29zZS5TY2hlbWFUeXBlcy5OdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXG4vLyB9O1xuXG5jb25zdCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nID0gXCJrb2hhY2x1YlwiO1xuLy8gY29uc3Qga29oYWNsdWJTY2hlbWE6IG1vbmdvb3NlLlNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoc2NoZW1hKTtcbmNvbnN0IGtvaGFjbHViU2NoZW1hOiBtb25nb29zZS5TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgX2lkOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYVR5cGVzLk9iamVjdElkLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBuYW1lOiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYVR5cGVzLlN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgQW1vdW50OiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYVR5cGVzLk51bWJlciwgcmVxdWlyZWQ6IHRydWUgfSxcbn0pO1xuXG4vLyBjb25zdCBrb2hhY2x1YiA9IG1vbmdvb3NlLm1vZGVsKFwia29oYWNsdWJcIiwga29oYWNsdWJTY2hlbWEpO1xuLy8gY29uc3QgS29oYWNsdWIgPSAoY29ubjogbW9uZ29vc2UuQ29ubmVjdGlvbik6IGFueSA9PiB7XG4vLyAgIGNvbm4ubW9kZWwoY29sbGVjdGlvbk5hbWUsIGtvaGFjbHViU2NoZW1hKTtcbi8vIH07XG5cbmNvbnN0IEtvaGFjbHViOiBtb25nb29zZS5Nb2RlbDxJS29oYT4gPSBtb25nb29zZS5tb2RlbChcbiAgY29sbGVjdGlvbk5hbWUsXG4gIGtvaGFjbHViU2NoZW1hXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBLb2hhY2x1YjtcbiIsImltcG9ydCB7IEFwb2xsb0Vycm9yIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItZXJyb3JzXCI7XG5pbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgS29oYSwgeyBJS29oYSB9IGZyb20gXCIuLi8uLi9kYXRhYmFzZS9tb2RlbHMva29oYVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFF1ZXJ5OiB7XG4gICAga29oYWNsdWI6IGFzeW5jIChcbiAgICAgIHBhcmVudDogYW55LFxuICAgICAgYXJnczogYW55LFxuICAgICAgeyBkYkNvbm4gfTogeyBkYkNvbm46IG1vbmdvb3NlLkNvbm5lY3Rpb24gfVxuICAgICk6IFByb21pc2U8SUtvaGFbXT4gPT4ge1xuICAgICAgLy8gY29uc3QgS29oYTogbW9uZ29vc2UuTW9kZWw8SUtvaGE+ID0gS29oYU1vZGVsKGRiQ29ubik7XG5cbiAgICAgIGxldCBsaXN0OiBJS29oYVtdO1xuXG4gICAgICB0cnkge1xuICAgICAgICBsaXN0ID0gYXdhaXQgS29oYS5maW5kKCkuZXhlYygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIj4gZ2V0QWxsQ2x1YnMgZXJyb3I6IFwiLCBlcnJvcik7XG5cbiAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKFwiRXJyb3IgcmV0cmlldmluZyBhbGwga29oYSBjbHVic1wiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcblxuZXhwb3J0IGRlZmF1bHQgZ3FsYFxuICB0eXBlIGtvaGFjbHViIHtcbiAgICBfaWQ6IElEIVxuICAgIG5hbWU6IFN0cmluZyFcbiAgICBBbW91bnQ6IEludFxuICB9XG4gIHR5cGUgUXVlcnkge1xuICAgIGtvaGFjbHViOiBba29oYWNsdWJdXG4gIH1cbmA7XG4iLCJpbXBvcnQgeyBBcG9sbG9TZXJ2ZXIgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcbi8vIGltcG9ydCB7IHJlc29sdmVycyB9IGZyb20gXCIuL3Jlc29sdmVyc1wiO1xuLy8gaW1wb3J0IHsgdHlwZURlZnMgfSBmcm9tIFwiLi90eXBlLWRlZnNcIjtcbmltcG9ydCB7IGdldENvbm5lY3Rpb24gfSBmcm9tIFwiLi4vZGF0YWJhc2VcIjtcbmltcG9ydCB0eXBlRGVmcyBmcm9tIFwiLi4vZGF0YWJhc2Uvc2NoZW1hL2tvaGFcIjtcbmltcG9ydCByZXNvbHZlcnMgZnJvbSBcIi4uL2RhdGFiYXNlL3Jlc29sdmVycy9rb2hhY2x1YlwiO1xuXG5jb25zdCBhcG9sbG9TZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtcbiAgcmVzb2x2ZXJzLFxuICB0eXBlRGVmcyxcbiAgY29udGV4dDogYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGRiQ29ubiA9IGF3YWl0IGdldENvbm5lY3Rpb24oKTtcbiAgICByZXR1cm4geyBkYkNvbm4gfTtcbiAgfSxcbiAgLy8gY29udGV4dDogeyBtb2RlbHMgfSxcbiAgcGxheWdyb3VuZDogdHJ1ZSxcbiAgaW50cm9zcGVjdGlvbjogdHJ1ZSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZ3JhcGhxbEhhbmRsZXIgPSBhcG9sbG9TZXJ2ZXIuY3JlYXRlSGFuZGxlcigpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1lcnJvcnNcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTs7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2Fwb2xsby1zZXJ2ZXIudHNcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUtBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUF2QkE7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQWNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBS0E7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7OztBQzVCQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0E7Ozs7Ozs7O0FDckJBO0FBQ0E7QTs7Ozs7Ozs7QUNEQTtBQUNBO0E7Ozs7Ozs7O0FDREE7QUFDQTtBOzs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9