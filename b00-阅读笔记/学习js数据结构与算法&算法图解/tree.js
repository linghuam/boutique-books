function removeNode(node, value) {
    if (node == null) return null;
    if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
    } else if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
    } else {
        //情况1：节点为叶节点（有零个子节点的节点）
        if(node.left == null && node.right == null) {
            node = null;
            return node;
        }
        //情况2：只有一个子节点的节点
        if (node.left == null) {
            node = node.right;
            return node;
        } else if(node.right == null) {
            node = node.left;
            return node;
        }
        //情况3：有两个子节点的节点
        // 先找到右边子树节点的最小值节点
        // 再用最小值节点的值更新当前节点的值
        // 最后删除右边子树最小值节点
        var findMinNode = function(node) {
            if (node) {
                while(node && node.left !== null) {
                    node = node.left;
                }
                return node;
            }
            return null;
        }
        var aux = findMinNode(node.right);
        node.value = aux.value;
        node.right = removeNode(node.right, aux.value);
        return node;
    }
}
var root = {
    value: 11,
    left: {
        value: 7,
        left: {
            value: 5,
            left: {
                value: 3,
                left: null,
                right: null
            },
            right: {
                value: 6,
                left: null,
                right: null
            }
        },
        right: {
            value: 9,
            left: {
                value: 8,
                left: null,
                right: null
            },
            right: {
                value: 10,
                left: null,
                right: null
            }
        }
    },
    right: {
        value: 15,
        left: {
            value: 13,
            left: {
                value: 12,
                left: null,
                right: null
            },
            right: {
                value: 14,
                left: null,
                right: null
            }
        },
        right: {
            value: 20,
            left: {
                value: 18,
                left: null,
                right: null
            },
            right: {
                value: 25,
                left: null,
                right: null
            }
        }
    }
};
removeNode(root, 15);
