"use strict";(self.webpackChunk_infomat_web=self.webpackChunk_infomat_web||[]).push([[364],{66464:function(e,t,n){n.d(t,{z:function(){return o}});var a=n(2867),r=n(66204),o=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(0,r.useState)(e),n=(0,a.Z)(t,2),o=n[0],c=n[1],i=(0,r.useCallback)((function(){return c(!0)}),[]),l=(0,r.useCallback)((function(){return c(!1)}),[]),s=(0,r.useCallback)((function(){return c((function(e){return!e}))}),[]);return[o,i,l,s]}},93973:function(e,t,n){n.d(t,{Os:function(){return s},l8:function(){return u},nd:function(){return l}});var a=n(67181),r=n(63799).T.getSelectors((function(e){return e[a.Z.CATEGORY_OBJECT]})),o=r.selectIds,c=r.selectById,i=r.selectAll,l=o,s=c,u=i},7222:function(e,t,n){n.d(t,{G:function(){return o}});var a=n(85994),r=n(91434),o=(0,a.P)([r.N],(function(e){return e.isLoading}))},68266:function(e,t,n){n.d(t,{Z:function(){return N}});var a=n(2867),r=n(66204),o=n(77850),c=n(6816),i=n(64695),l=n(82574),s=n(25377),u=n(57566),m=n(26481),d=n(12552),f=n(91612),g=n(66464),_="ActionMenuItem_button__d-Af2",E="ActionMenuItem_edit__G5efv",Z="ActionMenuItem_meuItem__HZX49",v="ActionMenuItem_modal__Cb5qD",b="ActionMenuItem_title__JaeNK",C="ActionMenuItem_buttonModul__aEkQK",p=n(25593),h=n(67615),N=function(e){var t=e.onEdit,n=e.onDelete,N=e.editLink,k=e.deleteTitle,y=(0,r.useRef)(null),I=(0,g.z)(!1),P=(0,a.Z)(I,3),L=P[0],T=P[1],O=P[2],x=(0,g.z)(!1),M=(0,a.Z)(x,3),j=M[0],w=M[1],D=M[2],U=(0,h.K)((function(){O()}),100),A=(0,r.useCallback)((function(){D(),n&&n()}),[D,n]);return r.createElement(r.Fragment,null,r.createElement(p.Z,{ref:y,iconType:f.Tu.moreHoriz,className:_,onClick:function(){L||T()}}),r.createElement(o.Z,{onClick:U,popperOptions:{modifiers:[{name:"offset",options:{offset:[0,6]}}]},placement:"bottom-end",anchorEl:y.current,open:L},r.createElement(c.Z,{onClickAway:U,mouseEvent:"onPointerDown",disableReactTree:!0,touchEvent:!1},r.createElement(i.Z,{sx:{boxShadow:8,width:k?190:174,paddingBottom:.2}},(t||N)&&r.createElement(p.Z,{component:N,className:E},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"),n&&r.createElement(l.Z,{onClick:k?n:w,key:"delete"},r.createElement(s.Z,{className:Z},k||"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))))),r.createElement(u.Z,{open:j,onClose:D},r.createElement(m.Z,{className:v},r.createElement(s.Z,{className:b},"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c?"),r.createElement(d.ZP,{container:!0,direction:"row",spacing:2},r.createElement(d.ZP,{item:!0,xs:6},r.createElement(p.Z,{className:C,variant:"outlined",onClick:A},"\u0414\u0430, \u0443\u0434\u0430\u043b\u0438\u0442\u044c")),r.createElement(d.ZP,{item:!0,xs:6},r.createElement(p.Z,{className:C,variant:"outlined",onClick:D},"\u041d\u0435\u0442, \u044f \u043e\u0448\u0438\u0431\u0441\u044f"))))))}},52998:function(e,t,n){n.d(t,{Z:function(){return C}});var a=n(56666),r=n(2867),o=n(66204),c=n(64695),i=n(12552),l=n(64969),s=n(25377),u=n(42732),m=n(82574),d=n(35681),f=n.n(d),g=n(25593),_=n(1920),E=n(91612),Z={container:"PageListIteration_container__fKPhU",header:"PageListIteration_header__KE0l2",input:"PageListIteration_input__AjUsp",search:"PageListIteration_search__zOtuC",searchIcon:"PageListIteration_searchIcon__7NSOC",boxEmpty:"PageListIteration_boxEmpty__iMvcD",content:"PageListIteration_content__ZDVY-",footer:"PageListIteration_footer__UoRv6",footerTitle:"PageListIteration_footerTitle__aBtZx",footerLimit:"PageListIteration_footerLimit__mtEH6",select:"PageListIteration_select__zqiCW"},v=n(67615),b=[10,20,30,40,50],C=function(e){var t=e.children,n=e.labelAdd,d=void 0===n?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c":n,C=e.addLink,p=e.startCrrentPageNumber,h=void 0===p?0:p,N=e.numberPages,k=void 0===N?1:N,y=e.isEmptyList,I=void 0!==y&&y,P=e.labelEmptyList,L=void 0===P?"\u0423 \u0432\u0430\u0441 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 :(":P,T=e.startValueLimit,O=void 0===T?b[0]:T,x=e.isLoading,M=e.FilterComponent,j=e.startSearch,w=void 0===j?"":j,D=e.getData,U=(0,o.useState)(w),A=(0,r.Z)(U,2),z=A[0],S=A[1],R=(0,o.useState)(h),B=(0,r.Z)(R,2),F=B[0],J=B[1],K=(0,o.useState)(O),G=(0,r.Z)(K,2),V=G[0],H=G[1],Y=(0,o.useCallback)((function(){J(0),D({page:0,search:z})}),[J,D,F,z]),q=(0,o.useCallback)((function(){J(k-1),D({page:k-1,search:z})}),[J,D,F,z,k]),Q=(0,o.useCallback)((function(){J(F-1),D({page:F-1,search:z})}),[J,D,F,z]),W=(0,o.useCallback)((function(){J(F+1),D({page:F+1,search:z})}),[J,D,F,z]),X=(0,o.useCallback)((function(e){H(e),J(0),D({page:0,search:z,size:e})}),[H,D,z,J]),$=(0,v.K)((function(e){J(0),D({page:0,search:e,restFilters:!0})}),400),ee=(0,o.useCallback)((function(e){S(e),$(e)}),[S,$]),te=!I&&D;return o.createElement(c.Z,{classes:{root:f()(Z.container,(0,a.Z)({},Z.isShowFooter,te))}},o.createElement(i.ZP,{container:!0,className:Z.header,spacing:3,direction:"row"},ee&&o.createElement(i.ZP,{item:!0,xs:12,md:8,className:Z.input},o.createElement(_.Z,{value:z,onChange:function(e){return ee(e.target.value)},className:Z.search}),o.createElement(E.JO,{className:Z.searchIcon,type:E.Tu.search,color:E.EY.lightgrey,size:E.Jh.small})),o.createElement(i.ZP,{item:!0,container:!0,xs:12,md:4,justifyContent:"flex-end"},C&&o.createElement(g.Z,{startIconType:E.Tu.add,iconSize:E.Jh.small,variant:"contained",component:C},d))),M,x&&o.createElement("div",{className:Z.boxEmpty},o.createElement(l.Z,{size:38})),I&&!x&&o.createElement("div",{className:Z.boxEmpty},o.createElement(s.Z,null,L)),!I&&!x&&o.createElement("div",{className:Z.content},t,te&&o.createElement("div",{className:Z.footer},o.createElement(s.Z,{className:Z.footerTitle},"\u0421\u0442\u0440\u043e\u043a \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435"),o.createElement(u.Z,{value:V,onChange:function(e){return X(Number(e.target.value))},className:Z.select},b.map((function(e,t){return o.createElement(m.Z,{key:t,value:e,classes:{root:Z.itemMenu}},o.createElement(s.Z,{className:Z.itemMenuLabel},e))}))),o.createElement(s.Z,{className:Z.footerLimit},"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 ".concat(F+1," \u0438\u0437 ").concat(k)),o.createElement(g.Z,{variant:"outlined",className:Z.buttonIteration,disabled:F<=0,iconType:E.Tu.iterationDLeft,onClick:Y}),o.createElement(g.Z,{variant:"outlined",className:Z.buttonIteration,disabled:F<=0,iconType:E.Tu.iterationLeft,onClick:Q}),o.createElement(g.Z,{variant:"outlined",className:Z.buttonIteration,disabled:F>=k-1,iconType:E.Tu.iterationRight,onClick:W}),o.createElement(g.Z,{variant:"outlined",className:Z.buttonIteration,disabled:F>=k-1,iconType:E.Tu.iterationDRight,onClick:q}))))}},29364:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var a=n(66204),r=n(35584),o=n(93973),c=n(48968),i=n(7222),l=n(5908),s=n(25164),u=n(85994),m=n(91434),d=(0,u.P)([m.N],(function(e){return e.totalPages})),f=(0,u.P)([m.N],(function(e){return e.error})),g=n(93921),_=n(40180),E=n.n(_),Z=n(52998),v=n(12629),b=n(32708),C=n(25377),p=n(68266),h="CategoryObjectItem_container__8mQbi",N="CategoryObjectItem_box__GBUCJ",k="CategoryObjectItem_icon__Pa1FR",y="CategoryObjectItem_label__goTJ4",I=function(e){var t=e.id,n=e.onDelete,r=e.categoryObjectVM,o=(0,v.Z)(b.Z.categoryObject(t)),c=(0,a.useCallback)((function(){n({id:t})}),[n,t]);return a.createElement("div",{className:h},a.createElement("div",{className:N,style:{backgroundColor:r.backgroundColor}},a.createElement("img",{src:r.icon.url,className:k})),a.createElement(C.Z,{className:y},r.title),a.createElement(p.Z,{editLink:o,onDelete:c}))},P=n(64919),L=function(e){var t=e.id,n=(0,r.U)(o.Os,t),c=(0,P.Z)(g.O.deleteCategory);return E().isUndefined(n)?null:a.createElement(I,{id:t,categoryObjectVM:n,onDelete:c})},T="CategoryObjectsList_container__5oTco",O=function(e){var t=e.getData,n=e.categoryObjectIds,r=(e.error,e.currentPage),o=e.totalPage,c=e.size,i=e.isLoading,l=e.search,s=(0,v.Z)(b.Z.categoryObject());return a.createElement(Z.Z,{numberPages:o,startSearch:l,isLoading:i,isEmptyList:E().isEmpty(n),getData:t,labelAdd:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442",addLink:s,startCrrentPageNumber:r,startValueLimit:c},a.createElement("div",{className:T},E().map(n,(function(e){return a.createElement(L,{key:e,id:e})}))))},x=function(){var e=(0,r.U)(f),t=(0,r.U)(d),n=(0,r.U)(s.v),u=(0,r.U)(l.R),m=(0,r.U)(i.G),_=(0,r.U)(c.k),E=(0,r.U)(o.nd),Z=(0,P.Z)(g.O.getList);return a.createElement(O,{categoryObjectIds:E,currentPage:_,isLoading:m,search:u,size:n,totalPage:t,error:e,getData:Z})},M=function(){return a.createElement(x,null)}},12629:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(66204),r=n(7896),o=n(45485),c=function(e){return(0,a.forwardRef)((function(t,n){return a.createElement(o.rU,(0,r.Z)({},t,e,{role:void 0,ref:n,relative:void 0}))}))},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0;return(0,a.useMemo)((function(){return c({to:e,replace:t,onClick:n,state:r})}),[e,t,n,r])}},26481:function(e,t,n){n.d(t,{Z:function(){return _}});var a=n(46528),r=n(82417),o=n(66204),c=n(53583),i=n(88600),l=n(95882),s=n(8449),u=n(85293),m=n(43188);const d=["className","component"];var f=n(51388);const g=function(e={}){const{defaultTheme:t,defaultClassName:n="MuiBox-root",generateClassName:f,styleFunctionSx:g=l.Z}=e,_=(0,i.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(g);return o.forwardRef((function(e,o){const i=(0,u.Z)(t),l=(0,s.Z)(e),{className:g,component:E="div"}=l,Z=(0,r.Z)(l,d);return(0,m.jsx)(_,(0,a.Z)({as:E,ref:o,className:(0,c.Z)(g,f?f(n):n),theme:i},Z))}))}({defaultTheme:(0,n(82569).Z)(),defaultClassName:"MuiBox-root",generateClassName:f.Z.generate});var _=g}}]);
//# sourceMappingURL=364.a48e0d65.chunk.js.map