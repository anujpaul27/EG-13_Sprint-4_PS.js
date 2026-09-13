/**
 * 01. Isomorphic Strings
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */  
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;

    const mapST = new Map();
    const mapTS = new Map();

    for (let i = 0; i < s.length; i++) {
        const a = s[i], b = t[i];

        if (mapST.has(a) && mapST.get(a) !== b) return false;
        if (mapTS.has(b) && mapTS.get(b) !== a) return false;

        mapST.set(a, b);
        mapTS.set(b, a);
    }

    return true;
};


/**
 * 02. Word Pattern
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.split(' ');
    if (pattern.length !== words.length) return false;

    const mapPW = new Map();
    const mapWP = new Map();

    for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i], w = words[i];

        if (mapPW.has(p) && mapPW.get(p) !== w) return false;
        if (mapWP.has(w) && mapWP.get(w) !== p) return false;

        mapPW.set(p, w);
        mapWP.set(w, p);
    }

    return true;
};


/**
 * 03. Find the Difference
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let code = 0;

    for (let i = 0; i < s.length; i++) {
        code -= s.charCodeAt(i);
    }
    for (let i = 0; i < t.length; i++) {
        code += t.charCodeAt(i);
    }

    return String.fromCharCode(code);
};


/**
 * 04. Reverse Linked List
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
};


/**
 * 05. Middle of the Linked List
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};


/**
 * 06. Product of Array Except Self
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};


/**
 * 07. Remove Nth Node From End of List
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = { next: head };
    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
};


/**
 * 08. Find First and Last Position of Element in Sorted Array
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const findBound = (isFirst) => {
        let lo = 0, hi = nums.length - 1;
        let result = -1;

        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);

            if (nums[mid] === target) {
                result = mid;
                if (isFirst) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return result;
    };

    return [findBound(true), findBound(false)];
};


/**
 * 09. Permutation in String
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        need[s1.charCodeAt(i) - base]++;
        window[s2.charCodeAt(i) - base]++;
    }

    const matches = () => {
        for (let i = 0; i < 26; i++) {
            if (need[i] !== window[i]) return false;
        }
        return true;
    };

    if (matches()) return true;

    for (let i = s1.length; i < s2.length; i++) {
        window[s2.charCodeAt(i) - base]++;
        window[s2.charCodeAt(i - s1.length) - base]--;

        if (matches()) return true;
    }

    return false;
};


/**
 * 10. Find All Anagrams in a String
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const result = [];
    if (p.length > s.length) return result;

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < p.length; i++) {
        need[p.charCodeAt(i) - base]++;
        window[s.charCodeAt(i) - base]++;
    }

    const matches = () => {
        for (let i = 0; i < 26; i++) {
            if (need[i] !== window[i]) return false;
        }
        return true;
    };

    if (matches()) result.push(0);

    for (let i = p.length; i < s.length; i++) {
        window[s.charCodeAt(i) - base]++;
        window[s.charCodeAt(i - p.length) - base]--;

        if (matches()) result.push(i - p.length + 1);
    }

    return result;
};
