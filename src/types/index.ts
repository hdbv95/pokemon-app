export type BasePokemon = {
    name: string
    url: string
}

export type ApiResponse = {
    count: number
    next: string
    previous: string
    results: Array<BasePokemon>
}

type Ability = {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

type Type = {
    slot: number
    type: {
        name: string
        url: string
    }
}

type Stat = {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

type Sprite = {
    front_default: string | null
    front_shiny: string | null
    back_default: string | null
    back_shiny: string | null
}

export type PokemonResponse = {
    id: number
    name: string
    height: number
    weight: number
    abilities: Ability[]
    types: Type[]
    stats: Stat[]
    sprites: Sprite
    species: {
        name: string
        url: string
    }
}

export const typeColors: Record<string, string[]> = {
    fire: ['#F87171', '#FB923C'],
    water: ['#3B82F6', '#22D3EE'],
    grass: ['#10B981', '#84CC16'],
    electric: ['#F59E0B', '#FBBF24'],
    psychic: ['#9B4D96', '#D8B2D1'],
    ice: ['#93C5FD', '#A5F3FC'],
    fairy: ['#F472B6', '#D8B4FE'],
    bug: ['#84CC16', '#4ADE80'],
    normal: ['#D1D5DB', '#9CA3AF'],
    fighting: ['#B91C1C', '#D97706'],
    ground: ['#D97706', '#F97316'],
    flying: ['#38BDF8', '#3B82F6'],
    poison: ['#8B5CF6', '#6B21A8'],
    rock: ['#4B5563', '#D97706'],
    ghost: ['#6B21A8', '#4C1D95'],
    dragon: ['#F97316', '#F59E0B'],
    steel: ['#9CA3AF', '#1E293B'],
    dark: ['#1F2937', '#4B5563'],
    unknown: ['#9CA3AF', '#6B4F1E'],
    shadow: ['#000000', '#6B7280']
}


