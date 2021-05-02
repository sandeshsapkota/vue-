<template>
    <div class="mx-auto">
        <div class="search-box mb-10 invisible">
            <div class="search-box__input-wrap">
                <input type="date" class="search-box__date-input">
                <Icon class="search-box__date-icon" name="calendar"/>
                <button class="search-box__submit-btn form-control">
                    <Icon name="search"/>
                </button>
            </div>
        </div>
        <p class="search-result-txt text-white">
            Results: <span v-text="messageList.length"/> mail<span v-if="messageList.length > 1" v-text="'(s)'"/>
        </p>
        <table class="c-table">
            <thead class="c-table__head text-left">
                <th class="c-table__th w-1/5  c-table__th--sort" @click="handleSort(messageList,'from')">from
                    <SortIcon/>
                </th>
                <th class="c-table__th w-1/4">to</th>
                <th class="c-table__th w-2/5">sub</th>
                <th class="c-table__th w-1/5 c-table__th--sort" @click="handleSort(messageList,'date')">
                    date
                    <SortIcon :class=""/>
                </th>
            </thead>
            <tbody class="c-table__body">
                <tr class="c-table__row" v-for="(message,index) in this.messageList">
                    <td class="c-table__td w-1/5" v-text="message.from"/>
                    <td class="c-table__td w-1/4 flex justify-between items-start">
                        <div>
                            <span v-text="message.to[0]"/>
                            <span v-if="message.to.length > 1">,  ...</span>
                        </div>
                        <span class="label" v-if="message.to.length > 1" v-text=" '+' + ( message.to.length - 1)"></span>
                    </td>
                    <td class="c-table__td w-2/5 flex justify-between">
                        <span v-text="message.sub" class="w-4/5"/>
                        <span class="flex items-center justify-center" @click="handleCopy(index)">
                            <Icon v-if="message.canCopy" name="clipboard" class="ml-auto"/>
                        </span>
                    </td>
                    <td class="c-table__td w-1/5" v-text="message.date"/>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Header      from "./Header"
    import Icon        from "./Icon"
    import messageList from "./script"
    import SortIcon    from "./SortIcon"

    export default {
        name: "Content",
        components: { Header, Icon, SortIcon },
        data() {
            return {
                messageList: [],
                sortOrder: "asc",
                sortBy: "",
            }
        },
        mounted() {
            this.messageList = [...messageList]
            this.handleSort("date")
        },
        methods: {
            handleSort: function(arr, sortBy) {
                // const arr = [
                //     { name: "Sandesh", age: 25 },
                //     { name: "Ramila", age: 19 },
                //     { name: "Pritvi", age: 28 },
                // ]

                arr = [...arr]

                let sortedArr = []
                this.sortBy = sortBy

                if (this.sortOrder === "asc") {

                    sortedArr = arr.sort((a, b) => {
                        if (a[this.sortBy] > b[this.sortBy]) {
                            return 1
                        }
                        if (a[this.sortBy] < b[this.sortBy]) {
                            return -1
                        }
                        return 0
                    })
                }

                if (this.sortOrder === "dsc") {
                    sortedArr = arr.sort((a, b) => {
                        if (a[this.sortBy] > b[this.sortBy]) {
                            return -1
                        }
                        if (a[this.sortBy] < b[this.sortBy]) {
                            return 1
                        }
                        return 0
                    })

                }

                if (this.sortOrder === "asc") {
                    this.sortOrder = "dsc"
                } else {
                    this.sortOrder = "asc"
                }

            },

            handleCopy(index) {
                console.log("copying", index)
            },

            caretClass(sortBy) {
                let classes
                if (this.sortBy === sortBy) {
                    classes = "caret--active"
                }
                if (this.sortOrder === "dsc") {
                    classes = "caret--active caret--dsc"
                }
                return classes
            },
        },
    }
</script>

<style lang="scss">
    .c-table__th,
    .c-table__td {

        &:nth-child(1) {
            width: 20%;
        }

        &:nth-child(2) {
            width: 30%;
        }

        &:nth-child(3) {
            width: 35%;
        }

        &:nth-child(4) {
            width: 15%;
        }
    }
</style>
