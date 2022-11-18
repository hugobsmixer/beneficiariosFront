<template>
    <div v-if="isEmpty" class="centered">
        <h2>Ningún beneficiario seleccionado</h2>
    </div>
    <div v-else class="row">
        <div class="col-md-8">
            <small>{{title}}</small> <h3>{{ status }}</h3>
        </div>
        <div class="col-md-4">
            <button type="submit" v-if="!isCreate"
                    :class="`btn btn-danger`"
                    @click="deleteBeneficiario(beneficiarioModel.id)">Eliminar</button>
            <button type="submit" v-if="isCreate"
                    :class="`btn btn-warning`"
                    @click="hideForm()">Cancelar</button>
        </div>
        <div class="col-md-4">
            <div class="circle"></div>
        </div>
        <div class="col-md-8">
            <form @submit.prevent="submit">
                <div>
                    <label for="fullName">Nombre Completo<span>*</span></label>
                    <input type="text"
                            class="form-control"
                            id="fullName"
                            name="fullName"
                            v-model="beneficiarioModel.fullName"
                            required="true">
                    <label for="cardNumber">No. De Tarjeta<span>*</span></label>
                    <input type="number"
                            class="form-control"
                            id="cardNumber"
                            name="cardNumber"
                            v-model="beneficiarioModel.cardNumber"
                            required="true">
                    <label for="balance">Saldo<span>*</span></label>
                    <input type="number"
                            class="form-control"
                            id="balance"
                            name="balance"
                            v-model="beneficiarioModel.balance"
                            required="false">
                </div>
                <button type="submit"
                    :class="`btn btn-success`"
                    @click="validate">{{textBtn}}</button>
            </form> 
        </div>
    </div>
  </template>
  
  <script>
  import DataAccess from '@/DataAccess';
  export default {
    name: 'FormBeneficiario',
    props: {
      title: String
    },
    data() {
        return {
            isEmpty: true,
            isCreate: true,
            status: "Nuevo",
            textBtn: "Guardar",
            arrayBeneficiario: Array,
            beneficiarioModel: {
                id: '',
                fullName: '',
                cardNumber: '',
                balance: ''
            }
        };
    },
    created(){
        console.log(this.isCreate, this.idSelected);
    },
    methods:{
        submit(e){
            let formData = new FormData(e.target);
            let data = Object.fromEntries(formData);
            console.log(data);
            if(this.isCreate){
                this.saveBeneficiario(data);
            }
            else{
                this.updateBeneficiario(data);
            }
        },
        async saveBeneficiario(data){
            let source = 'http://localhost:8080/beneficiario';
            let response = await DataAccess.post(source, data);
            this.arrayBeneficiario = response.data;
            this.clearForm();
            console.log(response);
            this.$emit("refreshList");
        },
        async updateBeneficiario(data){
            let source = `http://localhost:8080/beneficiario/${this.beneficiarioModel.id}`;
            let response = await DataAccess.post(source, data)
            this.clearForm();
            console.log(response);
            this.$emit("refreshList");
        },
        async detailBeneficiario(id){
            let source = 'http://localhost:8080/beneficiario';
            let response = await DataAccess.get(source, id);
            console.log(response.data);
            let dataBeneficiario = response.data;
            this.beneficiarioModel.id = dataBeneficiario.id;
            this.beneficiarioModel.fullName = dataBeneficiario.fullName;
            this.beneficiarioModel.cardNumber = dataBeneficiario.cardNumber;
            this.beneficiarioModel.balance = dataBeneficiario.balance;
            this.isCreate=false;
            this.status = "Editar";
            this.textBtn = "Actualizar";
            this.isEmpty=false;
        },
        async deleteBeneficiario(id){
            let source = 'http://localhost:8080/beneficiario';
            let response = await DataAccess.delete(source, id);
            this.hideForm();
            this.isCreate=true;
            this.status = "Nuevo";
            console.log(response);
            this.$emit("refreshList");
        },
        async clearForm(){
            this.isEmpty=false;
            this.isCreate=true;
            this.status = "Nuevo";
            this.textBtn = "Guardar";
            this.beneficiarioModel.id = '';
            this.beneficiarioModel.fullName = '';
            this.beneficiarioModel.cardNumber = '';
            this.beneficiarioModel.balance = '';
        },
        async hideForm(){
            this.isEmpty=true;
        }
    }
  }
  </script>  