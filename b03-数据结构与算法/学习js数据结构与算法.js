function traveseTree(root, callback) {
    var pCur = root, pLast = null, stack = [];
    if (root == null) return;
    // 先把pCur移到左子树最下边
    while(pCur) {
        stack.push(pCur);
        pCur = pCur.left;
    }
    while(stack.length) {
        pCur = stack.pop();
        //一个根节点被访问的前提是：无右子树或右子树已被访问过
        if (pCur.right == null || pCur.right == pLast) {
            callback(pCur);
            pLast = pCur;
        }
        /*这里的else语句可换成带条件的else if:
        else if (pCur->lchild == pLastVisit)//若左子树刚被访问过，则需先进入右子树(根节点需再次入栈)
        因为：上面的条件没通过就一定是下面的条件满足。仔细想想！
        */
        else {
            // 根节点再次入栈
            stack.push(pCur);
            // 进入右子树，且可肯定右子树一定不为空
            pCur = pCur.right;
            while(pCur) {
                stack.push(pCur);
                pCur = pCur.left;
            }
        }
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
traveseTree(root, e => {e && e.value && console.log(e.value);});