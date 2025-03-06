import { apiServicesQps } from "@/api/api";
import type { Communities, Community, NewCommunity } from "@/interfaces/communities/communities.interface";
import type { NewUser, UserRoles, Users } from "@/interfaces/users/users.interface";
import { useGlobalStateStore } from "@/store/auth.store";
import genericNullObject from "@/utils/null-data-meta";


export class UsersServices {

    static store = useGlobalStateStore();

    static async getUsers(): Promise<Users> {

        this.store.setIsLoading(true)

        try {
            const { data } = await apiServicesQps.get('/users')
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

    static async getUsersRoles(): Promise<UserRoles[]> {

        this.store.setIsLoading(true)

        try {
            const { data } = await apiServicesQps.get('/users/roles')
            return data
        } catch (error) {
            console.log(error)
            return []
        } finally {
            this.store.setIsLoading(false)
        }
    }

    static async createUser(newUser: NewUser) {
        try {
            await apiServicesQps.post(`/users`, newUser)
        } catch (error: any) {
            throw new Error(error)
        }
    }

}