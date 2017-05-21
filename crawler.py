import os
import requests
import re
import json
import io
from bs4 import BeautifulSoup

categories = {
    "water": "http://www.lottemart.com/category/categoryList.do?CategoryID=C001001700130001",
    "cleanser": "http://www.lottemart.com/category/categoryList.do?CategoryID=C001002400090002",
    "detergent": "http://www.lottemart.com/category/categoryList.do?CategoryID=C00100230001",
    "oralcare": "http://www.lottemart.com/category/categoryList.do?CategoryID=C00100230007",
	"tissue": "http://www.lottemart.com/category/categoryList.do?CategoryID=C00100230005",
    "mask": "http://www.lottemart.com/category/categoryList.do?CategoryID=C001002300080001"
}

detailUrlTemplate = "http://www.lottemart.com/iframe/ProductDesc.do?CategoryID=%(categoryID)s&ProductCD=%(productCD)s"

class Item(object):
    itemId = 0
    def __init__(self, thumbUrl, name, price, descUrls, productType):
        Item.itemId += 1
        self.id = Item.itemId
        self.thumbUrl = thumbUrl
        self.name = name
        self.price = price
        self.descUrls = descUrls
        self.productType = productType
        print(Item.itemId)

    def toDict(self):
        return dict(
                id=self.id,
                name=self.name,
                img=self.thumbUrl,
                descImgs=self.descUrls,
                price=self.price,
                count=1,
                checked=True)

def getSoup(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "html.parser")
    return soup

def loadRawItems():
    result = []
    for key, value in categories.items():
        categorySoup = getSoup(value)
        itemSoups = categorySoup.find_all("article", "product-article")
        for idx, itemSoup in enumerate(itemSoups):
            if idx == 20:
                break
            imgUrl = itemSoup.find("div", "wrap-thumb").find("img")["src"]
            infoSoup = itemSoup.find("div", "wrap-info")
            name = infoSoup.find("p", "prod-name").get_text().strip()
            priceText = infoSoup.find(
                    "span", "num-n").get_text().replace(",", "")
            price = int(priceText.strip())
            link = infoSoup.find("a")["onclick"]
            match = re.match(
                    r"goProductDetail\(\'(.*?)\', \'(.*?)\'.*\)",
                    link)
            productCD = match.group(2)
            categoryID = match.group(1)
            detailUrl = detailUrlTemplate % locals()
            detailSoup = getSoup(detailUrl)
            
            imgUrls = map(lambda x:x["src"], detailSoup.find_all("img"))
            item = Item(imgUrl, name, price, imgUrls, key)
            result.append(item)
    return result

def download_image(url, dirpath):
    r = requests.get(url, stream=True)
    path = os.path.join(dirpath, url.split("/")[-1])
    with open(path, "wb") as f:
        for chunk in r:
            f.write(chunk)
    return path

def download_images(items):
    dirname = "image"
    for item in items:
        item.thumbUrl = download_image(item.thumbUrl, dirname)
        paths = []
        for desc in item.descUrls:
            paths.append(download_image(desc, dirname))
        item.descUrls= paths
    return items

def savejson(items, path):
    with open(path, "w") as f:
        json.dump(list(
            map(lambda x: x.toDict(), items)), f,
            ensure_ascii=False, indent=4)

def main():
    items = loadRawItems()
    items = download_images(items)
    savejson(items, "itemList.json")

if __name__ == "__main__":
    main()
