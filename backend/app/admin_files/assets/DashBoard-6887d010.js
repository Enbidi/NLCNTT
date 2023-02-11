import{o as c,c as u,a as s,t as m,_ as U,r as A,b as k,d as p,u as g,C as v,p as b,e as w,f as x,L as C,g as S,h as P,P as $,i as y,j as h,w as d,S as I,k as l,l as n,m as B}from"./index-28c83648.js";const D={class:"card bg-primary text-white mb-4"},z={class:"card-body"},L={class:"text-white font-weight-bold"},M={class:"card-footer text-end"},N={class:"small text-whitestretched-link text-end"},i={__name:"StatisticCard",props:["title","content"],setup(a){return(t,e)=>(c(),u("div",D,[s("div",z,[s("h5",L,m(a.title),1)]),s("div",M,[s("span",N,m(a.content),1)])]))}},R={},E={class:"card mb-4"},V=s("div",{class:"card-header"},[s("i",{class:"fas fa-chart-area me-1"}),k(" Area Chart Example ")],-1),j={class:"card-body"};function O(a,t){return c(),u("div",E,[V,s("div",j,[A(a.$slots,"default")])])}const T=U(R,[["render",O]]);function f(e,t){var e=new URL(e);for(var[r,o]of Object.entries(t))e.searchParams.append(r,o);return e}const _=p("statisticsStore",{state:()=>({bills:[],users:[],totalUser:null,totalProduct:null,revenueInCurrentMonth:null,totalBranch:null}),getters:{alerts:()=>g()},actions:{async fetchBills(a=12){var t=f("http://localhost:3000/admin/bill/statistic",{no_month:a}),e=await this.alerts.callAPI("warning",t);this.bills=e.items},async fetchUsers(a=12){var t=f("http://localhost:3000/admin/user/statistic",{no_month:a}),e=await this.alerts.callAPI("warning",t);this.users=e.items},async fetchTotalUser(){if(this.totalUser==null){var a="http://localhost:3000/admin/user/size",t=await this.alerts.callAPI("warning",a);this.totalUser=t}},async fetchRevenueInCurrentMonth(){if(this.revenueInCurrentMonth==null){var a="http://localhost:3000/admin/bill/revenue",t=await this.alerts.callAPI("warning",a);this.revenueInCurrentMonth=t}},async fetchTotalProduct(){if(this.totalProduct==null){var a="http://localhost:3000/admin/product/size",t=await this.alerts.callAPI("warning",a);this.totalProduct=t}},async fetchTotalBranch(){if(this.totalBranch==null){var a="http://localhost:3000/admin/branch/size",t=await this.alerts.callAPI("warning",a);this.totalBranch=t}},async fetchNumericalDatas(){this.fetchTotalUser(),this.fetchRevenueInCurrentMonth(),this.fetchTotalProduct(),this.fetchTotalBranch()}}}),W={__name:"RevenueChart",setup(a){v.register(b,w,x,C,S,P,$);const t=_(),e=y(()=>({labels:t.bills.map(r=>`Tháng ${r._id}`),datasets:[{label:"Doanh thu",backgroundColor:"#f87979",data:t.bills.map(r=>r.revenueInMonth)}]}));return t.fetchBills(),(r,o)=>(c(),h(T,null,{default:d(()=>[(c(),h(I,null,{default:d(()=>[l(n(B),{id:"revenueLineChart",data:n(e)},null,8,["data"])]),_:1}))]),_:1}))}},q={__name:"UserRegistrationChart",setup(a){v.register(b,w,x,C,S,P,$);const t=_(),e=y(()=>({labels:t.users.map(r=>`Tháng ${r._id}`),datasets:[{label:"Số lượt đăng kí",backgroundColor:"#f87979",data:t.users.map(r=>r.count)}]}));return t.$subscribe((r,o)=>{console.log("Logged",o)}),t.fetchUsers(),(r,o)=>(c(),h(T,null,{default:d(()=>[(c(),h(I,null,{default:d(()=>[l(n(B),{id:"userCreationChart",data:n(e)},null,8,["data"])]),_:1}))]),_:1}))}},F=p("sizes",{items:()=>({user:0,bill:0}),getters:{alerts:()=>g()},actions:{async fetchUserSize(){var a="http://localhost:3000/admin/user/size",t=await this.alerts.callAPI("warning",a);this.user=t}}}),G=s("h1",{class:"mt-4"},"Dashboard",-1),H=s("ol",{class:"breadcrumb mb-4"},[s("li",{class:"breadcrumb-item active"},"Dashboard")],-1),J={class:"row"},K={class:"col-xl-3 col-md-6"},Q={class:"col-xl-3 col-md-6"},X={class:"col-xl-3 col-md-6"},Y={class:"col-xl-3 col-md-6"},Z={class:"row"},tt={class:"col-xl-6"},at={class:"col-xl-6"},et={__name:"DashBoard",setup(a){F();const t=_();return t.fetchNumericalDatas(),(e,r)=>(c(),u("div",null,[G,H,s("div",J,[s("div",K,[l(i,{class:"bg-primary",content:"Tổng số người dùng",title:n(t).totalUser},null,8,["title"])]),s("div",Q,[l(i,{class:"bg-warning",content:"Doanh thu trong tháng này",title:n(t).revenueInCurrentMonth},null,8,["title"])]),s("div",X,[l(i,{class:"bg-success",content:"Tổng số sản phẩm",title:n(t).totalProduct},null,8,["title"])]),s("div",Y,[l(i,{class:"bg-danger",content:"Tổng số nhãn hiệu",title:n(t).totalBranch},null,8,["title"])])]),s("div",Z,[s("div",tt,[l(W)]),s("div",at,[l(q)])])]))}};export{et as default};
