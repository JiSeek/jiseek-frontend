const foodsMapKoToEn = {
  쌀밥: 'Rice',
  오곡밥: 'Five-grain Rice',
  콩밥: 'Rice with Beans',
  보리밥: 'Barley Rice',
  영양돌솥밥: 'Nutritious Hot Stone Pot Rice',
  감자밥: 'Rice with Potatoes',
  곤드레밥: 'Rice with Thistle',
  김치볶음밥: 'Kimchi Fried Rice',
  멸치주먹밥: 'Anchovy Riceball',
  볶음밥: 'Fried Rice',
  비빔밥: 'Bibimbap',
  전주비빔밥: 'Jeonju Bibimbap',
  삼선볶음밥: 'Seafood Fried Rice',
  새우볶음밥: 'Shrimp Fried Rice',
  알밥: 'Rice with Fish Roe',
  약초비빔밥: 'Herbs Bibimbap',
  오므라이스: 'Omelet Rice',
  육회비빔밥: 'Beef Tartare Bibimbap',
  해물볶음밥: 'Seafood fried rice',
  열무비빔밥: 'Young Summer Radish Kimchi Bibimbap',
  류산슬덮밥: 'Rice with Stir-fried Seafood, Vegetables and Beef',
  불고기덮밥: 'Bulgogi with Rice',
  소고기국밥: 'Beef and Rice Soup',
  송이덮밥: 'Rice with Pine Mushrooms',
  오징어덮밥: 'Spicy Stir-fried Squid with Rice',
  자장밥: 'Rice with Black Soybean Sauce',
  잡채밥: 'Rice with Stir-fried Glass Noodles and Vegetables',
  잡탕밥: 'Rice Mixed with Fish and Vegetables',
  장어덮밥: 'Rice with Grilled Eel',
  제육덮밥: 'Spicy Stir-fried Pork with Rice',
  짬뽕밥: 'Spicy Seafood Noodle Soup with Rice',
  참치덮밥: 'Rice with Flying Fish Roe and Tuna',
  카레라이스: 'Curry with Rice',
  전주콩나물국밥: 'Jeonju-style Bean Sprout and Rice Soup',
  해물덮밥: 'Rice with Seafood',
  회덮밥: 'Raw Fish Bibimbap',
  안성국밥: 'Anseong-style Rice Soup',
  돼지국밥: 'Pork and Rice Soup',
  김치김밥: 'Gimbap with Kimchi',
  농어초밥: 'Bass Sushi',
  문어: 'Octopus',
  초밥: 'Sushi',
  새우초밥: 'Shrimp Sushi',
  새우튀김롤: 'Deep-fried Shrimp Roll',
  샐러드김밥: 'Salad Gimbap',
  광어초밥: 'Flatfish Sushi',
  소고기: 'Beef',
  김밥: 'Gimbap',
  갈비삼각김밥: 'Rib Triangle Gimbap',
  연어롤: 'Salmon Roll',
  연어초밥: 'Salmon Sushi',
  유부초밥: 'Fried Tofu Rice Balls',
  장어초밥: 'Eel Sushi',
  참치김밥: 'Tuna Gimbap',
  참치마요삼각김밥: 'Tuna with Mayonnaise Triangle Gimbap',
  충무김밥: 'Chungmu-style Gimbap',
  치즈김밥: 'Cheese Gimbap',
  캘리포니아롤: 'California Roll',
  한치초밥: 'Cuttlefish Sushi',
  간자장: 'Noodles with Black Soybean Sauce',
  굴짬뽕: 'Spicy Seafood Noodle Soup with Oysters',
  기스면: 'Noodles in Chicken Broth',
  김치라면: 'Kimchi Ramen',
  김치우동: 'Kimchi Udon',
  김치말이국수: 'Kimchi Noodles',
  닭칼국수: 'Noodle Soup with Chicken',
  들깨칼국수: 'Noodle Soup with Perilla Seed',
  떡라면: 'Rice Cake Ramen',
  라면: 'Ramen',
  막국수: 'Buckwheat Noodles',
  메밀국수: 'Buckwheat noodles',
  물냉면: 'Cold Buckwheat Noodles',
  비빔국수: 'Spicy Noodles',
  비빔냉면: 'Spicy Buckwheat Noodles',
  삼선우동: 'Seafood Udon',
  삼선자장면: 'Seafood and Noodles with Black Soybean Sauce ',
  삼선짬뽕: 'Spicy Seafood Noodle Soup',
  수제비: 'Hand-pulled Dough Soup',
  쌀국수: 'Rice Noodles',
  열무김치국수: 'Noodles in Young Summer Radish Kimchi Broth',
  열무냉면: 'Cold Buckwheat Noodles with Young Summer Radish Kimchi',
  오일소스스파게티: 'Oil Spaghetti',
  일식우동: 'Japanese Udon',
  중식우동: 'Chinese Udon',
  울면: 'Noodles in Thick Broth',
  자장면: 'Noodles with Black Soybean Sauce',
  잔치국수: 'Banquet Noodles',
  짬뽕: 'Spicy Seafood Noodle',
  짬뽕라면: 'Spicy Seafood Noodle Ramen',
  쫄면: 'Spicy Cold Chewy Noodles',
  치즈라면: 'Cheese Ramen',
  콩국수: 'Noodles in Cold Soybean Soup',
  크림소스스파게티: 'Cream Sauce Spaghetti',
  토마토소스스파게티: 'Tomato Sauce Spaghetti',
  해물칼국수: 'Noodle Soup with Seafood',
  회냉면: 'Cold Buckwheat Noodles with Raw Fish',
  떡국: 'rice-cake soup',
  떡만둣국: 'Sliced Rice Cake and Dumpling Soup',
  고기만두: 'Meat Dumplings',
  군만두: 'Fried Dumplings',
  김치만두: 'Kimchi Dumplings',
  물만두: 'Boiled Dumplings',
  만둣국: 'Dumpling Soup',
  게살죽: 'Crab Meat Rice Porridge',
  깨죽: 'Sesame Rice Porridge',
  닭죽: 'Chicken Rice Porridge',
  소고기버섯죽: 'Beef Mushroom Porridge',
  어죽: 'Fish Rice Porridge',
  잣국: 'Clear Soybean Soup',
  전복죽: 'Abalone Rice Porridge',
  참치죽: 'Tuna Porridge',
  채소죽: 'Vegetable Porridge',
  팥죽: 'Red Bean Porridge',
  호박죽: 'Pumpkin Porridge',
  콘스프: 'Corn Soup',
  토마토스프: 'Tomato Soup',
  굴국: 'Oyster Soup',
  김치국: 'Kimchi Soup',
  달걀국: 'Egg Soup',
  감자국: 'Potato Soup',
  미역국: 'Seaweed Soup',
  바지락조개국: 'Clam Soup',
  소고기무국: 'Beef Radish Soup',
  소고기미역국: 'Beef Seaweed Soup',
  소머리국밥: 'Ox Head Rice Soup',
  순대국: 'Korean Blood Sausage Soup',
  어묵국: 'Fish Cake Soup',
  오징어국: 'Squid Soup',
  토란국: 'Taro Soup',
  탕국: 'Beef Radish Broth',
  홍합미역국: 'Seaweed Soup with Mussels',
  황태해장국: 'Dried Pollack Hangover Soup',
  근대된장국: 'Doenjang Soup',
  미소된장국: 'Miso Soup',
  배추된장국: 'Cabbage Doenjang Soup',
  뼈다귀해장국: 'Pork Rib Hangover Soup',
  선지해장국: 'Ox Blood Hangover Soup',
  선짓국: 'Ox Blood Soup',
  시금치된장국: 'Spinachi Doenjang Soup',
  시래기된장국: 'Soybean Paste Soup with Dried Radish Leaves',
  쑥된장국: 'Soybean Paste Soup with Mugwort',
  아욱된장국: 'Soybean Paste Soup with Curled Mallow',
  우거지된장국: 'Soybean Paste Soup with Cabbage',
  우거지해장국: 'Cabbage Hangover Soup',
  우렁된장국: 'Snails Doenjang Soup',
  갈낙탕: 'Beef Rib and Octopus Soup',
  갈비탕: 'Short Rib Soup',
  감자탕: 'Pork Back-bone Stew',
  곰탕: 'Beef Bone Soup',
  매운탕: 'Spicy Fish Stew',
  꼬리곰탕: 'Ox-tail Soup',
  꽃제탕: 'Spicy Blue Crab Stew',
  낙지탕: 'Octopus Soup',
  내장탕: 'Beef Tripe and Intestine Soup',
  닭곰탕: 'Chicken Soup',
  닭볶음탕: 'Braised Spicy Chicken',
  지리탕: 'Fish Stew',
  도가니탕: 'Ox Knee Soup',
  삼계탕: 'Ginseng Chicken Soup',
  설렁탕: 'Ox Bone Soup',
  아구탕: 'Monkfish Soup',
  알탕: 'Spicy Fish Roe Soup',
  연포탕: 'Octopus Soup',
  오리탕: 'Duck Soup',
  추어탕: 'Loach Soup',
  해물탕: 'Spicy Seafood Stew',
  닭개장: 'Spicy Chicken Soup',
  육개장: 'Spicy Beef Soup',
  미역오이냉국: 'Cold Cucumber and Seaweed Soup',
  고등어찌개: 'Mackerel Stew',
  꽁치찌개: 'Saury Stew',
  동태찌개: 'Pollack Stew',
  부대찌개: 'Spicy Sausage Stew',
  된장찌개: 'Soybean Paste Stew',
  청국장찌개: 'Rich Soybean Paste Stew',
  두부전골: 'Tofu Hot Pot',
  곱창전골: 'Beef Tripe Hot Pot',
  소고기전골: 'Beef Hot Pot',
  국수전골: 'Noodle Hotpot',
  김치찌개: 'Kimchi Stew',
  버섯찌개: 'Mushroom Stew',
  새우젓두부찌개: 'Salted Shrimp and Tofu Stew',
  순두부찌개: 'Soft Tofu Stew',
  콩비지찌개: 'Pureed Soybean Stew',
  햄김치찌개: 'Ham and Kimchi Stew',
  호박찌개: 'Pumpkin Stew',
  대구찜: 'Braised Codfish',
  도미찜: 'Dome steamed',
  동태찜: 'Braised Sea Bream',
  문어숙회: 'Parboiled Octopus',
  민어찜: 'Braised Croaker',
  병어찜: 'Braised Silver Pomfret',
  북어찜: 'Braised Dried Pollack',
  아귀찜: 'Braised Spicy Monkfish',
  전어찜: 'Braised Gizzar',
  조기찜: 'Braised Croaker',
  참꼬막: 'Granular Ark',
  해물찜: 'Braised Spicy Seafood',
  홍어찜: 'Braised Skate',
  닭갈비: 'Spicy Stir-fried Chicken',
  닭꼬치: 'Chicken Skewers',
  돼지갈비: 'Spareribs',
  떡갈비: 'Grilled Short Rib Patties',
  불고기: 'Bulgogi',
  소곱창구이: 'Grilled Beef Tripe',
  소양념갈비구이: 'Grilled Beef Ribs',
  소불고기: 'Beef Bulgogi',
  양념왕갈비: 'Premium Grilled Spareribs',
  햄버거스테이크: 'Hamburger Steak',
  훈제오리: 'Smoked Duck',
  치킨데리야끼: 'Chicken Teriyaki',
  치킨윙: 'Chickenwing',
  더덕구이: 'Grilled Deodeok',
  양배추구이: 'Grilled Cabbage',
  두부구이: 'Grilled Tofu',
  가자미전: 'Sole Pancake',
  굴전: 'Oyster Pancake',
  해물파전: 'Seafood Pancake',
  동그랑땡: 'Korean Meatboll',
  햄부침: 'Fried Ham',
  육전: 'Pan-fried Beef',
  감자전: 'Potato Pancake',
  고추전: 'Red Pepper Pancake',
  김치전: 'Kimchi Pancake',
  깻잎전: 'Sesame Leaf Pancake',
  녹두빈대떡: 'Mung Bean Pancake',
  미나리전: 'Water Parsely Pancake',
  배추전: 'Napa Cabbage Pancake',
  버섯전: 'Mushroom Pancake',
  부추전: 'Leek Pancake',
  야채전: 'Vegetable Pancake',
  파전: 'Green Onion Pancake',
  호박부침개: 'Pumpkin Pancake',
  호박전: 'Pumpkin Pancake',
  달걀말이: 'Egg Roll',
  두부부침: 'Pan-fried Tofu',
  두부전: 'Tofu Pancake',
  건새우볶음: 'Stir-fried Dried Shrimp',
  낙지볶음: 'Stir-fried Octopus',
  멸치볶음: 'Stir-fried Anchovy',
  어묵볶음: 'Stir-fried Fish Cake',
  오징어볶음: 'Stir-fried Dried Squid',
  오징어채볶음: 'Stir-fried Dried Squid',
  주꾸미볶음: 'Stir-fried Small Octopus',
  해물볶음: 'Stir-fried Seafood',
  감자볶음: 'Stir-fried Potato',
  김치볶음: 'Stir-fried Kimchi',
  깻잎나물볶음: 'Stir-fried Sesame Leaf',
  느타리버섯볶음: 'Stir-fried Mushrooms',
  두부김치: 'Tofu Kimchi',
  머위나물볶음: 'Stir-fried Butterbur',
  양송이버섯볶음: 'Stir-fried Mushrooms',
  표고버섯볶음: 'Stir-fried Shiitake Mushrooms',
  고추잡채: 'Stir-fried Korean Chili Peppers and Pork',
  호박볶음: 'Stir-fried Pumpkin',
  돼지고기볶음: 'Stir-fried Pork',
  돼지껍데기볶음: 'Stir-fried Pig Skin',
  소세지볶음: 'Stir-fried Sausage',
  순대볶음: 'Stir-fried Korean Sausage',
  오리불고기: 'Duck Bulgogi',
  오삼불고기: 'Squid and Pork Belly Bulgogi',
  떡볶이: 'Tteokbokki',
  라볶이: 'Stir-fried Rice Cake with Ramen Noodles',
  마파두부: 'Mapa Tofu',
  가자미조림: 'Braised Sole',
  갈치조림: 'Braised Cutlassfish',
  고등어조림: 'Braised Mackerel',
  꽁치조림: 'Braised Saury',
  동태조림: 'Braised Frozen Pollack',
  북어조림: 'Braised Dried Pollack',
  조기조림: 'Braised Croaker',
  코다리조림: 'Braised Pollack',
  달걀장조림: 'Soy Sauce Braised Eggs',
  메추리알장조림: 'Soy Sauce Braised Quail Eggs',
  돼지고기메추리알장조림: 'Soy Sauce Braised Quail Eggs and Pork',
  소고기메추리알장조림: 'Soy Sauce Braised Quail Eggs and Beef',
  고추조림: 'Braised Chili Pepper',
  연근조림: 'Braised Lotus Root',
  우엉조림: 'Braised Burdock',
  알감자조림: 'Braised Potato',
  두부간장조림: 'Soy Sauce Braised Tofu',
  콩조림: 'Braised Bean',
  두부고추장조림: 'Red Pepper Paste Braised Tofu',
  땅콩조림: 'Braised Peanut',
  미꾸라지튀김: 'Deep-fried Mudfish',
  새우튀김: 'Deep-fried Shrimp',
  생선가스: 'Deep-fried Fish',
  쥐포튀김: 'Deep-fried Dried Filefish Fillet',
  오징어튀김: 'Deep-fried Squid',
  닭강정: 'Sweet and Sour Chicken',
  닭튀김: 'Fried Chicken',
  돈가스: 'Pork Cutlet',
  모래집튀김: 'Deep-fried Chicken Gizzard',
  양념치킨: 'Seasoned Chicken',
  치즈돈가스: 'Cheese Pork Cutlet',
  치킨가스: 'Chicken Cutlet',
  탕수육: 'Sweet and Sour Pork',
  깐풍기: 'Deep-fried Chicken in Hot Pepper Sauce',
  감자튀김: 'French Fries',
  고구마맛탕: 'Deep-fried Sugar Glazed Sweet Potato Wedges',
  고구마튀김: 'Deep-fried Sweet Potato',
  고추튀김: 'Deep-fried Chili Pepper',
  김말이튀김: 'Deep-fried Glass Noodles in Seaweed',
  채소튀김: 'Deep-fried Vegetables',
  노각무침: 'Seasoned Yellowish Overripe Cucumber',
  단무지무침: 'Seasoned Pickled Radish',
  달래나물무침: 'Seasoned Wild Chive',
  더덕무침: 'Seasoned Deodeok',
  도라시생채: 'Balloon Flower Root Salad',
  도토리묵: 'Acorn Jelly Salad',
  마늘쫑무침: 'Seasoned Garlic Stem',
  무생채: 'Seasoned Radish',
  부추무침: 'Seasoned Leek',
  오이생채: 'Cucumber Salad',
  파무침: 'Seasoned Green Onion',
  상추겉절이: 'Fresh Lettuce Kimchi',
  쑥갓나물무침: 'Seasoned Crown Daisy',
  청포묵무침: 'Seasoned Mug Bean Jelly',
  해파리냉채: 'Seasoned Jellyfish',
  가지나물: 'Seasoned Eggplants',
  고사리나물: 'Seasoned Bracken',
  도라지나물: 'Seasoned Bellflower Roots',
  무나물: 'Seasoned Radish',
  미나리나물: 'Seasoned Water Parsely',
  숙주나물: 'Seasoned Mung Bean Sprouts',
  시금치나물: 'Seasoned Spinach',
  취나물: 'Seasoned aster',
  콩나물: 'Bean Sprouts',
  고구마줄기나물: 'Seasoned Sweet Potato Stems',
  우거지나물무침: 'Seasoned Cabbage',
  골뱅이무침: 'Spicy Sea Snails Salad',
  김무침: 'Seasoned Seaweed',
  미역초무침: 'Seaweed with Vinegar Dressing',
  북어채무침: 'Seasoned Sliced Dried Pollack',
  회무침: 'Spicy Raw Fish Salad',
  쥐치채: 'Sliced Dried Filefish',
  파래무침: 'Seasoned Green Laver',
  홍어무침: 'Seasoned Skate',
  잡채: 'Japchae',
  탕평채: 'Mung Bean Jelly Salad',
  갓김치: 'Leaf Mustard Kimchi',
  고들빼기: 'Korean Lettuce Kimchi',
  깍두기: 'Diced Radish Kimchi',
  깻잎김치: 'Sesame Leaf Kimchi',
  나박김치: 'Water Kimchi',
  동치미: 'Radish Water Kimchi',
  배추겉절이: 'Fresh Kimchi',
  배추김치: 'Kimchi',
  백김치: 'White Kimchi',
  부추김치: 'Korean-Leek Kimchi',
  열무김치: 'Young Summer Radish Kimchi',
  열무얼갈이김치: 'Young Summer Radish and Winter-grown Cabbage Kimchi',
  오이소박이: 'Cucumber Kimchi',
  총각김치: 'Whole Radish Kimchi',
  파김치: 'Green Onion Kimchi',
  간장게장: 'Soy Sauce Marinated Crab',
  마늘쫑장아찌: 'Pickled Garlic Stem',
  고추장아찌: 'Pickled Chili Pepper',
  깻잎장아찌: 'Pickled Sesame Leaf',
  마늘장아찌: 'Pickled Garlic',
  무장아찌: 'Pickled Radish',
  양념게장: 'Spicy Marinated Crab',
  양파장아찌: 'Pickled Onion',
  오이지: 'Cucumbers Pickled in Salt',
  무피클: 'Pickled Radish',
  오이피클: 'Pickled Cucumber',
  단무지: 'Pickled Radish',
  오징어젓갈: 'Salted and Fermented Squid',
  명란젓: 'Salted and Pickled Pollack Roe',
  물회: 'Cold Raw Fish Soup',
  생선물회: 'Cold Raw Fish Soup',
  오징어물회: 'Cold Raw Squid Soup',
  광어회: 'Sliced Raw Flatfish',
  훈제연어: 'Smoked Salmon',
  육회: 'Beef Tartare',
  육사시미: 'Beef Tartare',
  가래떡: 'Rice Cake',
  경단: 'Sweet Rice Balls',
  꿀떡: 'Honey-filled Rice Cake',
  시루떡: 'Steamed Rice Cake',
  메밀전병: 'Buckwheat Crepe',
  찰떡: 'Glutinous Rice Cake',
  무지개떡: 'Rainbow Rice Cake',
  백설기: 'Snow White Rice Cake',
  송편: 'Half-moon Rice Cake',
  수수부꾸미: 'Millet Pancake',
  수수팥떡: 'Millet and Red Bean Rice Cake',
  쑥떡: 'Mugwort Rice Cake',
  약식: 'Sweet Rice with Nuts and Jujubes',
  인절미: 'Injeolmi Rice Cake',
  절편: 'Jeolpyeon Pounded Rice Cake',
  증편: 'Jeungpyeon Rice Cake',
  찹쌀떡: 'Glutinous Rice Cake',
  매작과: 'Maejakgwa',
  다식: 'Tea Confectionery',
  약과: 'Honey Cookie',
  유과: 'Deep-fried Sweet Rice Cake',
  산자: 'Sanja',
  깨강정: 'Sweet Sesame Puffs',
};

export default foodsMapKoToEn;
