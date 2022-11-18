<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="mainHeader">
      <div class="container-fluid">
        <h3>Administración de Beneficiario</h3>
      </div>
    </nav>
  </header>

  <main class="flex-shrink-0">
    <div class="sidebar"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <ListBeneficiarios
            title="Todos los Beneficiarios"
            ref="listComponent"
            @selectBeneficiario="selectedBeneficiario"
            @newBeneficiario="newBeneficiario">
          </ListBeneficiarios>
        </div>
        <div class="col-md-6"> 
          <FormBeneficiario
            title="Beneficiario"
            ref="formComponent"
            @refreshList="updateList">
          </FormBeneficiario>
        </div>
      </div>
    </div>
  </main>                           
</template>

<script>
import ListBeneficiarios from './components/ListBeneficiarios.vue'
import FormBeneficiario from './components/FormBeneficiario.vue'
import DataAccess from '@/DataAccess';
export default {
  name: 'App',
  components: {
    ListBeneficiarios,
    FormBeneficiario
  },
  data() {
      return {
      };
  },
  created(){
    this.listarBeneficiarios();
  },
  methods:{
    async listarBeneficiarios(){
      let source = 'http://localhost:8080/beneficiario';
      let response = await DataAccess.getAll(source);
      console.log(response);
    },
    selectedBeneficiario(id){
      this.$refs.formComponent.detailBeneficiario(id);
    },
    updateList(){
      this.$refs.listComponent.listarBeneficiarios();
    },
    newBeneficiario(){
      this.$refs.formComponent.clearForm();
    }
  }
}
</script>

