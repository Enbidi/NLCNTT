import{d as V,u as D,H as $,j as C,w as s,l as u,o,k as l,b as n,a as t,t as i,c as a,n as _,F as h,s as M,q as B,x as y}from"./index-693ca851.js";import{u as P,C as E,_ as v,M as k}from"./useTemplateRef-0c0990fc.js";import{u as G}from"./products-e39a3cfa.js";const K=V("sales",{state:()=>({items:[]}),getters:{alertsStore:()=>D()},actions:{async fetchSales(){if(this.items&&this.items.length==0){var S="http://localhost:3000/admin/sale",p=await this.alertsStore.callAPI("danger",S);this.items=p.items??[]}}}}),A=["onSubmit"],R={class:"modal-body"},X=t("div",{class:"form-outline mb-4"},[t("input",{type:"date",id:"addSaleStartInput",class:"form-control",name:"start"}),t("label",{class:"form-label",for:"addSaleStartInput"},"Ngày bắt đầu")],-1),H=t("div",{class:"form-outline mb-4"},[t("input",{type:"date",id:"addSaleEndInput",class:"form-control",name:"end"}),t("label",{class:"form-label",for:"addSaleEndInput"},"Ngày kết thúc")],-1),q={class:"form-check mb-4"},w=t("label",{class:"form-check-label",for:"flexRadioDefault1"},"Giảm theo phần trăm",-1),F={class:"form-check mb-4"},L=t("label",{class:"form-check-label",for:"flexRadioDefault2"},"Giảm trực tiếp",-1),j={class:"form-outline mb-4"},z=t("input",{type:"text",id:"addSalePercentInput",class:"form-control",name:"saleVal"},null,-1),J={class:"form-label",for:"addSalePercentInput"},Q={class:"list-group list-group-light"},U={key:0},W={class:"list-group-item"},Y={class:"form-check d-flex align-items-center"},Z=["value"],tt={class:"form-check-label",for:"flexCheckDefault"},et=["src"],st=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),ot=["onSubmit"],lt={class:"modal-body"},at={class:"form-outline mb-4"},nt=["value"],it=t("label",{class:"form-label",for:"updateSaleStartInput"},"Ngày bắt đầu",-1),dt={class:"form-outline mb-4"},ct=["value"],rt=t("label",{class:"form-label",for:"updateSaleEndInput"},"Ngày kết thúc",-1),ut={class:"form-outline mb-4"},mt=["value"],_t=t("label",{class:"form-label",for:"updateSalePercentInput"},"Phần trăm giảm",-1),ht={class:"list-group list-group-light"},pt={class:"list-group-item"},ft={class:"form-check d-flex align-items-center"},gt=["value"],bt={class:"form-check-label",for:"flexCheckDefault"},yt=["src"],vt=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),kt={class:"modal-body"},St=t("p",{class:"text-warning text-center"},"Bạn có chắc muốn xóa xuât sứ này",-1),xt={key:0,class:"alert alert-danger"},Tt={key:1,class:"alert alert-success"},Ct={class:"modal-footer"},Mt=["onClick"],Pt=t("th",null,"Loại khuyến mãi",-1),Nt=t("th",null,"Các sản phẩm được giảm",-1),Ot={class:"align-middle"},It={class:"align-middle"},Vt={class:"align-middle"},Dt={class:"align-middle"},$t={class:"align-middle"},Bt={class:"align-middle"},Et={class:"list-group list-group-light"},Gt={class:"list-group-item"},Xt={__name:"Sale",setup(S){const p=K(),f=G();p.fetchSales(),f.fetchProducts();const x=P("updationModal"),T=P("deletionModal"),b=$(0);return(N,g)=>{const O=y("dir"),m=y("VTh"),I=y("VTr");return o(),C(E,{"api-url":`${N.hostname}/sale`,"deletion-modal":u(T),"updation-modal":u(x),"fetched-data":u(p)},{modalTriggerButtons:s(()=>[l(v,{target:"addOriginModal"},{default:s(()=>[n(" Thêm khuyến mãi ")]),_:1})]),additionModal:s(({addHandler:r,errors:d})=>[l(k,{id:"addOriginModal"},{modalTitle:s(()=>[n(" Thêm khuyến mãi ")]),default:s(()=>[t("form",{onSubmit:M(e=>r(e,{sendRaw:!0}),["prevent"]),method:"POST"},[t("div",R,[X,H,t("div",q,[t("input",{class:"form-check-input",type:"radio",name:"type",checked:"",onChange:g[0]||(g[0]=e=>b.value=0),value:"promotion"},null,32),w]),t("div",F,[t("input",{class:"form-check-input",type:"radio",name:"type",onChange:g[1]||(g[1]=e=>b.value=1),value:"discount"},null,32),L]),t("div",j,[z,t("label",J,i(b.value==0?"Phần trăm giảm":"Giá trị giảm"),1)]),t("ul",Q,[u(f).selectedItems.length==0?(o(),a("p",U,"Điều hướng tới trang Admin sản phẩm để chọn các sản phẩm được giảm và quay lại")):(o(!0),a(h,{key:1},_(u(f).selectedItems,e=>(o(),a("li",W,[t("div",Y,[t("input",{class:"form-check-input",type:"checkbox",value:e._id,name:"products"},null,8,Z),t("label",tt,i(e.name),1),t("img",{src:"http://localhost:3000"+e.img,class:"img-fluid",crossorigin:"anonymous",style:{width:"45px",height:"45px"}},null,8,et)])]))),256))])]),st],40,A)]),_:2},1024)]),updationModal:s(({updateHandler:r,errors:d,selectedItem:e})=>[l(k,{id:"updateOriginModal",ref_key:"updationModal",ref:x},{modalTitle:s(()=>[n(" Sửa khuyến mãi ")]),default:s(()=>[t("form",{onSubmit:M(c=>r(c),["prevent"]),method:"POST"},[t("div",lt,[t("div",at,[t("input",{type:"date",id:"updateSaleStartInput",class:"form-control",name:"start",value:e&&new Date(e.start).toISOString().substring(0,10)},null,8,nt),it]),t("div",dt,[t("input",{type:"date",id:"updateSaleEndInput",class:"form-control",name:"end",value:e&&new Date(e.end).toISOString().substring(0,10)},null,8,ct),rt]),t("div",ut,[t("input",{type:"text",id:"updateSalePercentInput",class:"form-control",name:"percent",value:e==null?void 0:e.percent},null,8,mt),_t]),t("ul",ht,[(o(!0),a(h,null,_(u(f).selectedItems,c=>(o(),a("li",pt,[t("div",ft,[t("input",{class:"form-check-input",type:"checkbox",value:c._id,name:"products"},null,8,gt),t("label",bt,i(c.name),1),t("img",{src:"http://localhost:3000"+c.img,class:"img-fluid",crossorigin:"anonymous",style:{width:"45px",height:"45px"}},null,8,yt)])]))),256))])]),vt],40,ot)]),_:2},1536)]),deletionModal:s(({deleteHandler:r,errors:d})=>[l(k,{id:"deleteOriginModal",ref_key:"deletionModal",ref:T},{modalTitle:s(()=>[n(" Xóa khuyến mãi ")]),default:s(()=>[t("div",kt,[l(O,null,{default:s(()=>[St]),_:1}),d&&d.length!=0?(o(),a("div",xt,[(o(!0),a(h,null,_(d,e=>(o(),a("p",null,i(e.msg),1))),256))])):d&&d.length==0?(o(),a("div",Tt," Xóa xuất sứ thành công ")):B("",!0)]),t("div",Ct,[t("button",{class:"btn btn-primary btn-block mb-4",onClick:e=>r()},"Xóa",8,Mt)])]),_:2},1536)]),tableColumnNames:s(()=>[l(m,{sortKey:"_id"},{default:s(()=>[n("#")]),_:1}),l(m,{sortKey:"start"},{default:s(()=>[n("Ngày bắt đầu")]),_:1}),l(m,{sortKey:"end"},{default:s(()=>[n("Ngày kết thúc")]),_:1}),Pt,l(m,{sortKey:"percent"},{default:s(()=>[n("Phần trăm giảm/Giá trị giảm")]),_:1}),l(m,{sortKey:"content"},{default:s(()=>[n("Trạng thái")]),_:1}),Nt]),tableColumnDatas:s(({rows:r,selectItem:d})=>[(o(!0),a(h,null,_(r,e=>(o(),C(I,{row:e},{default:s(()=>[t("td",Ot,i(e._id),1),t("td",It,i(e.start),1),t("td",Vt,i(e.end),1),t("td",Dt,i(e.saleType=="Promotion"?"Phần trăm":"Giảm trực tiếp"),1),t("td",$t,i(e.saleType=="Promotion"?e.percent:e.value),1),t("td",Bt,i(e.isExpired==!0?"Hết hạn":"Hoạt động"),1),t("td",null,[t("ul",Et,[(o(!0),a(h,null,_(e.products,c=>(o(),a("li",Gt,i(c),1))),256))])]),t("td",null,[l(v,{target:"updateOriginModal",class:"me-2 btn btn-warning",onClick:c=>d(e)},{default:s(()=>[n(" Sửa ")]),_:2},1032,["onClick"]),l(v,{target:"deleteOriginModal",class:"btn btn-danger",onClick:c=>d(e)},{default:s(()=>[n(" Xóa ")]),_:2},1032,["onClick"])])]),_:2},1032,["row"]))),256))]),_:1},8,["api-url","deletion-modal","updation-modal","fetched-data"])}}};export{Xt as default};
