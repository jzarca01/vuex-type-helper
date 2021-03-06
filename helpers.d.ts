import Vue from 'vue'
import 'vuex'

declare module 'vuex/types/helpers' {
  type Accessor<T, State, Getters> = {
    [K in keyof T]: <V extends Vue>(this: V, state: State, getters: Getters) => T[K]
  } & {
    [key: string]: <V extends Vue>(this: V, state: State, getters: Getters) => any
  }

  interface ComputedMapper<T> {
    <Key extends keyof T, Map extends Dictionary<Key>>(map: Map): { [K in keyof Map]: () => T[Map[K]] }
    <Key extends keyof T>(map: Key[]): { [K in Key]: () => T[K] }
  }

  interface ComputedStateMapper<State, Getters> {
    <T>(map: Accessor<T, State, Getters>): { [K in keyof T]: () => T[K] }
  }

  interface MethodsMapper<T, R> {
    <Key extends keyof T, Map extends Dictionary<Key>>(map: Map): { [K in keyof Map]: (payload: T[Map[K]]) => R }
    <Key extends keyof T>(map: Key[]): { [K in Key]: (payload: T[K]) => R }
  }

  interface StrictNamespacedMappers<State, Getters, Mutations, Actions> {
    mapState: ComputedMapper<State> & ComputedStateMapper<State, Getters>
    mapGetters: ComputedMapper<Getters>
    mapMutations: MethodsMapper<Mutations, void>
    mapActions: MethodsMapper<Actions, Promise<any>>
  }

  export function createNamespacedHelpers(namespace: string): NamespacedMappers
  export function createNamespacedHelpers<State, Getters, Mutations, Actions>(namespace: string): StrictNamespacedMappers<State, Getters, Mutations, Actions>
}
