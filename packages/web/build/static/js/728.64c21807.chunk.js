"use strict";(self.webpackChunk_infomat_web=self.webpackChunk_infomat_web||[]).push([[728],{66464:function(e,t,n){n.d(t,{z:function(){return c}});var a=n(2867),r=n(66204),c=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(0,r.useState)(e),n=(0,a.Z)(t,2),c=n[0],i=n[1],o=(0,r.useCallback)((function(){return i(!0)}),[]),l=(0,r.useCallback)((function(){return i(!1)}),[]),s=(0,r.useCallback)((function(){return i((function(e){return!e}))}),[]);return[c,o,l,s]}},76113:function(e,t,n){n.d(t,{Mx:function(){return s},Qt:function(){return u},en:function(){return l}});var a=n(67181),r=n(2107).F.getSelectors((function(e){return e[a.Z.SUBCATEGORY_OBJECT]})),c=r.selectIds,i=r.selectById,o=r.selectAll,l=c,s=i,u=o},74594:function(e,t,n){n.d(t,{S:function(){return c}});var a=n(85994),r=n(59379),c=(0,a.P)([r.B],(function(e){return e.isLoading}))},68266:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(2867),r=n(66204),c=n(77850),i=n(6816),o=n(64695),l=n(82574),s=n(25377),u=n(57566),m=n(26481),d=n(12552),f=n(91612),_=n(66464),b="ActionMenuItem_button__d-Af2",g="ActionMenuItem_edit__G5efv",E="ActionMenuItem_meuItem__HZX49",Z="ActionMenuItem_modal__Cb5qD",v="ActionMenuItem_title__JaeNK",p="ActionMenuItem_buttonModul__aEkQK",N=n(25593),h=n(67615),y=function(e){var t=e.onEdit,n=e.onDelete,y=e.editLink,C=e.deleteTitle,L=(0,r.useRef)(null),k=(0,_.z)(!1),I=(0,a.Z)(k,3),P=I[0],S=I[1],x=I[2],T=(0,_.z)(!1),M=(0,a.Z)(T,3),F=M[0],O=M[1],j=M[2],w=(0,h.K)((function(){x()}),100),U=(0,r.useCallback)((function(){j(),n&&n()}),[j,n]);return r.createElement(r.Fragment,null,r.createElement(N.Z,{ref:L,iconType:f.Tu.moreHoriz,className:b,onClick:function(){P||S()}}),r.createElement(c.Z,{onClick:w,popperOptions:{modifiers:[{name:"offset",options:{offset:[0,6]}}]},placement:"bottom-end",anchorEl:L.current,open:P},r.createElement(i.Z,{onClickAway:w,mouseEvent:"onPointerDown",disableReactTree:!0,touchEvent:!1},r.createElement(o.Z,{sx:{boxShadow:8,width:C?190:174,paddingBottom:.2}},(t||y)&&r.createElement(N.Z,{component:y,className:g},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"),n&&r.createElement(l.Z,{onClick:C?n:O,key:"delete"},r.createElement(s.Z,{className:E},C||"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))))),r.createElement(u.Z,{open:F,onClose:j},r.createElement(m.Z,{className:Z},r.createElement(s.Z,{className:v},"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c?"),r.createElement(d.ZP,{container:!0,direction:"row",spacing:2},r.createElement(d.ZP,{item:!0,xs:6},r.createElement(N.Z,{className:p,variant:"outlined",onClick:U},"\u0414\u0430, \u0443\u0434\u0430\u043b\u0438\u0442\u044c")),r.createElement(d.ZP,{item:!0,xs:6},r.createElement(N.Z,{className:p,variant:"outlined",onClick:j},"\u041d\u0435\u0442, \u044f \u043e\u0448\u0438\u0431\u0441\u044f"))))))}},11347:function(e,t,n){n.d(t,{Z:function(){return E}});var a=n(56666),r=n(66204),c=n(12552),i=n(25377),o=n(64529),l=n(64969),s=n(82574),u=n(40180),m=n.n(u),d=n(35681),f=n.n(d),_=n(91612),b=n(42461),g={label:"SelectField_label__8KjMA",select:"SelectField_select__Qdmg8",itemLabel:"SelectField_itemLabel__7R1+4",item:"SelectField_item__UEWt-",isSelect:"SelectField_isSelect__2qTU5",placeholder:"SelectField_placeholder__S5oXh",root:"SelectField_root__uwkIr",boxLoading:"SelectField_boxLoading__I29D8"},E=function(e){var t=e.label,n=e.placeholder,u=e.items,d=e.value,E=e.onChange,Z=e.isLoading,v=m().filter(u,(function(e){return e.id!==d})),p=m().find(u,(function(e){return e.id===d}));return r.createElement(c.ZP,{container:!0,direction:"column",className:g.root},t&&r.createElement(i.Z,{className:g.label},t),r.createElement(o.Z,null,r.createElement(b.Z,{RootComponent:r.createElement("div",{className:g.select},!m().isUndefined(d)&&p?r.createElement("div",{className:g.item},p.icon&&r.createElement("img",{src:p.icon.url,className:g.icon}),r.createElement(i.Z,{className:g.itemLabel},p.title)):r.createElement(i.Z,{className:g.placeholder},n),r.createElement(_.JO,{className:g.iconValue,type:_.Tu.keyboardArrowDown}))},Z?r.createElement("div",{className:g.boxLoading},r.createElement(l.Z,{size:22})):m().map(v,(function(e,n){return r.createElement(s.Z,{key:n,value:t,onClick:function(){return E(e.id)},classes:{root:f()(g.item,(0,a.Z)({},g.isSelect,e.id===d))}},e.icon&&r.createElement("img",{src:e.icon.url,className:g.icon}),r.createElement(i.Z,{className:g.itemLabel},e.title))})))))}},52998:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(56666),r=n(2867),c=n(66204),i=n(64695),o=n(12552),l=n(64969),s=n(25377),u=n(42732),m=n(82574),d=n(35681),f=n.n(d),_=n(25593),b=n(1920),g=n(91612),E={container:"PageListIteration_container__fKPhU",header:"PageListIteration_header__KE0l2",input:"PageListIteration_input__AjUsp",search:"PageListIteration_search__zOtuC",searchIcon:"PageListIteration_searchIcon__7NSOC",boxEmpty:"PageListIteration_boxEmpty__iMvcD",content:"PageListIteration_content__ZDVY-",footer:"PageListIteration_footer__UoRv6",footerTitle:"PageListIteration_footerTitle__aBtZx",footerLimit:"PageListIteration_footerLimit__mtEH6",select:"PageListIteration_select__zqiCW"},Z=n(67615),v=[10,20,30,40,50],p=function(e){var t=e.children,n=e.labelAdd,d=void 0===n?"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c":n,p=e.addLink,N=e.startCrrentPageNumber,h=void 0===N?0:N,y=e.numberPages,C=void 0===y?1:y,L=e.isEmptyList,k=void 0!==L&&L,I=e.labelEmptyList,P=void 0===I?"\u0423 \u0432\u0430\u0441 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 :(":I,S=e.startValueLimit,x=void 0===S?v[0]:S,T=e.isLoading,M=e.FilterComponent,F=e.startSearch,O=void 0===F?"":F,j=e.getData,w=(0,c.useState)(O),U=(0,r.Z)(w,2),A=U[0],D=U[1],z=(0,c.useState)(h),B=(0,r.Z)(z,2),K=B[0],R=B[1],V=(0,c.useState)(x),J=(0,r.Z)(V,2),Q=J[0],G=J[1],H=(0,c.useCallback)((function(){R(0),j({page:0,search:A})}),[R,j,K,A]),Y=(0,c.useCallback)((function(){R(C-1),j({page:C-1,search:A})}),[R,j,K,A,C]),q=(0,c.useCallback)((function(){R(K-1),j({page:K-1,search:A})}),[R,j,K,A]),W=(0,c.useCallback)((function(){R(K+1),j({page:K+1,search:A})}),[R,j,K,A]),X=(0,c.useCallback)((function(e){G(e),R(0),j({page:0,search:A,size:e})}),[G,j,A,R]),$=(0,Z.K)((function(e){R(0),j({page:0,search:e,restFilters:!0})}),400),ee=(0,c.useCallback)((function(e){D(e),$(e)}),[D,$]),te=!k&&j;return c.createElement(i.Z,{classes:{root:f()(E.container,(0,a.Z)({},E.isShowFooter,te))}},c.createElement(o.ZP,{container:!0,className:E.header,spacing:3,direction:"row"},ee&&c.createElement(o.ZP,{item:!0,xs:12,md:8,className:E.input},c.createElement(b.Z,{value:A,onChange:function(e){return ee(e.target.value)},className:E.search}),c.createElement(g.JO,{className:E.searchIcon,type:g.Tu.search,color:g.EY.lightgrey,size:g.Jh.small})),c.createElement(o.ZP,{item:!0,container:!0,xs:12,md:4,justifyContent:"flex-end"},p&&c.createElement(_.Z,{startIconType:g.Tu.add,iconSize:g.Jh.small,variant:"contained",component:p},d))),M,T&&c.createElement("div",{className:E.boxEmpty},c.createElement(l.Z,{size:38})),k&&!T&&c.createElement("div",{className:E.boxEmpty},c.createElement(s.Z,null,P)),!k&&!T&&c.createElement("div",{className:E.content},t,te&&c.createElement("div",{className:E.footer},c.createElement(s.Z,{className:E.footerTitle},"\u0421\u0442\u0440\u043e\u043a \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435"),c.createElement(u.Z,{value:Q,onChange:function(e){return X(Number(e.target.value))},className:E.select},v.map((function(e,t){return c.createElement(m.Z,{key:t,value:e,classes:{root:E.itemMenu}},c.createElement(s.Z,{className:E.itemMenuLabel},e))}))),c.createElement(s.Z,{className:E.footerLimit},"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 ".concat(K+1," \u0438\u0437 ").concat(C)),c.createElement(_.Z,{variant:"outlined",className:E.buttonIteration,disabled:K<=0,iconType:g.Tu.iterationDLeft,onClick:H}),c.createElement(_.Z,{variant:"outlined",className:E.buttonIteration,disabled:K<=0,iconType:g.Tu.iterationLeft,onClick:q}),c.createElement(_.Z,{variant:"outlined",className:E.buttonIteration,disabled:K>=C-1,iconType:g.Tu.iterationRight,onClick:W}),c.createElement(_.Z,{variant:"outlined",className:E.buttonIteration,disabled:K>=C-1,iconType:g.Tu.iterationDRight,onClick:Y}))))}},41728:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var a=n(66204),r=n(35584),c=n(64919),i=n(2867),o=n(25377),l=n(40180),s=n.n(l),u=n(52998),m=n(11347),d=n(12629),f=n(32708),_=n(68266),b="SubcategoryObjectItem_container__hx34e",g="SubcategoryObjectItem_box__7KA6Y",E="SubcategoryObjectItem_icon__K-bbH",Z="SubcategoryObjectItem_label__T7kKc",v=function(e){var t=e.id,n=e.onDelete,r=e.subcategoryObjectVM,c=(0,d.Z)(f.Z.subcategoryObject(t)),i=(0,a.useCallback)((function(){n({id:t})}),[n,t]);return a.createElement("div",{className:b},a.createElement("div",{className:g,style:{backgroundColor:r.category.backgroundColor}},a.createElement("img",{src:r.icon.url,className:E})),a.createElement(o.Z,{className:Z},r.title),a.createElement(_.Z,{editLink:c,onDelete:i}))},p=n(76113),N=n(28922),h=function(e){var t=e.id,n=(0,r.U)(p.Mx,t),i=(0,c.Z)(N.M.deleteCategory);return s().isUndefined(n)?null:a.createElement(v,{id:t,subcategoryObjectVM:n,onDelete:i})},y="SubcategoryObjectsList_container__wQdVK",C="SubcategoryObjectsList_filter__ii8Js",L="SubcategoryObjectsList_item__R0cgu",k="SubcategoryObjectsList_itemLabel__12PLy",I=[{title:"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432",id:0},{title:"\u0412\u0441\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u044b",id:1}],P=function(e){var t=e.getData,n=e.setIndexFilter,r=e.subcategoryObjectIds,c=e.subcategoryGroupedVMs,l=e.indexFilter,_=e.currentPage,b=e.totalPage,g=e.size,E=e.isLoading,Z=e.search,v=(0,d.Z)(f.Z.subcategoryObject()),p=(0,a.useState)(l||0),N=(0,i.Z)(p,2),P=N[0],S=N[1],x=(0,a.useCallback)((function(e){n(e),S(e)}),[n,S]),T=0===P;return a.createElement(u.Z,{numberPages:b,startSearch:Z,isLoading:E,isEmptyList:s().isEmpty(r),getData:t,labelAdd:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442",addLink:v,startCrrentPageNumber:_,startValueLimit:g,FilterComponent:a.createElement("div",{className:C},a.createElement(m.Z,{items:I,value:P,onChange:function(e){return x(Number(e))}}))},a.createElement("div",{className:y},T?s().map(c,(function(e,t){var n=e.title,r=e.ids;return a.createElement("div",{key:t,className:L},a.createElement(o.Z,{className:k},n),s().map(r,(function(e){return a.createElement(h,{key:e,id:e})})))})):s().map(r,(function(e){return a.createElement(h,{key:e,id:e})}))))},S=n(65271),x=n(74594),T=n(85994),M=n(59379),F=(0,T.P)([M.B],(function(e){return e.totalPages})),O=n(39921),j=n(13169),w=(0,T.P)([M.B],(function(e){return e.filter})),U=n(76337),A=(0,T.P)([p.Qt],(function(e){var t=s().groupBy(e,"category.id");return s().map(t,(function(e){return{title:e[0].category.title,ids:s().map(e,"id")}}))})),D=function(){var e=(0,r.U)(F),t=(0,r.U)(j.t),n=(0,r.U)(O.f),i=(0,r.U)(x.S),o=(0,r.U)(S.L),l=(0,r.U)(p.en),s=(0,r.U)(A),u=(0,r.U)(w),m=(0,c.Z)(N.M.getList),d=(0,c.Z)(U.E.setFilter);return a.createElement(P,{subcategoryGroupedVMs:s,subcategoryObjectIds:l,currentPage:o,isLoading:i,search:n,size:t,totalPage:e,getData:m,indexFilter:u,setIndexFilter:d})},z=function(){return a.createElement(D,null)}},12629:function(e,t,n){n.d(t,{Z:function(){return o}});var a=n(66204),r=n(7896),c=n(45485),i=function(e){return(0,a.forwardRef)((function(t,n){return a.createElement(c.rU,(0,r.Z)({},t,e,{role:void 0,ref:n,relative:void 0}))}))},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0;return(0,a.useMemo)((function(){return i({to:e,replace:t,onClick:n,state:r})}),[e,t,n,r])}},26481:function(e,t,n){n.d(t,{Z:function(){return b}});var a=n(46528),r=n(82417),c=n(66204),i=n(53583),o=n(88600),l=n(95882),s=n(8449),u=n(85293),m=n(43188);const d=["className","component"];var f=n(51388);const _=function(e={}){const{defaultTheme:t,defaultClassName:n="MuiBox-root",generateClassName:f,styleFunctionSx:_=l.Z}=e,b=(0,o.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(_);return c.forwardRef((function(e,c){const o=(0,u.Z)(t),l=(0,s.Z)(e),{className:_,component:g="div"}=l,E=(0,r.Z)(l,d);return(0,m.jsx)(b,(0,a.Z)({as:g,ref:c,className:(0,i.Z)(_,f?f(n):n),theme:o},E))}))}({defaultTheme:(0,n(82569).Z)(),defaultClassName:"MuiBox-root",generateClassName:f.Z.generate});var b=_}}]);
//# sourceMappingURL=728.64c21807.chunk.js.map