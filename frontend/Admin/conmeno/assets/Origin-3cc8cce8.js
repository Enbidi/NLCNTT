import{j as M,w as e,l as m,o,k as s,b as d,a as t,c as l,F as r,n as _,q as h,s as O,x as p,t as u}from"./index-b7eedab6.js";import{u as T,C as V,_ as g,M as b}from"./useTemplateRef-8a3fa7e5.js";import{u as B}from"./origins-979d3d66.js";const $=["onSubmit"],N={class:"modal-body"},X=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addOriginInput",class:"form-control",name:"country"}),t("label",{class:"form-label",for:"addOriginInput"},"Quốc gia")],-1),w={key:0,class:"alert alert-danger"},Q={key:1,class:"alert alert-success"},D={class:"modal-footer"},F=["onClick"],I=["onSubmit"],K={class:"modal-body"},P={class:"form-outline mb-4"},j=["value"],q=t("label",{class:"form-label",for:"addOriginInput"},"Xuất sứ Id",-1),A=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addOriginInput",class:"form-control",name:"country"}),t("label",{class:"form-label",for:"addOriginInput"},"Quốc gia")],-1),E={key:0,class:"alert alert-danger"},L={key:1,class:"alert alert-success"},R=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),z={class:"modal-body"},G=t("p",{class:"text-warning text-center"},"Bạn có chắc muốn xóa xuât sứ này",-1),J={key:0,class:"alert alert-danger"},U={key:1,class:"alert alert-success"},W={class:"modal-footer"},Y=["onClick"],at={__name:"Origin",setup(Z){const f=B();f.fetchOrigins();const y=T("updationModal"),v=T("deletionModal");return(x,H)=>{const C=p("dir"),k=p("VTh"),S=p("VTr");return o(),M(V,{"api-url":`${x.hostname}/origin`,"deletion-modal":m(v),"updation-modal":m(y),"fetched-data":m(f)},{modalTriggerButtons:e(()=>[s(g,{target:"addOriginModal"},{default:e(()=>[d(" Thêm xuất sứ ")]),_:1})]),additionModal:e(({addHandler:i,errors:n})=>[s(b,{id:"addOriginModal"},{modalTitle:e(()=>[d(" Thêm xuất sứ ")]),default:e(()=>[t("form",{onSubmit:O(a=>i(a),["prevent"]),method:"POST"},[t("div",N,[X,n&&n.length!=0?(o(),l("div",w,[(o(!0),l(r,null,_(n,a=>(o(),l("p",null,u(a.msg),1))),256))])):n&&n.length==0?(o(),l("div",Q," Thêm thành công ")):h("",!0)]),t("div",D,[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4",onClick:a=>i()},"Thêm",8,F)])],40,$)]),_:2},1024)]),updationModal:e(({updateHandler:i,errors:n,selectedItem:a})=>[s(b,{id:"updateOriginModal",ref_key:"updationModal",ref:y},{modalTitle:e(()=>[d(" Sửa xuất sứ ")]),default:e(()=>[t("form",{onSubmit:O(c=>i(c),["prevent"]),method:"POST"},[t("div",K,[t("div",P,[t("input",{type:"text",id:"addOriginInput",class:"form-control",name:"name",disabled:"",value:a==null?void 0:a._id},null,8,j),q]),A,n&&n.length!=0?(o(),l("div",E,[(o(!0),l(r,null,_(n,c=>(o(),l("p",null,u(c.msg),1))),256))])):n&&n.length==0?(o(),l("div",L," Sửa thành công ")):h("",!0)]),R],40,I)]),_:2},1536)]),deletionModal:e(({deleteHandler:i,errors:n})=>[s(b,{id:"deleteOriginModal",ref_key:"deletionModal",ref:v},{modalTitle:e(()=>[d(" Xóa xuất sứ ")]),default:e(()=>[t("div",z,[s(C,null,{default:e(()=>[G]),_:1}),n&&n.length!=0?(o(),l("div",J,[(o(!0),l(r,null,_(n,a=>(o(),l("p",null,u(a.msg),1))),256))])):n&&n.length==0?(o(),l("div",U," Xóa xuất sứ thành công ")):h("",!0)]),t("div",W,[t("button",{class:"btn btn-primary btn-block mb-4",onClick:a=>i()},"Xóa",8,Y)])]),_:2},1536)]),tableColumnNames:e(()=>[s(k,{sortKey:"_id"},{default:e(()=>[d("#")]),_:1}),s(k,{sortKey:"country"},{default:e(()=>[d("Quốc gia")]),_:1})]),tableColumnDatas:e(({rows:i,selectItem:n})=>[(o(!0),l(r,null,_(i,a=>(o(),M(S,{row:a},{default:e(()=>[t("td",null,u(a._id),1),t("td",null,u(a.country),1),t("td",null,[s(g,{target:"updateOriginModal",class:"me-2 btn btn-warning",onClick:c=>n(a)},{default:e(()=>[d(" Sửa ")]),_:2},1032,["onClick"]),s(g,{target:"deleteOriginModal",class:"btn btn-danger",onClick:c=>n(a)},{default:e(()=>[d(" Xóa ")]),_:2},1032,["onClick"])])]),_:2},1032,["row"]))),256))]),_:1},8,["api-url","deletion-modal","updation-modal","fetched-data"])}}};export{at as default};
