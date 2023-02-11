import{j as T,w as n,l as h,o,k as d,b as i,a as t,c as l,F as r,n as m,q as _,s as M,x as p,t as u}from"./index-28c83648.js";import{u as B,C as N,_ as b,M as f}from"./useTemplateRef-7b4f9a07.js";import{u as O}from"./branches-cd70cd3e.js";const V=["onSubmit"],$={class:"modal-body"},I=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addBranchInput",class:"form-control",name:"name"}),t("label",{class:"form-label",for:"addBranchInput"},"Tên nhãn hiệu")],-1),X={key:0,class:"alert alert-danger"},w={key:1,class:"alert alert-success"},D=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),F=["onSubmit"],K={class:"modal-body"},P={class:"form-outline mb-4"},j=["value"],q=t("label",{class:"form-label",for:"updateOriginIdInput"},"Nhãn hiệu Id",-1),A=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"updateOriginNameInput",class:"form-control",name:"name"}),t("label",{class:"form-label",for:"updateOriginNamInput"},"Tên nhãn hiệu")],-1),E={key:0,class:"alert alert-danger"},L={key:1,class:"alert alert-success"},R=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),z={class:"modal-body"},G=t("p",{class:"text-warning text-center"},"Bạn có chắc muốn xóa nhãn hiệu này",-1),H={key:0,class:"alert alert-danger"},J={key:1,class:"alert alert-success"},Q={class:"modal-footer"},U=["onClick"],at={__name:"Branch",setup(W){const g=O();g.fetchBranches();const y=B("updationModal"),v=B("deletionModal");return(C,Y)=>{const S=p("dir"),k=p("VTh"),x=p("VTr");return o(),T(N,{"api-url":`${C.hostname}/branch`,"deletion-modal":h(v),"updation-modal":h(y),"fetched-data":h(g)},{modalTriggerButtons:n(()=>[d(b,{target:"addOriginModal"},{default:n(()=>[i(" Thêm nhãn hiệu ")]),_:1})]),additionModal:n(({addHandler:s,errors:a})=>[d(f,{id:"addOriginModal"},{modalTitle:n(()=>[i(" Thêm nhãn hiệu ")]),default:n(()=>[t("form",{onSubmit:M(e=>s(e),["prevent"]),method:"POST"},[t("div",$,[I,a&&a.length!=0?(o(),l("div",X,[(o(!0),l(r,null,m(a,e=>(o(),l("p",null,u(e.msg),1))),256))])):a&&a.length==0?(o(),l("div",w," Thêm thành công ")):_("",!0)]),D],40,V)]),_:2},1024)]),updationModal:n(({errors:s,updateHandler:a,selectedItem:e})=>[d(f,{id:"updateBranchModal",ref_key:"updationModal",ref:y},{modalTitle:n(()=>[i(" Sửa nhãn hiệu ")]),default:n(()=>[t("form",{onSubmit:M(c=>a(c),["prevent"]),method:"POST"},[t("div",K,[t("div",P,[t("input",{type:"text",id:"updateOriginIdInput",class:"form-control",name:"name",disabled:"",value:e==null?void 0:e._id},null,8,j),q]),A,s&&s.length!=0?(o(),l("div",E,[(o(!0),l(r,null,m(s,c=>(o(),l("p",null,u(c.msg),1))),256))])):s&&s.length==0?(o(),l("div",L," Sửa thành công ")):_("",!0)]),R],40,F)]),_:2},1536)]),deletionModal:n(({deleteHandler:s,errors:a})=>[d(f,{id:"deleteBranchModal",ref_key:"deletionModal",ref:v},{modalTitle:n(()=>[i(" Xóa nhãn hiệu ")]),default:n(()=>[t("div",z,[d(S,null,{default:n(()=>[G]),_:1}),a&&a.length!=0?(o(),l("div",H,[(o(!0),l(r,null,m(a,e=>(o(),l("p",null,u(e.msg),1))),256))])):a&&a.length==0?(o(),l("div",J," Xóa sản phẩm thành công ")):_("",!0)]),t("div",Q,[t("button",{class:"btn btn-primary btn-block mb-4",onClick:e=>s()},"Xóa",8,U)])]),_:2},1536)]),tableColumnNames:n(()=>[t("tr",null,[d(k,{sortKey:"_id"},{default:n(()=>[i("#")]),_:1}),d(k,{class:"text-center",sortKey:"country"},{default:n(()=>[i("Nhãn hiệu")]),_:1})])]),tableColumnDatas:n(({rows:s,selectItem:a})=>[(o(!0),l(r,null,m(s,e=>(o(),T(x,{row:e},{default:n(()=>[t("td",null,u(e._id),1),t("td",null,u(e.name),1),t("td",null,[d(b,{target:"updateBranchModal",class:"me-2 btn btn-warning",onClick:c=>a(e)},{default:n(()=>[i("Sửa")]),_:2},1032,["onClick"]),d(b,{target:"deleteBranchModal",class:"btn btn-danger",onClick:c=>a(e)},{default:n(()=>[i("Xóa")]),_:2},1032,["onClick"])])]),_:2},1032,["row"]))),256))]),_:1},8,["api-url","deletion-modal","updation-modal","fetched-data"])}}};export{at as default};
