import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'

const column1 = {
    title: 'column1',
    key: 'column1',
    sorter: true,
    sortOrder: 'asc'
}

const column2 = {
    title: 'column2',
    key: 'column2',
    filter: true,
    filterOptionValues: [],
    filterOptions: [
        {
            label: 'Value1',
            value: 1
        },
        {
            label: 'Value2',
            value: 2
        }
    ]
}

const columns = [
    column1,
    column2,
    {
        title: 'Column3',
        key: 'column3'
    }
]

const data = Array.apply(null, { length: 987 }).map((_, index) => {
    return {
        column1: index,
        column2: (index % 2) + 1,
        column3: 'a' + index
    }
})

const query = (page, pageSize = 10, order = 'ascend', filterValues = []) => {
    return new Promise((resolve) => {
        const copiedData = data.map((v) => v)
        const orderedData = order === 'descend' ? copiedData.reverse() : copiedData
        const filteredData = filterValues.length
            ? orderedData.filter((row) => filterValues.includes(row.column2))
            : orderedData
        const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)
        const total = filteredData.length
        const pageCount = Math.ceil(filteredData.length / pageSize)
        setTimeout(
            () =>
                resolve({
                    pageCount,
                    data: pagedData,
                    total
                }),
            1500
        )
    })
}

export const Table = defineComponent({
    props: {},
    emits: [],
    components: {},
    setup(props, ctx) {
        const dataRef = ref([])
        const tableRef = ref(null);
        const loadingRef = ref(true)
        const columnsRef = ref(columns)
        const column1Reactive = reactive(column1)
        const column2Reactive = reactive(column2)
        const paginationReactive = reactive({
            page: 1,
            pageCount: 1,
            pageSize: 20,
            itemCount: 0,
            prefix({ itemCount }) {
                return `Total is ${itemCount}.`
            }
        })

        onMounted(() => {
            query(
                paginationReactive.page,
                paginationReactive.pageSize,
                column1Reactive.sortOrder,
                column2Reactive.filterOptionValues
            ).then((data: any) => {
                dataRef.value = data.data
                paginationReactive.pageCount = data.pageCount
                paginationReactive.itemCount = data.total
                loadingRef.value = false
            })
        })

        const handleSorterChange = (sorter) => {
            if (!sorter || sorter.columnKey === 'column1') {
                if (!loadingRef.value) {
                    loadingRef.value = true
                    query(
                        paginationReactive.page,
                        paginationReactive.pageSize,
                        !sorter ? false : sorter.order,
                        column2Reactive.filterOptionValues
                    ).then((data: any) => {
                        column1Reactive.sortOrder = !sorter ? false : sorter.order
                        dataRef.value = data.data
                        paginationReactive.pageCount = data.pageCount
                        paginationReactive.itemCount = data.total
                        loadingRef.value = false
                    })
                }
            }
        }
        const handleFiltersChange = (filters) => {
            if (!loadingRef.value) {
                loadingRef.value = true
                const filterValues = filters.column2 || []
                query(
                    paginationReactive.page,
                    paginationReactive.pageSize,
                    column1Reactive.sortOrder,
                    filterValues
                ).then((data: any) => {
                    column2Reactive.filterOptionValues = filterValues
                    dataRef.value = data.data
                    paginationReactive.pageCount = data.pageCount
                    paginationReactive.itemCount = data.total
                    loadingRef.value = false
                })
            }
        }
        const handlePageChange = (currentPage) => {
            if (!loadingRef.value) {
                loadingRef.value = true
                query(
                    currentPage,
                    paginationReactive.pageSize,
                    column1Reactive.sortOrder,
                    column2Reactive.filterOptionValues
                ).then((data: any) => {
                    dataRef.value = data.data
                    paginationReactive.page = currentPage
                    paginationReactive.pageCount = data.pageCount
                    paginationReactive.itemCount = data.total
                    loadingRef.value = false
                })
            }
        }

        const rowKey = (rowData) => {
            return rowData.column1
        }

        return () => <n-data-table
            remote
            ref={tableRef.value}
            columns={columnsRef.value}
            data={dataRef.value}
            loading={loadingRef.value}
            pagination={paginationReactive}
            max-height={720}
            row-key={rowKey}
            onUpdate:sorter={handleSorterChange}
            onUpdate:filters={handleFiltersChange}
            onUpdate:page={handlePageChange}
        />
    }
})