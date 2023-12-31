import { Container, List, Pagination, Stack } from "@mui/material";
import RestaurantItem from "./RestaurantItem"
import InfiniteScroll from 'react-infinite-scroll-component'


export default function RestaurantList({restList,loadMore}) {

    const {count, next, results} = restList
    const items = results.map((restList) => {
      return <RestaurantItem key={restList.id} restList={restList} />
  })
    return(
        <>
        <Stack direction={"column"}>
      <List >
            <InfiniteScroll
                dataLength={items.length}
                pageStart={0}
                loadMore={loadMore}
                hasMore={next !== null}
                loader={<div className="loader" key={0} >רק רגע</div>}>
                    {items}
            </InfiniteScroll>
        </List>
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <Stack direction={"column"} spacing={3}>
        <Pagination count={count} />
        </Stack>
        </Container>
        </Stack>

      </>
    )
}
    
