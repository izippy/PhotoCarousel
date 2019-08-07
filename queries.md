## **postgres**

```SELECT * FROM photos WHERE listing_id = 10000000 AND priority <= 4```

id | listing_id | photoUrl | tinyPhotoUrl | Description | priority
---|------------|----------|--------------|------------|---------|
30751137 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg112.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg112.jpg | Temporibus sit inventore distinctio iusto. | 20 
30751136 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg51.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg51.jpg | Voluptas nihil est et cupiditate. | 19 
30751135 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg2.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg2.jpg | Voluptatibus doloribus est autem consequatur. | 18 
30751134 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg151.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg151.jpg | Sit dignissimos et sapiente tempore. | 17 
30751133 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg116.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg116.jpg | Nobis et labore dolore quod. | 16 
30751132 | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg87.jpg | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg87.jpg | Ut quis accusamus quia deleniti. | 15 


## **cassandra**

```SELECT * FROM photos WHERE listing_id = 10000000 AND priority <= 4 ALLOW FILTERING```

id | caption | listing_id | photourl| priority | tinyurl
---|---------|------------|---------|----------|---------|
30746566 | Aut facilis totam quidem voluptatem. | 10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg382.jpg | 0 | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg382.jpg
30746568 | Officia aspernatur dignissimos reprehenderit nisi. |   10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg339.jpg |        2 | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg339.jpg
30746567 | Culpa quis omnis sapiente nostrum. |   10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg151.jpg |        1 | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg151.jpg
30746570 | Quia dolorem dolore quis adipisci. |   10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg362.jpg |        4 | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg362.jpg
30746569 | Aut velit id eveniet sequi. |   10000000 | https://sdcimages123.s3-us-west-1.amazonaws.com/largeImages/HouseImg284.jpg |        3 | https://sdcimages123.s3-us-west-1.amazonaws.com/smallImages/SmallHouseImg284.jpg 