<script setup lang="ts">
import GenericDataView from "../shared/views/GenericDataView.vue";
import { CompaniesServices } from "./companies.services";


const fetchCompanies = async (page: number, rows: number) => {
    return await CompaniesServices.getCompanies(page, rows);
};

const deleteCompany = async (id: string) => {
    return await CompaniesServices.deleteCompany(id);
};

const searchCompany = async (searchWord: any, page: number, rows: number) => {
    return await CompaniesServices.searchCompany(searchWord, page, rows)
};

</script>

<template>
    <GenericDataView view-title="Companies" :headers="[
        { field: 'companyName', name: 'Company name' },
    ]"  :fetch-data="fetchCompanies" :delete-data="deleteCompany"
         :search-data="searchCompany" />
</template>