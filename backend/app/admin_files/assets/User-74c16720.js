import{d as S,u as w,j as k,w as e,l as u,o as n,k as l,b as i,a as t,c as o,F as p,n as _,q as f,s as x,v as P,x as h,t as d}from"./index-693ca851.js";import{u as C,C as E,_ as b,M as g}from"./useTemplateRef-0c0990fc.js";const V=S("users",{state:()=>({items:[]}),getters:{alertsStore:()=>w()},actions:{async fetchUsers(){if(this.items&&this.items.length==0){var v="http://localhost:3000/admin/user",c=await this.alertsStore.callAPI("danger",v);this.items=c.items}}}}),B=["onSubmit"],F={class:"modal-body"},K=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addUserFirstnameInput",class:"form-control",name:"firstname"}),t("label",{class:"form-label",for:"addUserFirstnameInput"},"Họ")],-1),A=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addUserLastnameInput",class:"form-control",name:"lastname"}),t("label",{class:"form-label",for:"addUserLastnameInput"},"Tên")],-1),L=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"addUserNumberInput",class:"form-control",name:"number"}),t("label",{class:"form-label",for:"addUserNumberInput"},"Số điện thoại")],-1),$=t("div",{class:"form-outline mb-4"},[t("input",{type:"email",id:"addUserEmailInput",class:"form-control",name:"email"}),t("label",{class:"form-label",for:"addUserEmailInput"},"Email")],-1),X=t("div",{class:"form-outline mb-4"},[t("input",{type:"password",id:"addUserPasswordInput",class:"form-control",name:"password"}),t("label",{class:"form-label",for:"addUserPasswordInput"},"Mật khẩu")],-1),G=t("div",{class:"form-outline mb-4"},[t("input",{type:"password",id:"addUserConfirmPassInput",class:"form-control",name:"passwordConfirmation"}),t("label",{class:"form-label",for:"addUserConfirmPassInput"},"Nhập lại mật khẩu")],-1),H=t("select",{class:"form-select mb-4","aria-label":"Chọn giới tính",name:"sex"},[t("option",{selected:""},"Giới tính"),t("option",{value:"user"},"Nam"),t("option",{value:"admin"},"Nữ")],-1),j=t("select",{class:"form-select mb-4","aria-label":"Chọn vai trò",name:"role"},[t("option",{selected:""},"Chọn vai trò người dùng"),t("option",{value:"user"},"Người dùng"),t("option",{value:"admin"},"Admin")],-1),D={key:0,class:"alert alert-danger"},O={key:1,class:"alert alert-success"},q=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),R=["onSubmit"],z={class:"modal-body"},J=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"updateUserFirstnameInput",class:"form-control",name:"firstname"}),t("label",{class:"form-label",for:"updateUserFirstnameInput"},"Họ")],-1),Q=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"updateUserLastnameInput",class:"form-control",name:"lastname"}),t("label",{class:"form-label",for:"updateUserLastnameInput"},"Tên")],-1),W=t("div",{class:"form-outline mb-4"},[t("input",{type:"text",id:"updateUserNumberInput",class:"form-control",name:"number"}),t("label",{class:"form-label",for:"updateUserNumberInput"},"Số điện thoại")],-1),Y=t("div",{class:"form-outline mb-4"},[t("input",{type:"email",id:"updateUserEmailInput",class:"form-control",name:"email"}),t("label",{class:"form-label",for:"updateUserEmailInput"},"Email")],-1),Z=t("div",{class:"form-outline mb-4"},[t("input",{type:"password",id:"updateUserPasswordInput",class:"form-control",name:"password"}),t("label",{class:"form-label",for:"updateUserPasswordInput"},"Mật khẩu")],-1),tt=t("select",{class:"form-select mb-4","aria-label":"Chọn giới tính",name:"sex"},[t("option",{selected:""},"Giới tính"),t("option",{value:"user"},"Nam"),t("option",{value:"admin"},"Nữ")],-1),et=t("select",{class:"form-select mb-4","aria-label":"Chọn vai trò",name:"role"},[t("option",{selected:""},"Chọn vai trò người dùng"),t("option",{value:"user"},"Người dùng"),t("option",{value:"admin"},"Admin")],-1),st={key:0,class:"alert alert-danger"},at={key:1,class:"alert alert-success"},nt=t("div",{class:"modal-footer"},[t("button",{type:"submit",class:"btn btn-primary btn-block mb-4"},"Thêm")],-1),lt={class:"modal-body"},ot=t("p",{class:"text-warning text-center"},"Bạn có chắc muốn xóa người dùng này",-1),it={key:0,class:"alert alert-danger"},dt={key:1,class:"alert alert-success"},rt={class:"modal-footer"},mt=["onClick"],ft={__name:"User",setup(v){const c=V();c.fetchUsers();const I=P("hostname"),y=C("updationModal"),U=C("deletionModal");return(ct,ut)=>{const M=h("dir"),m=h("VTh"),T=h("VTr");return n(),k(E,{"api-url":`${u(I)}/admin/user`,"deletion-modal":u(U),"updation-modal":u(y),"fetched-data":u(c)},{modalTriggerButtons:e(()=>[l(b,{target:"addUserModal"},{default:e(()=>[i(" Thêm người dùng ")]),_:1})]),additionModal:e(({addHandler:r,errors:a})=>[l(g,{id:"addUserModal",ref:"additionModal"},{modalTitle:e(()=>[i(" Thêm người dùng ")]),default:e(()=>[t("form",{onSubmit:x(s=>r(s),["prevent"]),method:"POST"},[t("div",F,[K,A,L,$,X,G,H,j,a&&a.length!=0?(n(),o("div",D,[(n(!0),o(p,null,_(a,s=>(n(),o("p",null,d(s.msg),1))),256))])):a&&a.length==0?(n(),o("div",O," Thêm thành công ")):f("",!0)]),q],40,B)]),_:2},1536)]),updationModal:e(({updateHandler:r,errors:a})=>[l(g,{id:"updateUserModal",ref_key:"updationModal",ref:y},{modalTitle:e(()=>[i(" Thêm người dùng ")]),default:e(()=>[t("form",{onSubmit:x(s=>r(s),["prevent"]),method:"POST"},[t("div",z,[J,Q,W,Y,Z,tt,et,a&&a.length!=0?(n(),o("div",st,[(n(!0),o(p,null,_(a,s=>(n(),o("p",null,d(s.msg),1))),256))])):a&&a.length==0?(n(),o("div",at," Thêm thành công ")):f("",!0)]),nt],40,R)]),_:2},1536)]),deletionModal:e(({deleteHandler:r,errors:a})=>[l(g,{id:"deleteUserModal",ref_key:"deletionModal",ref:U},{modalTitle:e(()=>[i(" Xóa người dùng ")]),default:e(()=>[t("div",lt,[l(M,null,{default:e(()=>[ot]),_:1}),a&&a.length!=0?(n(),o("div",it,[(n(!0),o(p,null,_(a,s=>(n(),o("p",null,d(s.msg),1))),256))])):a&&a.length==0?(n(),o("div",dt," Xóa sản phẩm thành công ")):f("",!0)]),t("div",rt,[t("button",{class:"btn btn-primary btn-block mb-4",onClick:s=>r()},"Xóa",8,mt)])]),_:2},1536)]),tableColumnNames:e(()=>[t("tr",null,[l(m,{sortKey:"_id"},{default:e(()=>[i("#")]),_:1}),l(m,{class:"text-center",sortKey:"name"},{default:e(()=>[i("Họ")]),_:1}),l(m,{class:"text-center",sortKey:"price"},{default:e(()=>[i("Tên")]),_:1}),l(m,{class:"text-center",sortKey:"description"},{default:e(()=>[i("Số điện thoại")]),_:1}),l(m,{class:"text-center",sortKey:"branch"},{default:e(()=>[i("Email")]),_:1}),l(m,{class:"text-center",sortKey:"origin"},{default:e(()=>[i("Giới tính")]),_:1})])]),tableColumnDatas:e(({rows:r,selectItem:a})=>[(n(!0),o(p,null,_(r,s=>(n(),k(T,{key:s._id,row:s},{default:e(()=>[t("td",null,d(s._id),1),t("td",null,d(s.firstname),1),t("td",null,d(s.lastname),1),t("td",null,d(s.number),1),t("td",null,d(s.email),1),t("td",null,d(s.sex==="Male"?"Nam":"Nữ"),1),t("td",null,[l(b,{target:"updateUserModal",class:"me-2 btn btn-warning",onClick:N=>a(s)},{default:e(()=>[i(" Sửa ")]),_:2},1032,["onClick"]),l(b,{target:"deleteUserModal",class:"btn btn-danger",onClick:N=>a(s)},{default:e(()=>[i(" Xóa ")]),_:2},1032,["onClick"])])]),_:2},1032,["row"]))),128))]),_:1},8,["api-url","deletion-modal","updation-modal","fetched-data"])}}};export{ft as default};
