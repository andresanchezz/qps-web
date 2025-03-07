import { apiServicesQps } from "@/api/api";
import type { Communities, Community } from "@/interfaces/communities/communities.interface";
import type { Companies, Company } from "@/interfaces/companies/companies.interface";
import { useGlobalStateStore } from "@/store/auth.store";
import genericNullObject from "@/utils/null-data-meta";


export class CompaniesServices {

    static store = useGlobalStateStore();

    static async getCompanies(page: number = 1, take:number = 10): Promise<Companies> {

        this.store.setIsLoading(true)

        try {
            const { data } = await apiServicesQps.get(`/companies?page=${page}&take=${take}`)
            return data
        } catch (error) {
            console.log(error)
            return {
                data: [],
                meta: genericNullObject.meta
            }
        } finally {
            this.store.setIsLoading(false)
        }
    }

    static async createCompany(companyName:string) {
        try {
            const { data } = await apiServicesQps.post('/companies', {companyName})
            console.log(data)
        } catch (error:any) {
            throw new Error(error)
        } finally {
            this.store.setIsLoading(false)
        }
    }

    static async deleteCompany(companyId: string) {

        try {
            await apiServicesQps.delete(`/companies/${companyId}`)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async searchCompany(searchWord: string): Promise<Company[]> {
        this.store.setIsLoading(true)
        try {
            const { data } = await apiServicesQps.post(`/companies/search`, { searchWord });
            return data
        } catch (error) {
            return []
        }finally{
            this.store.setIsLoading(false)
        }
    }

    /*     static async editCommunity(community: Community, changedValue: any) {
            apiServicesQps.patch(`/communities/${community.id}`, { ...community, changedValue })
        }
    
        static async createCommunity(community: Community) {
            apiServicesQps.post(`/communities`, community)
        }
    
        static async deleteCommunity(community: Community) {
            try {
                await apiServicesQps.delete(`/communities/${community.id}`)
                console.log('éxito')
            } catch (error) {
                console.log(error)
            }
        } */



}