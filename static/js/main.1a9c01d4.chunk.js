(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{116:function(e,t,a){e.exports=a(145)},121:function(e,t,a){},145:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),c=a.n(o);a(121),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,s,l=a(57),u=a.n(l),d=a(187),f=a(188),m=a(189),b=a(147),p=a(184),O=a(190),T=a(23),E=a(9),v=a(69),k=a(93),j=a.n(k).a.create(Object(E.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"1cdd9f77-c60e-4af5-b194-659e4ebd5d41"}})),I=function(){return j.get("todo-lists")},g=function(e){return j.post("todo-lists",{title:e})},h=function(e){return j.delete("todo-lists/".concat(e))},S=function(e,t){return j.put("todo-lists/".concat(e),{title:t})},A=function(e){return j.get("todo-lists/".concat(e,"/tasks"))},C=function(e,t){return j.delete("todo-lists/".concat(e,"/tasks/").concat(t))},_=function(e,t){return j.post("todo-lists/".concat(e,"/tasks"),{title:t})},x=function(e,t,a){return j.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},w=function(e){return j.post("auth/login",e)},L=function(){return j.delete("auth/login")},y=function(){return j.get("auth/me")};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(i||(i={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(s||(s={}));var D={status:"idle",error:null,isInitialized:!1},N=function(e){return{type:"APP/SET-ERROR",error:e}},P=function(e){return{type:"APP/SET-STATUS",status:e}},K=a(14),R=a.n(K),F=R.a.mark(U),H=R.a.mark(V),M=function(e,t){e.messages.length?t(N(e.messages[0])):t(N("Some error occurred")),t(P("failed"))};function U(e,t){return R.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!e.messages.length){a.next=5;break}return a.next=3,t(N(e.messages[0]));case 3:a.next=7;break;case 5:return a.next=7,t(N("Some error occurred"));case 7:return a.next=9,t(P("failed"));case 9:case"end":return a.stop()}}),F)}var G=function(e,t){t(N(e.message?e.message:"Some error occurred")),t(P("failed"))};function V(e,t){return R.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t(N(e.message?e.message:"Some error occurred"));case 2:return a.next=4,t(P("failed"));case 4:case"end":return a.stop()}}),H)}var W=[],Y=a(146),q=a(50),B=a(191),J=a(180),Z=a(181),z=a(94),Q=a.n(z),X=r.a.memo((function(e){var t=e.addItem,a=e.disabled,o=void 0!==a&&a,c=Object(n.useState)(""),i=Object(q.a)(c,2),s=i[0],l=i[1],u=Object(n.useState)(null),d=Object(q.a)(u,2),f=d[0],m=d[1],b=function(){""!==s.trim()?(t(s),l("")):m("Title is required")};return r.a.createElement("div",{className:Q.a.addItemForm},r.a.createElement(B.a,{variant:"outlined",fullWidth:!0,disabled:o,error:!!f,value:s,onChange:function(e){l(e.currentTarget.value)},onKeyPress:function(e){null!==f&&m(null),13===e.charCode&&b()},label:"Title",helperText:f}),r.a.createElement(J.a,{color:"primary",onClick:b,disabled:o},r.a.createElement(Z.a,null)))})),$=a(104),ee=a(98),te=a.n(ee),ae=r.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(q.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(e.value),s=Object(q.a)(i,2),l=s[0],u=s[1];return o?r.a.createElement(B.a,{value:l,onChange:function(e){u(e.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),e.onChange(l)}}):r.a.createElement("span",{onDoubleClick:function(){c(!0),u(e.value)},className:te.a.span},e.value)})),ne=a(183),re=a(193),oe=a(182),ce=a(70),ie=a.n(ce),se=r.a.memo((function(e){var t=Object(n.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),a=Object(n.useCallback)((function(t){var a=t.currentTarget.checked;e.changeTaskStatus(e.task.id,a?i.Completed:i.New,e.todolistId)}),[e.task.id,e.todolistId]),o=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.task.id,e.todolistId]),c=e.task.status===i.Completed?"".concat(ie.a.task," ").concat(ie.a.doneTask):ie.a.task;return r.a.createElement("div",{key:e.task.id,className:c},r.a.createElement("div",null,r.a.createElement(re.a,{checked:e.task.status===i.Completed,color:"primary",onChange:a}),r.a.createElement(ae,{value:e.task.title,onChange:o})),r.a.createElement(J.a,{onClick:t},r.a.createElement(oe.a,null)))})),le=a(12),ue=a(40),de={},fe=function(e){return{type:"ADD-TASK",task:e}},me=function(e,t,a){return{type:"UPDATE-TASK",model:t,todolistId:a,taskId:e}},be=function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}},pe=R.a.mark(ke),Oe=R.a.mark(je),Te=R.a.mark(Ie),Ee=R.a.mark(ge),ve=R.a.mark(Se);function ke(e){var t,a;return R.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(le.c)(P("loading"));case 2:return n.next=4,Object(le.b)(A,e.todolistId);case 4:return t=n.sent,a=t.data.items,n.next=8,Object(le.c)(be(a,e.todolistId));case 8:return n.next=10,Object(le.c)(P("succeeded"));case 10:case"end":return n.stop()}}),pe)}function je(e){return R.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(le.b)(C,e.todolistId,e.taskId);case 2:return t.next=4,Object(le.c)((a=e.taskId,n=e.todolistId,{type:"REMOVE-TASK",taskId:a,todolistId:n}));case 4:case"end":return t.stop()}var a,n}),Oe)}function Ie(e){var t,a;return R.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(le.c)(P("loading"));case 3:return n.next=5,Object(le.b)(_,e.todolistId,e.title);case 5:if(0!==(t=n.sent).data.resultCode){n.next=14;break}return a=t.data.data.item,n.next=10,Object(le.c)(fe(a));case 10:return n.next=12,Object(le.c)(P("succeeded"));case 12:n.next=15;break;case 14:U(t.data,le.c);case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(0),V(n.t0,le.c);case 20:case"end":return n.stop()}}),Te,null,[[0,17]])}function ge(e){var t,a,n,r,o,c,i,s;return R.a.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return t=e.taskId,a=e.domainModel,n=e.todolistId,l.prev=1,l.next=4,Object(le.d)((function(e){return e.tasks}));case 4:if(r=l.sent,o=r[n].find((function(e){return e.id===t}))){l.next=9;break}return console.warn("task not found in the state"),l.abrupt("return");case 9:return c=Object(E.a)({deadline:o.deadline,description:o.description,priority:o.priority,startDate:o.startDate,title:o.title,status:o.status},a),l.next=12,Object(le.b)(x,n,t,c);case 12:if(0!==(i=l.sent).data.resultCode){l.next=19;break}return s=me(t,a,n),l.next=17,Object(le.c)(s);case 17:l.next=20;break;case 19:U(i.data,le.c);case 20:l.next=25;break;case 22:l.prev=22,l.t0=l.catch(1),V(l.t0,le.c);case 25:case"end":return l.stop()}}),Ee,null,[[1,22]])}var he=function(e,t,a){return{type:"TASKS/UPDATE-TASK",taskId:e,domainModel:t,todolistId:a}};function Se(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(le.e)("TASKS/FETCH-TASKS",ke);case 2:return e.next=4,Object(le.e)("TASKS/REMOVE-TASK",je);case 4:return e.next=6,Object(le.e)("TASKS/ADD-TASK",Ie);case 6:return e.next=8,Object(le.e)("TASKS/UPDATE-TASK",ge);case 8:case"end":return e.stop()}}),ve)}var Ae=a(58),Ce=a.n(Ae),_e=r.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,o=Object($.a)(e,["demo"]),c=Object(T.b)();Object(n.useEffect)((function(){if(!a){var e={type:"TASKS/FETCH-TASKS",todolistId:o.todolist.id};c(e)}}),[]);var s=Object(n.useCallback)((function(e){o.addTask(e,o.todolist.id)}),[o.addTask,o.todolist.id]),l=Object(n.useCallback)((function(e){o.changeTodolistTitle(o.todolist.id,e)}),[o.todolist.id,o.changeTodolistTitle]),u=Object(n.useCallback)((function(){return o.changeFilter("all",o.todolist.id)}),[o.todolist.id,o.changeFilter]),d=Object(n.useCallback)((function(){return o.changeFilter("active",o.todolist.id)}),[o.todolist.id,o.changeFilter]),f=Object(n.useCallback)((function(){return o.changeFilter("completed",o.todolist.id)}),[o.todolist.id,o.changeFilter]),m=Object(n.useRef)(null);Object(n.useEffect)((function(){var e=m.current,t=function(t){e.offsetHeight!==e.scrollHeight&&t.stopPropagation()};return e.addEventListener("wheel",t),function(){e.removeEventListener("wheel",t)}}),[]);var b=o.tasks;return"active"===o.todolist.filter&&(b=o.tasks.filter((function(e){return e.status===i.New}))),"completed"===o.todolist.filter&&(b=o.tasks.filter((function(e){return e.status===i.Completed}))),r.a.createElement("div",{className:Ce.a.todolist},r.a.createElement("h3",{className:Ce.a.title},r.a.createElement(ae,{value:o.todolist.title,onChange:l}),r.a.createElement(J.a,{onClick:function(){o.removeTodolist(o.todolist.id)},disabled:"loading"===o.todolist.entityStatus},r.a.createElement(ne.a,null))),r.a.createElement(X,{addItem:s,disabled:"loading"===o.todolist.entityStatus}),r.a.createElement("div",{ref:m,className:Ce.a.tasks},b.map((function(e){return r.a.createElement(se,{key:e.id,task:e,todolistId:o.todolist.id,removeTask:o.removeTask,changeTaskTitle:o.changeTaskTitle,changeTaskStatus:o.changeTaskStatus})}))),r.a.createElement("div",{className:Ce.a.filterContainer},r.a.createElement(p.a,{variant:"all"===o.todolist.filter?"outlined":"text",onClick:u,color:"default"},"All"),r.a.createElement(p.a,{variant:"active"===o.todolist.filter?"outlined":"text",onClick:d,color:"primary"},"Active"),r.a.createElement(p.a,{variant:"completed"===o.todolist.filter?"outlined":"text",onClick:f,color:"secondary"},"Completed")))})),xe=a(18),we=a(59),Le=a.n(we),ye=function(e){var t=e.demo,a=void 0!==t&&t,o=Object(T.c)((function(e){return e.todolists})),c=Object(T.c)((function(e){return e.tasks})),i=Object(T.c)((function(e){return e.auth.isLoggedIn})),s=Object(T.b)();Object(n.useEffect)((function(){if(!a&&i){var e=function(e){e(P("loading")),I().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(P("succeeded"))})).catch((function(t){G(t,e)}))};s(e)}}),[]);var l=Object(n.useCallback)((function(e,t){s(function(e,t){return{type:"TASKS/REMOVE-TASK",todolistId:t,taskId:e}}(e,t))}),[]),u=Object(n.useCallback)((function(e,t){s(function(e,t){return{type:"TASKS/ADD-TASK",title:e,todolistId:t}}(e,t))}),[]),d=Object(n.useCallback)((function(e,t,a){var n=he(e,{status:t},a);s(n)}),[]),f=Object(n.useCallback)((function(e,t,a){var n=he(e,{title:t},a);s(n)}),[]),m=Object(n.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};s(a)}),[]),b=Object(n.useCallback)((function(e){var t,a=(t=e,function(e){e(P("loading")),e({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:t,status:"loading"}),h(t).then((function(a){e(function(e){return{type:"REMOVE-TODOLIST",id:e}}(t)),e(P("succeeded"))}))});s(a)}),[]),p=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){S(e,t).then((function(n){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t))}))}}(e,t);s(a)}),[]),O=Object(n.useCallback)((function(e){var t=function(e){return function(t){t(P("loading")),g(e).then((function(e){t({type:"ADD-TODOLIST",todolist:e.data.data.item}),t(P("succeeded"))}))}}(e);s(t)}),[s]),E=Object(n.useRef)(null),v=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=E.current,t=v.current,a=function(t){t.preventDefault(),e.scrollLeft+=t.deltaY};return t.addEventListener("wheel",a),function(){t.removeEventListener("wheel",a)}}),[]),i?r.a.createElement("div",{ref:v,className:Le.a.todolistList},r.a.createElement("div",{className:Le.a.addItemWrapper},r.a.createElement(X,{addItem:O})),r.a.createElement("div",{ref:E,className:Le.a.todolistsContainer},o.map((function(e){var t=c[e.id];return r.a.createElement(Y.a,{key:e.id,elevation:3,className:Le.a.todoListWrapper},r.a.createElement(_e,{todolist:e,tasks:t,removeTask:l,changeFilter:m,addTask:u,changeTaskStatus:d,removeTodolist:b,changeTaskTitle:f,changeTodolistTitle:p,demo:a}))})))):r.a.createElement(xe.a,{to:"/login"})},De=a(195),Ne=a(192);function Pe(e){return r.a.createElement(Ne.a,Object.assign({elevation:6,variant:"filled"},e))}function Ke(){var e=Object(T.c)((function(e){return e.app.error})),t=Object(T.b)(),a=function(e,a){"clickaway"!==a&&t(N(null))},n=null!==e;return r.a.createElement(De.a,{open:n,autoHideDuration:6e3,onClose:a},r.a.createElement(Pe,{onClose:a,severity:"error"},e))}var Re=a(196),Fe=a(179),He=a(185),Me=a(186),Ue=a(102),Ge={isLoggedIn:!1},Ve=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},We=a(71),Ye=a.n(We),qe=function(){var e=Object(T.b)(),t=Object(T.c)((function(e){return e.auth.isLoggedIn})),a=Object(Ue.a)({validate:function(e){return e.email?e.password?void 0:{password:"Password is required"}:{email:"Email is required"}},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(t){var a;e((a=t,function(e){e(P("loading")),w(a).then((function(t){0===t.data.resultCode?(e(Ve(!0)),e(P("succeeded"))):M(t.data,e)})).catch((function(t){G(t,e)}))}))}});return t?r.a.createElement(xe.a,{to:"/"}):r.a.createElement("div",{className:Ye.a.login},r.a.createElement(Y.a,{className:Ye.a.formHolder},r.a.createElement("form",{onSubmit:a.handleSubmit},r.a.createElement(Re.a,null,r.a.createElement(Fe.a,null,r.a.createElement(b.a,{variant:"h4",className:Ye.a.title},"SIGN IN"),r.a.createElement("p",null,"To log in use common test account credentials:"),r.a.createElement("p",null," Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(He.a,null,r.a.createElement(B.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?r.a.createElement("div",null,a.errors.email):null,r.a.createElement(B.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?r.a.createElement("div",null,a.errors.password):null,r.a.createElement(Me.a,{label:"Remember me",control:r.a.createElement(re.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),r.a.createElement(p.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},Be=R.a.mark(Ze),Je=R.a.mark(ze);function Ze(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(le.b)(y);case 2:if(0!==e.sent.data.resultCode){e.next=6;break}return e.next=6,Object(le.c)(Ve(!0));case 6:return e.next=8,Object(le.c)({type:"APP/SET-IS-INITIALIED",value:!0});case 8:case"end":return e.stop()}}),Be)}function ze(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(le.e)("APP/INITIALIZE-APP",Ze);case 2:case"end":return e.stop()}}),Je)}var Qe=function(e){var t=e.demo,a=void 0!==t&&t,o=Object(T.c)((function(e){return e.app.status})),c=Object(T.c)((function(e){return e.app.isInitialized})),i=Object(T.c)((function(e){return e.auth.isLoggedIn})),s=Object(T.b)(),l=Object(n.useCallback)((function(){s((function(e){e(P("loading")),L().then((function(t){0===t.data.resultCode?(e(Ve(!1)),e(P("succeeded"))):M(t.data,e)})).catch((function(t){G(t,e)}))}))}),[]);return Object(n.useEffect)((function(){s({type:"APP/INITIALIZE-APP"})}),[]),c?r.a.createElement("div",{className:u.a.app},r.a.createElement(Ke,null),r.a.createElement(f.a,{position:"static"},r.a.createElement(m.a,{className:u.a.toolbar},r.a.createElement(b.a,{variant:"h6"},"Todo"),i&&r.a.createElement(p.a,{color:"inherit",onClick:l},"Log out")),"loading"===o&&r.a.createElement(O.a,null)),r.a.createElement("main",{className:u.a.main},r.a.createElement(xe.b,{exact:!0,path:"/",render:function(){return r.a.createElement(ye,{demo:a})}}),r.a.createElement(xe.b,{path:"/login",render:function(){return r.a.createElement(qe,null)}}))):r.a.createElement("div",{className:u.a.loaderHolder},r.a.createElement(d.a,null))},Xe=a(47),$e=a(101),et=a(103),tt=R.a.mark(ot),at=Object(Xe.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(E.a)(Object(E.a)({},e),{},Object(ue.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!=t.taskId}))));case"ADD-TASK":return Object(E.a)(Object(E.a)({},e),{},Object(ue.a)({},t.task.todoListId,[t.task].concat(Object(v.a)(e[t.task.todoListId]))));case"UPDATE-TASK":return Object(E.a)(Object(E.a)({},e),{},Object(ue.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(E.a)(Object(E.a)({},e),t.model):e}))));case"ADD-TODOLIST":return Object(E.a)(Object(E.a)({},e),{},Object(ue.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(E.a)({},e);return delete a[t.id],a;case"SET-TODOLISTS":var n=Object(E.a)({},e);return t.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(E.a)(Object(E.a)({},e),{},Object(ue.a)({},t.todolistId,t.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":return[Object(E.a)(Object(E.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(v.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(E.a)(Object(E.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(E.a)(Object(E.a)({},e),{},{filter:t.filter}):e}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.id?Object(E.a)(Object(E.a)({},e),{},{entityStatus:t.status}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(E.a)(Object(E.a)({},e),{},{filter:"all",entityStatus:"idle"})}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(E.a)(Object(E.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(E.a)(Object(E.a)({},e),{},{error:t.error});case"APP/SET-IS-INITIALIED":return Object(E.a)(Object(E.a)({},e),{},{isInitialized:t.value});default:return Object(E.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(E.a)(Object(E.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),nt=Object(et.a)(),rt=Object(Xe.d)(at,Object(Xe.a)($e.a,nt));function ot(){return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(le.a)([ze(),Se()]);case 2:case"end":return e.stop()}}),tt)}nt.run(ot),setTimeout((function(){rt.dispatch({type:"ACTIVATOR-ACTION-TYPE"})}),2e3),window.store=rt;var ct=a(52);c.a.render(r.a.createElement(T.a,{store:rt},r.a.createElement(ct.a,null,r.a.createElement(Qe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,a){e.exports={app:"App_app__32UaZ",loaderHolder:"App_loaderHolder__3pQK7",toolbar:"App_toolbar__3W_0k",main:"App_main__3K7jg"}},58:function(e,t,a){e.exports={todolist:"Todolist_todolist__1BVIE",title:"Todolist_title__ooL8J",tasks:"Todolist_tasks__huMFy",filterContainer:"Todolist_filterContainer__aQXm1"}},59:function(e,t,a){e.exports={todolistList:"TodolistsList_todolistList__3hR2M",addItemWrapper:"TodolistsList_addItemWrapper__15VJf",todolistsContainer:"TodolistsList_todolistsContainer__1Uyns",todoListWrapper:"TodolistsList_todoListWrapper__5IPG_"}},70:function(e,t,a){e.exports={task:"Task_task__1oaKZ",doneTask:"Task_doneTask__3KisC"}},71:function(e,t,a){e.exports={login:"Login_login__brV_2",formHolder:"Login_formHolder__3_N28",title:"Login_title__FmMyS"}},94:function(e,t,a){e.exports={addItemForm:"AddItemForm_addItemForm__21vCs"}},98:function(e,t,a){e.exports={span:"EditableSpan_span__Ndqkr"}}},[[116,1,2]]]);
//# sourceMappingURL=main.1a9c01d4.chunk.js.map