# Unit test script for testing api database calls
# using httpie (https://httpie.io/)

echo "Testing create post"
echo ""
echo "http POST localhost:5000/api/post/create content=="deadbeef""
http POST localhost:5000/api/post/create content=="deadbeef" #| grep -v "successfully"
echo "--------------------------------------------------------------"
echo ""

echo "Testing retrieve post"
echo ""
echo "http POST localhost:5000/api/post/retrieve/deadbeef"
http POST localhost:5000/api/post/retrieve/deadbeef #| grep -v "exists"
echo "--------------------------------------------------------------"
echo ""

echo "Testing delete post"
echo ""
echo "http POST localhost:5000/api/post/delete content=="deadbeef" "
http POST localhost:5000/api/post/delete content=="deadbeef" #| grep -v "deleted"
echo "--------------------------------------------------------------"
echo ""
