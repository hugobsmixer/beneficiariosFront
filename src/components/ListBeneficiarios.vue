<template>
    <div>
      <h3>{{ title }}</h3> <button type="submit" v-if="!isCreate"
            :class="`btn btn-primary`"
            @click="nuevoBeneficiario()">Nuevo</button>
                <input type="text"
                    class="form-control"
                    id="busqueda"
                    name="busqueda"
                    placeholder="Buscar...">
        <div class="list-group">
            <a v-for="(beneficiario, index) in arrayBeneficiarios" :key="index"
                @click="selectBeneficiario(beneficiario.id)"
                href="#"
                class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{beneficiario.fullName}}</h5>
                    <small class="text-muted">Beneficiario</small>
                </div> 
            </a>
        </div>
    </div>
  </template>
  
  <script>
  import DataAccess from '@/DataAccess';
  export default {
    name: 'ListBeneficiarios',
    props: {
      title: String
    },
    data() {
        return {
            arrayBeneficiarios: Array,
        };
    },
    created(){
        this.listarBeneficiarios();
    },
    methods:{
        async listarBeneficiarios(){
            let source = 'http://localhost:8080/beneficiario';
            let response = await DataAccess.getAll(source);
            this.arrayBeneficiarios = response.data;
            console.log(response);
        },
        async selectBeneficiario(id){
            console.log(id);
            this.$emit("selectBeneficiario", id);
        },
        async nuevoBeneficiario(){
            this.$emit("newBeneficiario");
        }
    }
  }
  </script>  