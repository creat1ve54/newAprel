const isOpen = ref(false as Boolean)

export const usePopup = () => {
    const open = () => {
        isOpen.value = true
    }

    const close = () => {
        isOpen.value = false
    }

    return {
        open,
        close,
        isOpen
    }
}

console.log(isOpen.value);