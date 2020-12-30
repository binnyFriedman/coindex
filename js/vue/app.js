webpackJsonp([1], {
    0: function (t, s) {
    }, "9z7c": function (t, s) {
    }, NHnr: function (t, s, e) {
        "use strict";
        Object.defineProperty(s, "__esModule", {value: !0});
        var a = e("7+uW"), i = {
            name: "HelloWorld", data: function () {
                return {
                    filterName: "mktcap",
                    reverse: -1,
                    countSize: 100,
                    hasMore: !0,
                    preloader: !1,
                    isPopupOpen: !1,
                    isPopupOpenChanger: !1,
                    currAdded: "",
                    startSumm: "",
                    isPopupDelete: !1,
                    currentDelete: "",
                    currentByeShort: "",
                    currentByeLong: "",
                    isPopupOpenBye: !1
                }
            }, created: function () {
                this.$store.dispatch("getUserDataToTable")
            }, computed: {
                message: function () {
                    return "" != this.$store.state.searchParams && (this.hasMore = !1, this.countSize = this.$store.state.info.length), this.$store.state.searchParams
                }, isCabinet: function () {
                    return this.$store.state.cabinetState
                }, transslatesNames: function () {
                    return this.$store.state.transslates
                }, sortedArray: function () {
                    return this.$store.state.info
                }, userLoginedStatus: function () {
                    return this.$store.state.loginedStatus
                }, steakNamesInside: function () {
                    return this.$store.state.steakNamesInside
                }, steakListCabinetItems: function () {
                    return this.$store.state.cabinetItems
                }, steakCounts: function () {
                    return this.$store.state.cabinetCounts
                }, fullSumm: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, dayBeforeLast: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += (1 + e.cap24hrChange) * e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, summCoins: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += 1 * steakCounts[t.steakListCabinetItems.indexOf(e.short)])
                    }), s
                }
            }, watch: {
                list: function () {
                    return this.$store.state.info
                }
            }, methods: {
                sortByItem: function (t) {
                    this.filterName == t ? this.reverse *= -1 : (this.filterName = t, this.reverse = 1)
                }, loadMore: function () {
                    var t = this;
                    this.preloader = !0, setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize += 100, this.countSize > this.sortedArray.length && (this.hasMore = !1)
                }, loadAll: function () {
                    var t = this;
                    setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize = this.sortedArray.length, this.hasMore = !1
                }, removeCurrentItemToCab: function (t) {
                    this.$store.dispatch("removeItemFromCab", t)
                }, addCurrentItemToCab: function (t) {
                    this.isPopupOpen = !0, this.currAdded = t
                }, closePop: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, closePopChanger: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, addToWachers: function (t) {
                    var s = this;
                    0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm)) || (this.$store.dispatch("addItemToCab", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpen = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1)
                }, changeSumm: function (t, s) {
                    this.isPopupOpenChanger = !0, this.startSumm = this.steakCounts[s], this.currAdded = t
                }, changeWacher: function (t) {
                    var s = this;
                    console.log(this.startSumm), this.$store.dispatch("cangeCabItem", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpenChanger = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1
                }, closePopDelete: function () {
                    this.isPopupDelete = !1
                }, openPopupDelete: function (t) {
                    this.isPopupDelete = !0, this.currentDelete = t
                }, openPopupBye: function (t, s) {
                    this.isPopupOpenBye = !0, this.currentByeLong = s, this.currentByeShort = t
                }, closePopBye: function () {
                    this.isPopupOpenBye = !1, this.currentByeLong = "", this.currentByeShort = ""
                }
            }
        }, n = {
            render: function () {
                var t = this, s = t.$createElement, e = t._self._c || s;
                return e("div", {staticClass: "table-wrap"}, [e("div", {staticClass: "mbox"}, [t.isCabinet ? t._e() : e("div", {staticClass: "convert-table"}, [e("div", {staticClass: "contein-list"}, [e("div", {staticClass: "table-row title-row"}, [e("div", {staticClass: "content"}, [t._m(0), t._v(" "), t._m(1), t._v(" "), t._m(2), t._v(" "), t._m(3), t._v(" "), e("div", {staticClass: "price"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "price" == this.filterName,
                        down: "price" == this.filterName && 1 == this.reverse,
                        up: "price" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("price")
                        }
                    }
                }, [t._v(" מחיר ")])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "mktcap" == this.filterName,
                        down: "mktcap" == this.filterName && 1 == this.reverse,
                        up: "mktcap" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("mktcap")
                        }
                    }
                }, [t._v(" שווי שוק  ")])]), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "usdVolume" == this.filterName,
                        down: "usdVolume" == this.filterName && 1 == this.reverse,
                        up: "usdVolume" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("usdVolume")
                        }
                    }
                }, [t._v(" מחזור 24ש ")])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "cap24hrChange" == this.filterName,
                        down: "cap24hrChange" == this.filterName && 1 == this.reverse,
                        up: "cap24hrChange" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("cap24hrChange")
                        }
                    }
                }, [t._v(" שינוי 24ש ")])])])]), t._v(" "), t._l(t.orderBy(t.limitBy(t.filterBy(t.sortedArray, this.message, "long", "short", "trans"), this.countSize), this.filterName, this.reverse), function (s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "table-row",
                        class: s.update
                    }, [e("div", {staticClass: "hidder"}, [t.userLoginedStatus ? e("div", {staticClass: "add-to-steak"}, [-1 == t.steakNamesInside.indexOf(s.short) || 0 == t.steakCounts[t.steakListCabinetItems.indexOf(s.short)] ? e("button", {
                        staticClass: "but-list not checker",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.addCurrentItemToCab(s.short)
                            }
                        }
                    }, [e("span")]) : e("button", {
                        staticClass: "but-list in checker",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.openPopupDelete(s.short)
                            }
                        }
                    }, [e("span")])]) : t._e(), t._v(" "), t.userLoginedStatus ? t._e() : e("div", {staticClass: "add-to-steak"}, [t._m(4, !0)])]), t._v(" "), e("a", {
                        staticClass: "content",
                        attrs: {href: "/" + s.short.toLowerCase()}
                    }, [e("div", {staticClass: "counter"}, [e("div", {staticClass: "name"}, [t._v(" " + t._s(s.sortNum) + " ")])]), t._v(" "), e("div", {staticClass: "long"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "image con-img",
                        class: "sprite-" + s.short
                    }), t._v(" "), e("div", {staticClass: "apilong"}, [t._v(" " + t._s(s.long) + "  ")])])]), t._v(" "), e("div", {staticClass: "short"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apishort"}, [t._v("\n                                        " + t._s(s.short) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "translate"}, [e("div", {staticClass: "name"}, [t._v("\n                                    " + t._s(s.trans) + " \n                                ")])]), t._v(" "), e("div", {staticClass: "price"}, [e("div", {staticClass: "name"}, [s.price >= 1 && s.price < 10 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 4, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : s.price < 1 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 5, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 2, {thousandsSeparator: ". "}), 10)) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apimktcap"}, [t._v("\n                                        " + t._s(t._f("currency")(s.mktcap, "$", 0, {thousandsSeparator: ". "})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apiusdVolume"}, [t._v("\n                                        " + t._s(t._f("currency")(s.usdVolume, "$", 0, {thousandsSeparator: "."})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "apicap24hrChange",
                        class: {down: s.cap24hrChange < 0, up: s.cap24hrChange > 0}
                    }, [s.cap24hrChange > 0 ? e("span", [t._v("+")]) : t._e(), t._v("\n                                        " + t._s(s.cap24hrChange) + "\n                                        "), e("span", [t._v("%")])])])])])])
                }), t._v(" "), t.filterBy(t.sortedArray, this.message, "long", "short", "trans").length < 1 ? e("div", {staticClass: "empty-list table-row"}, [t._m(5)]) : t._e(), t._v(" "), t.preloader ? e("div", {staticClass: "preloader-line"}, [e("div", {staticClass: "con"}, [e("svg", {
                    attrs: {
                        width: "50",
                        height: "50",
                        viewBox: "0 0 38 38",
                        xmlns: "http://www.w3.org/2000/svg"
                    }
                }, [e("defs", [e("linearGradient", {
                    attrs: {
                        x1: "8.042%",
                        y1: "0%",
                        x2: "65.682%",
                        y2: "23.865%",
                        id: "a"
                    }
                }, [e("stop", {
                    attrs: {
                        "stop-color": "#000",
                        "stop-opacity": "0",
                        offset: "0%"
                    }
                }), t._v(" "), e("stop", {
                    attrs: {
                        "stop-color": "#000",
                        "stop-opacity": ".631",
                        offset: "63.146%"
                    }
                }), t._v(" "), e("stop", {
                    attrs: {
                        "stop-color": "#000",
                        offset: "100%"
                    }
                })], 1)], 1), t._v(" "), e("g", {
                    attrs: {
                        fill: "none",
                        "fill-rule": "evenodd"
                    }
                }, [e("g", {attrs: {transform: "translate(1 1)"}}, [e("path", {
                    attrs: {
                        d: "M36 18c0-9.94-8.06-18-18-18",
                        id: "Oval-2",
                        stroke: "url(#a)",
                        "stroke-width": "2"
                    }
                }, [e("animateTransform", {
                    attrs: {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 18 18",
                        to: "360 18 18",
                        dur: "0.9s",
                        repeatCount: "indefinite"
                    }
                })], 1), t._v(" "), e("circle", {
                    attrs: {
                        fill: "#fff",
                        cx: "36",
                        cy: "18",
                        r: "1"
                    }
                }, [e("animateTransform", {
                    attrs: {
                        attributeName: "transform",
                        type: "rotate",
                        from: "0 18 18",
                        to: "360 18 18",
                        dur: "0.9s",
                        repeatCount: "indefinite"
                    }
                })], 1)])])])])]) : t._e()], 2)]), t._v(" "), t.isCabinet ? t._e() : e("div", {staticClass: "load-more"}, [this.hasMore ? e("div", {
                    staticClass: "butt",
                    on: {
                        click: function (s) {
                            t.loadMore()
                        }
                    }
                }, [e("span", [t._v("הצג 100 נוספים")])]) : t._e()]), t._v(" "), t.isCabinet ? e("div", {staticClass: "convert-table"}, [e("div", {staticClass: "contein-list"}, [e("div", {staticClass: "table-row title-row"}, [e("div", {staticClass: "content"}, [t._m(6), t._v(" "), t._m(7), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "mktcap" == this.filterName,
                        down: "mktcap" == this.filterName && 1 == this.reverse,
                        up: "mktcap" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("mktcap")
                        }
                    }
                }, [t._v(" שווי אחזקה  ")])]), t._v(" "), e("div", {staticClass: "price"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "price" == this.filterName,
                        down: "price" == this.filterName && 1 == this.reverse,
                        up: "price" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("price")
                        }
                    }
                }, [t._v(" מחיר ")])]), t._v(" "), t._m(8), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "usdVolume" == this.filterName,
                        down: "usdVolume" == this.filterName && 1 == this.reverse,
                        up: "usdVolume" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("usdVolume")
                        }
                    }
                }, [t._v("  אחוז שינוי ")])]), t._v(" "), t._m(9), t._v(" "), t._m(10)])]), t._v(" "), t._l(t.orderBy(t.filterBy(t.sortedArray, this.message, "long", "short"), this.filterName, this.reverse), function (s, a) {
                    return -1 != t.steakListCabinetItems.indexOf(s.short) && t.steakCounts[t.steakListCabinetItems.indexOf(s.short)] > 0 ? e("div", {
                        key: a,
                        staticClass: "table-row",
                        class: s.update
                    }, [e("div", {staticClass: "content"}, [e("div", {staticClass: "counter"}, [e("div", {staticClass: "name"}, [t._v(" " + t._s(s.sortNum) + " ")])]), t._v(" "), e("div", {staticClass: "long"}, [e("a", {
                        staticClass: "name",
                        attrs: {href: "/" + s.short.toLowerCase()}
                    }, [e("div", {
                        staticClass: "image con-img",
                        class: "sprite-" + s.short
                    }), t._v(" "), e("div", {staticClass: "apilong"}, [t._v(" " + t._s(s.long) + "  ")])]), t._v(" "), e("div", {staticClass: "hidden-parts"}, [e("div", {staticClass: "pricer"}, [s.price >= 1 && s.price < 10 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                            " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 4, {thousandsSeparator: ". "}), 8)) + "\n                                        ")]) : s.price < 1 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                            " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 5, {thousandsSeparator: ". "}), 8)) + "\n                                        ")]) : e("div", {staticClass: "apiprice"}, [t._v("\n                                            " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 2, {thousandsSeparator: ". "}), 10)) + "\n                                        ")])])])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apimktcap"}, [t._v("\n                                        \n                                        " + t._s(t._f("currency")(t.steakCounts[t.steakListCabinetItems.indexOf(s.short)] * s.price, "$", 3, {thousandsSeparator: "."})) + "\n                                    ")])]), t._v(" "), e("div", {staticClass: "hidden-parts"}, [e("div", {staticClass: "percentr"}, [e("div", {
                        staticClass: "apicap24hrChange",
                        class: {down: s.cap24hrChange < 0, up: s.cap24hrChange > 0}
                    }, [s.cap24hrChange > 0 ? e("span", [t._v("+")]) : t._e(), t._v("\n                                            " + t._s(s.cap24hrChange) + "\n                                            "), e("span", [t._v("%")])])])])]), t._v(" "), e("div", {staticClass: "price"}, [e("div", {staticClass: "name"}, [s.price >= 1 && s.price < 10 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 4, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : s.price < 1 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 5, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 2, {thousandsSeparator: ". "}), 10)) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "count"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "load-count"}, [t._v(t._s(t.steakCounts[t.steakListCabinetItems.indexOf(s.short)]))]), t._v(" "), e("div", {staticClass: "changer"}, [e("button", {
                        on: {
                            click: function (e) {
                                t.changeSumm(s.short, t.steakListCabinetItems.indexOf(s.short))
                            }
                        }
                    }, [e("span", [t._v("\n                                            עריכה   \n                                            ")])])])])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "apicap24hrChange",
                        class: {down: s.cap24hrChange < 0, up: s.cap24hrChange > 0}
                    }, [s.cap24hrChange > 0 ? e("span", [t._v("+")]) : t._e(), t._v("\n                                        " + t._s(s.cap24hrChange) + "\n                                        "), e("span", [t._v("%")])])])]), t._v(" "), e("div", {staticClass: "byer"}, ["BTC" == s.short ? e("div", {staticClass: "name"}, [e("a", {
                        attrs: {
                            href: "https://www.coinmama.com/?ref=shay",
                            target: "_blank"
                        }
                    }, [t._v(" קנה " + t._s(s.long) + "  ")])]) : "ETH" == s.short ? e("div", {staticClass: "name"}, [e("a", {
                        attrs: {
                            href: "https://www.coinmama.com/?ref=shay",
                            target: "_blank"
                        }
                    }, [t._v(" קנה " + t._s(s.long) + "  ")])]) : e("div", {staticClass: "name"}, [e("a", {
                        on: {
                            click: function (e) {
                                t.openPopupBye(s.short, s.long)
                            }
                        }
                    }, [t._v(" קנה " + t._s(s.long) + "  ")])])]), t._v(" "), e("div", {staticClass: "remove"}, [e("div", {
                        staticClass: "name",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.openPopupDelete(s.short)
                            }
                        }
                    })])])]) : t._e()
                }), t._v(" "), t.filterBy(t.sortedArray, this.message, "long", "short", "trans").length < 1 ? e("div", {staticClass: "empty-list table-row"}, [t._m(11)]) : t._e()], 2)]) : t._e()]), t._v(" "), t.isPopupOpen ? e("div", {staticClass: "hidden-pop-for-add "}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "popup-add"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopChanger()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {
                    staticClass: "cont",
                    class: {errorForm: 0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm))}
                }, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("  הזן כמות מניות "), e("span", [t._v(" " + t._s(t.currAdded) + " ")])])]), t._v(" "), e("div", {staticClass: "form-part"}, [e("div", {staticClass: "inputer"}, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.number",
                        value: t.startSumm,
                        expression: "startSumm",
                        modifiers: {number: !0}
                    }], attrs: {type: "text", name: "add"}, domProps: {value: t.startSumm}, on: {
                        input: function (s) {
                            s.target.composing || (t.startSumm = t._n(s.target.value))
                        }, blur: function (s) {
                            t.$forceUpdate()
                        }
                    }
                })]), t._v(" "), e("div", {staticClass: "submiter"}, [e("button", {
                    staticClass: "butt type2",
                    on: {
                        click: function (s) {
                            t.addToWachers(t.currAdded)
                        }
                    }
                }, [e("span", [t._v("שמור")])])])])])])])]) : t._e(), t._v(" "), t.isPopupOpenChanger ? e("div", {staticClass: "hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "popup-add"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopChanger()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("  הזן כמות מניות "), e("span", [t._v(" " + t._s(t.currAdded) + " ")])])]), t._v(" "), e("div", {staticClass: "form-part"}, [e("div", {staticClass: "inputer"}, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.number",
                        value: t.startSumm,
                        expression: "startSumm",
                        modifiers: {number: !0}
                    }], attrs: {type: "text", name: "add"}, domProps: {value: t.startSumm}, on: {
                        input: function (s) {
                            s.target.composing || (t.startSumm = t._n(s.target.value))
                        }, blur: function (s) {
                            t.$forceUpdate()
                        }
                    }
                })]), t._v(" "), e("div", {staticClass: "submiter"}, [e("button", {
                    staticClass: "butt type2",
                    on: {
                        click: function (s) {
                            t.changeWacher(t.currAdded)
                        }
                    }
                }, [e("span", [t._v("שמור")])])])])])])])]) : t._e(), t._v(" "), t.isPopupDelete ? e("div", {staticClass: "popup hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "pop-bye"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopDelete()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("האם אתה בטוח שאתה רוצה להסיר " + t._s(t.currentDelete) + " ")])]), t._v(" "), e("div", {staticClass: "buttons-row"}, [e("a", {
                    staticClass: "butt type2",
                    attrs: {href: "#"},
                    on: {
                        click: function (s) {
                            t.removeCurrentItemToCab(t.currentDelete)
                        }
                    }
                }, [e("span", [t._v(" כן ")])]), t._v(" "), e("a", {
                    staticClass: "butt type3",
                    attrs: {href: ""},
                    on: {
                        click: function (s) {
                            t.closePopDelete()
                        }
                    }
                }, [e("span", [t._v(" לא ")])])])])])])]) : t._e(), t._v(" "), t.isPopupOpenBye ? e("div", {staticClass: "hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "pop-bye"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopBye()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("\n                                    עליך להחזיק ארנק ביטקויין, על מנת שתוכל לקנות מטבע מסוג " + t._s(t.currentByeLong) + "\n                                האם להסיר את מטבע\n                            ")])]), t._v(" "), e("div", {staticClass: "buttons-row"}, [e("a", {
                    staticClass: "butt type2",
                    attrs: {href: "https://changelly.com/?ref_id=f9f7373bf362", target: "_blank"}
                }, [e("span", [t._v("   להמרת ביטקויין ל " + t._s(t.currentByeLong) + " ")])]), t._v(" "), t._m(12)])])])])]) : t._e()])
            }, staticRenderFns: [function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "counter"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" # ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "long"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" שם ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "short"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" סימול ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "translate"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" עברית ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("a", {
                    staticClass: "checker but-list not",
                    attrs: {"data-fancybox": "", "data-src": "#popup-login", href: "javascript:;"}
                }, [s("span")])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "content"}, [s("div", {staticClass: "contein-empty"}, [this._v("\n                                בטעינה\n                            ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "counter "}, [s("div", {staticClass: "name no-sorter"}, [this._v(" # ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "long"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" שם מטבע ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "count"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" כמות ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "byer"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" קנה ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "remove"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" מחק ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "content"}, [s("div", {staticClass: "contein-empty"}, [this._v("\n                                בטעינה\n                            ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("a", {
                    staticClass: "butt type3",
                    attrs: {href: "https://www.coinmama.com/?ref=shay", target: "_blank"}
                }, [s("span", [this._v("  להמרת ש״ח לביטקויין  ")])])
            }]
        };
        var r = {
            name: "App", components: {
                HelloWorld: e("VU/8")(i, n, !1, function (t) {
                    e("sqmL")
                }, null, null).exports
            }
        }, o = {
            render: function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {attrs: {id: "app"}}, [s("HelloWorld")], 1)
            }, staticRenderFns: []
        };
        var c = e("VU/8")(r, o, !1, function (t) {
            e("bU5q")
        }, null, null).exports, u = {
            name: "Header", data: function () {
                return {
                    filterName: "mktcap",
                    reverse: -1,
                    countSize: 100,
                    hasMore: !0,
                    preloader: !1,
                    isPopupOpen: !1,
                    isPopupOpenChanger: !1,
                    currAdded: "",
                    startSumm: "",
                    isPopupDelete: !1,
                    currentDelete: "",
                    currentByeShort: "",
                    currentByeLong: "",
                    isPopupOpenBye: !1
                }
            }, created: function () {
                this.$store.dispatch("getUserDataToTable")
            }, computed: {
                message: function () {
                    return "" != this.$store.state.searchParams && (this.hasMore = !1, this.countSize = this.$store.state.info.length), this.$store.state.searchParams
                }, isCabinet: function () {
                    return !0
                }, transslatesNames: function () {
                    return this.$store.state.transslates
                }, sortedArray: function () {
                    return this.$store.state.info
                }, userLoginedStatus: function () {
                    return this.$store.state.loginedStatus
                }, steakNamesInside: function () {
                    return this.$store.state.steakNamesInside
                }, steakListCabinetItems: function () {
                    return this.$store.state.cabinetItems
                }, steakCounts: function () {
                    return this.$store.state.cabinetCounts
                }, fullSumm: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, dayBeforeLast: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += (1 + e.cap24hrChange) * e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, summCoins: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += 1 * steakCounts[t.steakListCabinetItems.indexOf(e.short)])
                    }), s
                }
            }, watch: {
                list: function () {
                    return this.$store.state.info
                }
            }, methods: {
                sortByItem: function (t) {
                    this.filterName == t ? this.reverse *= -1 : (this.filterName = t, this.reverse = 1)
                }, loadMore: function () {
                    var t = this;
                    this.preloader = !0, setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize += 100, this.countSize > this.sortedArray.length && (this.hasMore = !1)
                }, loadAll: function () {
                    var t = this;
                    setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize = this.sortedArray.length, this.hasMore = !1
                }, removeCurrentItemToCab: function (t) {
                    this.$store.dispatch("removeItemFromCab", t)
                }, addCurrentItemToCab: function (t) {
                    this.isPopupOpen = !0, this.currAdded = t
                }, closePop: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, closePopChanger: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, addToWachers: function (t) {
                    var s = this;
                    0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm)) || (this.$store.dispatch("addItemToCab", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpen = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1)
                }, changeSumm: function (t, s) {
                    this.isPopupOpenChanger = !0, this.startSumm = this.steakCounts[s], this.currAdded = t
                }, changeWacher: function (t) {
                    var s = this;
                    console.log(this.startSumm), this.$store.dispatch("cangeCabItem", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpenChanger = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1
                }, closePopDelete: function () {
                    this.isPopupDelete = !1
                }, openPopupDelete: function (t) {
                    this.isPopupDelete = !0, this.currentDelete = t
                }, openPopupBye: function (t, s) {
                    this.isPopupOpenBye = !0, this.currentByeLong = s, this.currentByeShort = t
                }, closePopBye: function () {
                    this.isPopupOpenBye = !1, this.currentByeLong = "", this.currentByeShort = ""
                }
            }
        }, l = {
            render: function () {
                var t = this, s = t.$createElement, e = t._self._c || s;
                return e("div", {staticClass: "stats"}, [e("div", {staticClass: "summ"}, [t._v(" " + t._s(t._f("currency")(t.fullSumm, "$", 1, {thousandsSeparator: ". "})) + " ")]), t._v(" "), e("div", {
                    staticClass: "percent",
                    class: {down: t.dayBeforeLast / t.fullSumm < 0, up: t.dayBeforeLast / t.fullSumm > 0}
                }, [t._v("(\n        "), t.dayBeforeLast / t.fullSumm > 0 ? e("span", [t._v("+")]) : t._e(), t._v("    \n        " + t._s(t._f("currency")(t.dayBeforeLast / t.fullSumm, "", 2, {thousandsSeparator: ". "})) + " %\n    )\n    ")])])
            }, staticRenderFns: []
        };
        var p = {
            name: "Head", components: {
                Header: e("VU/8")(u, l, !1, function (t) {
                    e("S9T8")
                }, null, null).exports
            }
        }, d = {
            render: function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {attrs: {id: "header"}}, [s("Header")], 1)
            }, staticRenderFns: []
        };
        var h = e("VU/8")(p, d, !1, function (t) {
            e("xna1")
        }, null, null).exports, m = {
            name: "HeadSmall", data: function () {
                return {
                    filterName: "mktcap",
                    reverse: -1,
                    countSize: 100,
                    hasMore: !0,
                    preloader: !1,
                    isPopupOpen: !1,
                    isPopupOpenChanger: !1,
                    currAdded: "",
                    startSumm: "",
                    isPopupDelete: !1,
                    currentDelete: "",
                    currentByeShort: "",
                    currentByeLong: "",
                    isPopupOpenBye: !1
                }
            }, created: function () {
                this.$store.dispatch("getUserDataToTable")
            }, computed: {
                message: function () {
                    return "" != this.$store.state.searchParams && (this.hasMore = !1, this.countSize = this.$store.state.info.length), this.$store.state.searchParams
                }, isCabinet: function () {
                    return !0
                }, transslatesNames: function () {
                    return this.$store.state.transslates
                }, sortedArray: function () {
                    return this.$store.state.info
                }, userLoginedStatus: function () {
                    return this.$store.state.loginedStatus
                }, steakNamesInside: function () {
                    return this.$store.state.steakNamesInside
                }, steakListCabinetItems: function () {
                    return this.$store.state.cabinetItems
                }, steakCounts: function () {
                    return this.$store.state.cabinetCounts
                }, fullSumm: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, dayBeforeLast: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += (1 + e.cap24hrChange) * e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, summCoins: function () {
                    var t = this, s = 0;
                    return this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += 1 * steakCounts[t.steakListCabinetItems.indexOf(e.short)])
                    }), s
                }
            }, watch: {
                list: function () {
                    return this.$store.state.info
                }
            }, methods: {
                sortByItem: function (t) {
                    this.filterName == t ? this.reverse *= -1 : (this.filterName = t, this.reverse = 1)
                }, loadMore: function () {
                    var t = this;
                    this.preloader = !0, setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize += 100, this.countSize > this.sortedArray.length && (this.hasMore = !1)
                }, loadAll: function () {
                    var t = this;
                    setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize = this.sortedArray.length, this.hasMore = !1
                }, removeCurrentItemToCab: function (t) {
                    this.$store.dispatch("removeItemFromCab", t)
                }, addCurrentItemToCab: function (t) {
                    this.isPopupOpen = !0, this.currAdded = t
                }, closePop: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, closePopChanger: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, addToWachers: function (t) {
                    var s = this;
                    0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm)) || (this.$store.dispatch("addItemToCab", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpen = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1)
                }, changeSumm: function (t, s) {
                    this.isPopupOpenChanger = !0, this.startSumm = this.steakCounts[s], this.currAdded = t
                }, changeWacher: function (t) {
                    var s = this;
                    console.log(this.startSumm), this.$store.dispatch("cangeCabItem", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpenChanger = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1
                }, closePopDelete: function () {
                    this.isPopupDelete = !1
                }, openPopupDelete: function (t) {
                    this.isPopupDelete = !0, this.currentDelete = t
                }, openPopupBye: function (t, s) {
                    this.isPopupOpenBye = !0, this.currentByeLong = s, this.currentByeShort = t
                }, closePopBye: function () {
                    this.isPopupOpenBye = !1, this.currentByeLong = "", this.currentByeShort = ""
                }
            }
        }, v = {
            render: function () {
                var t = this, s = t.$createElement, e = t._self._c || s;
                return e("div", {
                    staticClass: "percenter",
                    class: {down: t.dayBeforeLast / t.fullSumm < 0, up: t.dayBeforeLast / t.fullSumm > 0}
                }, [t.dayBeforeLast / t.fullSumm > 0 ? e("span", [t._v("+")]) : t._e(), t._v("    \n    " + t._s(t._f("currency")(t.dayBeforeLast / t.fullSumm, "", 2, {thousandsSeparator: ". "})) + " %\n            \n\n")])
            }, staticRenderFns: []
        };
        var f = {
            name: "HeadS", components: {
                HeadSmall: e("VU/8")(m, v, !1, function (t) {
                    e("qNIY")
                }, null, null).exports
            }
        }, C = {
            render: function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {attrs: {id: "head"}}, [s("HeadSmall")], 1)
            }, staticRenderFns: []
        };
        var _ = e("VU/8")(f, C, !1, function (t) {
            e("x0Z3")
        }, null, null).exports, g = {
            name: "Popup", data: function () {
                return {
                    message: "",
                    filterName: "mktcap",
                    reverse: -1,
                    countSize: 100,
                    hasMore: !0,
                    preloader: !1,
                    isPopupOpen: !1,
                    isPopupOpenChanger: !1,
                    currAdded: "",
                    startSumm: "",
                    isPopupDelete: !1,
                    currentDelete: "",
                    currentByeShort: "",
                    currentByeLong: "",
                    isPopupOpenBye: !1
                }
            }, created: function () {
                this.$store.dispatch("getUserDataToTable")
            }, computed: {
                isCabinet: function () {
                    return this.$store.state.cabinetState
                }, transslatesNames: function () {
                    return this.$store.state.transslates
                }, sortedArray: function () {
                    return this.$store.state.info
                }, userLoginedStatus: function () {
                    return this.$store.state.loginedStatus
                }, steakNamesInside: function () {
                    return this.$store.state.steakNamesInside
                }, steakListCabinetItems: function () {
                    return this.$store.state.cabinetItems
                }, steakCounts: function () {
                    return this.$store.state.cabinetCounts
                }, fullSumm: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, dayBeforeLast: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += (1 + e.cap24hrChange) * e.price * t.$store.state.cabinetCounts[t.$store.state.cabinetItems.indexOf(e.short)])
                    }), s
                }, summCoins: function () {
                    var t = this, s = 0;
                    return this.$store.state.cabinetState && this.$store.state.info.forEach(function (e) {
                        -1 != t.$store.state.cabinetItems.indexOf(e.short) && (s += 1 * steakCounts[t.steakListCabinetItems.indexOf(e.short)])
                    }), s
                }
            }, watch: {
                list: function () {
                    return this.$store.state.info
                }
            }, methods: {
                sortByItem: function (t) {
                    this.filterName == t ? this.reverse *= -1 : (this.filterName = t, this.reverse = 1)
                }, loadMore: function () {
                    var t = this;
                    this.preloader = !0, setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize += 100, this.countSize > this.sortedArray.length && (this.hasMore = !1)
                }, loadAll: function () {
                    var t = this;
                    setTimeout(function () {
                        t.preloader = !1
                    }, 1e3), this.countSize = this.sortedArray.length, this.hasMore = !1
                }, removeCurrentItemToCab: function (t) {
                    this.$store.dispatch("removeItemFromCab", t)
                }, addCurrentItemToCab: function (t) {
                    this.isPopupOpen = !0, this.currAdded = t
                }, closePop: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, closePopChanger: function () {
                    this.isPopupOpen = !1, this.isPopupOpenChanger = !1, this.startSumm = 0
                }, addToWachers: function (t) {
                    var s = this;
                    0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm)) || (this.$store.dispatch("addItemToCab", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpen = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1)
                }, changeSumm: function (t, s) {
                    this.isPopupOpenChanger = !0, this.startSumm = this.steakCounts[s], this.currAdded = t
                }, changeWacher: function (t) {
                    var s = this;
                    console.log(this.startSumm), this.$store.dispatch("cangeCabItem", [this.currAdded, this.startSumm, t]).then(function () {
                        s.isPopupOpenChanger = !1, s.startSumm = 0
                    }), this.isPopupOpen = !1
                }, closePopDelete: function () {
                    this.isPopupDelete = !1
                }, openPopupDelete: function (t) {
                    this.isPopupDelete = !0, this.currentDelete = t
                }, openPopupBye: function (t, s) {
                    this.isPopupOpenBye = !0, this.currentByeLong = s, this.currentByeShort = t
                }, closePopBye: function () {
                    this.isPopupOpenBye = !1, this.currentByeLong = "", this.currentByeShort = ""
                }
            }
        }, b = {
            render: function () {
                var t = this, s = t.$createElement, e = t._self._c || s;
                return e("div", {staticClass: "table-wrap"}, [e("div", {staticClass: "mbox"}, [e("div", {staticClass: "search-row"}, [e("div", {staticClass: "siders"}, [e("div", {staticClass: "name"}, [t._v("הוספת מטבעות")]), t._v(" "), e("div", {staticClass: "search-part"}, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.message,
                        expression: "message"
                    }], attrs: {type: "text"}, domProps: {value: t.message}, on: {
                        input: function (s) {
                            s.target.composing || (t.message = s.target.value)
                        }
                    }
                })])])]), t._v(" "), e("div", {staticClass: "convert-table"}, [e("div", {staticClass: "contein-list"}, [e("div", {staticClass: "table-row title-row"}, [e("div", {staticClass: "content"}, [t._m(0), t._v(" "), t._m(1), t._v(" "), t._m(2), t._v(" "), t._m(3), t._v(" "), e("div", {staticClass: "price"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "price" == this.filterName,
                        down: "price" == this.filterName && 1 == this.reverse,
                        up: "price" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("price")
                        }
                    }
                }, [t._v(" מחיר ")])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "mktcap" == this.filterName,
                        down: "mktcap" == this.filterName && 1 == this.reverse,
                        up: "mktcap" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("mktcap")
                        }
                    }
                }, [t._v(" שווי שוק  ")])]), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "usdVolume" == this.filterName,
                        down: "usdVolume" == this.filterName && 1 == this.reverse,
                        up: "usdVolume" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("usdVolume")
                        }
                    }
                }, [t._v(" מחזור 24ש ")])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {
                    staticClass: "name",
                    class: {
                        active: "cap24hrChange" == this.filterName,
                        down: "cap24hrChange" == this.filterName && 1 == this.reverse,
                        up: "cap24hrChange" == this.filterName && -1 == this.reverse
                    },
                    on: {
                        click: function (s) {
                            t.sortByItem("cap24hrChange")
                        }
                    }
                }, [t._v(" שינוי 24ש ")])])])]), t._v(" "), t._l(t.orderBy(t.limitBy(t.filterBy(t.sortedArray, this.message, "long", "short", "trans"), this.countSize), this.filterName, this.reverse), function (s, a) {
                    return e("div", {
                        key: a,
                        staticClass: "table-row",
                        class: s.update
                    }, [e("div", {staticClass: "hidder"}, [t.userLoginedStatus ? e("div", {staticClass: "add-to-steak"}, [-1 == t.steakNamesInside.indexOf(s.short) || 0 == t.steakCounts[t.steakListCabinetItems.indexOf(s.short)] ? e("button", {
                        staticClass: "but-list not checker",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.addCurrentItemToCab(s.short)
                            }
                        }
                    }, [e("span")]) : e("button", {
                        staticClass: "but-list in checker",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.openPopupDelete(s.short)
                            }
                        }
                    }, [e("span")])]) : t._e(), t._v(" "), t.userLoginedStatus ? t._e() : e("div", {staticClass: "add-to-steak"}, [t._m(4, !0)])]), t._v(" "), -1 == t.steakNamesInside.indexOf(s.short) || 0 == t.steakCounts[t.steakListCabinetItems.indexOf(s.short)] ? e("div", {
                        staticClass: "content",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.addCurrentItemToCab(s.short)
                            }
                        }
                    }, [e("div", {staticClass: "counter"}, [e("div", {staticClass: "name"}, [t._v(" " + t._s(s.sortNum) + " ")])]), t._v(" "), e("div", {staticClass: "long"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "image con-img",
                        class: "sprite-" + s.short
                    }), t._v(" "), e("div", {staticClass: "apilong"}, [t._v(" " + t._s(s.long) + "  ")])])]), t._v(" "), e("div", {staticClass: "short"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apishort"}, [t._v("\n                                        " + t._s(s.short) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "translate"}, [e("div", {staticClass: "name"}, [t._v("\n                                    " + t._s(s.trans) + " \n                                ")])]), t._v(" "), e("div", {staticClass: "price"}, [e("div", {staticClass: "name"}, [s.price >= 1 && s.price < 10 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 4, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : s.price < 1 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 5, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 2, {thousandsSeparator: ". "}), 10)) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apimktcap"}, [t._v("\n                                        " + t._s(t._f("currency")(s.mktcap, "$", 0, {thousandsSeparator: ". "})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apiusdVolume"}, [t._v("\n                                        " + t._s(t._f("currency")(s.usdVolume, "$", 0, {thousandsSeparator: "."})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "apicap24hrChange",
                        class: {down: s.cap24hrChange < 0, up: s.cap24hrChange > 0}
                    }, [s.cap24hrChange > 0 ? e("span", [t._v("+")]) : t._e(), t._v("\n                                        " + t._s(s.cap24hrChange) + "\n                                        "), e("span", [t._v("%")])])])])]) : e("div", {
                        staticClass: "content",
                        attrs: {"data-marker": s.short},
                        on: {
                            click: function (e) {
                                t.openPopupDelete(s.short)
                            }
                        }
                    }, [e("div", {staticClass: "counter"}, [e("div", {staticClass: "name"}, [t._v(" " + t._s(s.sortNum) + " ")])]), t._v(" "), e("div", {staticClass: "long"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "image con-img",
                        class: "sprite-" + s.short
                    }), t._v(" "), e("div", {staticClass: "apilong"}, [t._v(" " + t._s(s.long) + "  ")])])]), t._v(" "), e("div", {staticClass: "short"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apishort"}, [t._v("\n                                        " + t._s(s.short) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "translate"}, [e("div", {staticClass: "name"}, [t._v("\n                                    " + t._s(s.trans) + " \n                                ")])]), t._v(" "), e("div", {staticClass: "price"}, [e("div", {staticClass: "name"}, [s.price >= 1 && s.price < 10 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 4, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : s.price < 1 ? e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 5, {thousandsSeparator: ". "}), 8)) + "\n                                    ")]) : e("div", {staticClass: "apiprice"}, [t._v("\n                                        " + t._s(t._f("truncate")(t._f("currency")(s.price, "$", 2, {thousandsSeparator: ". "}), 10)) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "mktcap"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apimktcap"}, [t._v("\n                                        " + t._s(t._f("currency")(s.mktcap, "$", 0, {thousandsSeparator: ". "})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "usdVolume"}, [e("div", {staticClass: "name"}, [e("div", {staticClass: "apiusdVolume"}, [t._v("\n                                        " + t._s(t._f("currency")(s.usdVolume, "$", 0, {thousandsSeparator: "."})) + "\n                                    ")])])]), t._v(" "), e("div", {staticClass: "cap24hrChange"}, [e("div", {staticClass: "name"}, [e("div", {
                        staticClass: "apicap24hrChange",
                        class: {down: s.cap24hrChange < 0, up: s.cap24hrChange > 0}
                    }, [s.cap24hrChange > 0 ? e("span", [t._v("+")]) : t._e(), t._v("\n                                        " + t._s(s.cap24hrChange) + "\n                                        "), e("span", [t._v("%")])])])])])])
                }), t._v(" "), t.filterBy(t.sortedArray, this.message, "long", "short", "trans").length < 1 ? e("div", {staticClass: "empty-list table-row"}, [t._m(5)]) : t._e()], 2)]), t._v(" "), e("div", {staticClass: "load-more"}, [this.hasMore ? e("div", {
                    staticClass: "butt",
                    on: {
                        click: function (s) {
                            t.loadMore()
                        }
                    }
                }, [e("span", [t._v("הצג 100 נוספים")])]) : t._e()])]), t._v(" "), t.isPopupOpen ? e("div", {staticClass: "hidden-pop-for-add "}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "popup-add"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopChanger()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {
                    staticClass: "cont",
                    class: {errorForm: 0 == parseFloat(this.startSumm) || isNaN(parseFloat(this.startSumm))}
                }, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("  הזן כמות מניות "), e("span", [t._v(" " + t._s(t.currAdded) + " ")])])]), t._v(" "), e("div", {staticClass: "form-part"}, [e("div", {staticClass: "inputer"}, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.number",
                        value: t.startSumm,
                        expression: "startSumm",
                        modifiers: {number: !0}
                    }], attrs: {type: "text", name: "add"}, domProps: {value: t.startSumm}, on: {
                        input: function (s) {
                            s.target.composing || (t.startSumm = t._n(s.target.value))
                        }, blur: function (s) {
                            t.$forceUpdate()
                        }
                    }
                })]), t._v(" "), e("div", {staticClass: "submiter"}, [e("button", {
                    staticClass: "butt type2",
                    on: {
                        click: function (s) {
                            t.addToWachers(t.currAdded)
                        }
                    }
                }, [e("span", [t._v("שמור")])])])])])])])]) : t._e(), t._v(" "), t.isPopupOpenChanger ? e("div", {staticClass: "hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "popup-add"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopChanger()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("  הזן כמות מניות "), e("span", [t._v(" " + t._s(t.currAdded) + " ")])])]), t._v(" "), e("div", {staticClass: "form-part"}, [e("div", {staticClass: "inputer"}, [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model.number",
                        value: t.startSumm,
                        expression: "startSumm",
                        modifiers: {number: !0}
                    }], attrs: {type: "text", name: "add"}, domProps: {value: t.startSumm}, on: {
                        input: function (s) {
                            s.target.composing || (t.startSumm = t._n(s.target.value))
                        }, blur: function (s) {
                            t.$forceUpdate()
                        }
                    }
                })]), t._v(" "), e("div", {staticClass: "submiter"}, [e("button", {
                    staticClass: "butt type2",
                    on: {
                        click: function (s) {
                            t.changeWacher(t.currAdded)
                        }
                    }
                }, [e("span", [t._v("שמור")])])])])])])])]) : t._e(), t._v(" "), t.isPopupDelete ? e("div", {staticClass: "popup hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "pop-bye"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopDelete()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("האם אתה בטוח שאתה רוצה להסיר " + t._s(t.currentDelete) + " ")])]), t._v(" "), e("div", {staticClass: "buttons-row"}, [e("a", {
                    staticClass: "butt type2",
                    attrs: {href: "#"},
                    on: {
                        click: function (s) {
                            t.removeCurrentItemToCab(t.currentDelete)
                        }
                    }
                }, [e("span", [t._v(" כן ")])]), t._v(" "), e("a", {
                    staticClass: "butt type3",
                    attrs: {href: ""},
                    on: {
                        click: function (s) {
                            t.closePopDelete()
                        }
                    }
                }, [e("span", [t._v(" לא ")])])])])])])]) : t._e(), t._v(" "), t.isPopupOpenBye ? e("div", {staticClass: "hidden-pop-for-add"}, [e("div", {staticClass: "contein-for-custom"}, [e("div", {
                    staticClass: "curr-class",
                    attrs: {id: "pop-bye"}
                }, [e("div", {
                    staticClass: "closer-pop", on: {
                        click: function (s) {
                            t.closePopBye()
                        }
                    }
                }, [e("span"), t._v(" "), e("span")]), t._v(" "), e("div", {staticClass: "cont"}, [e("div", {staticClass: "title-part"}, [e("h3", [t._v("\n                                    עליך להחזיק ארנק ביטקויין, על מנת שתוכל לקנות מטבע מסוג " + t._s(t.currentByeLong) + "\n                                האם להסיר את מטבע\n                            ")])]), t._v(" "), e("div", {staticClass: "buttons-row"}, [e("a", {
                    staticClass: "butt type2",
                    attrs: {href: "https://changelly.com/?ref_id=f9f7373bf362", target: "_blank"}
                }, [e("span", [t._v("   להמרת ביטקויין ל " + t._s(t.currentByeLong) + " ")])]), t._v(" "), t._m(6)])])])])]) : t._e()])
            }, staticRenderFns: [function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "counter"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" # ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "long"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" שם ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "short"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" סימול ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "translate"}, [s("div", {staticClass: "name no-sorter"}, [this._v(" עברית ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("a", {
                    staticClass: "checker but-list not",
                    attrs: {"data-fancybox": "", "data-src": "#popup-login", href: "javascript:;"}
                }, [s("span")])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {staticClass: "content"}, [s("div", {staticClass: "contein-empty"}, [this._v("\n                                בטעינה\n                            ")])])
            }, function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("a", {
                    staticClass: "butt type3",
                    attrs: {href: "https://www.coinmama.com/?ref=shay", target: "_blank"}
                }, [s("span", [this._v("  להמרת ש״ח לביטקויין  ")])])
            }]
        };
        var S = {
            name: "PopupTable", components: {
                Popup: e("VU/8")(g, b, !1, function (t) {
                    e("9z7c")
                }, null, null).exports
            }
        }, y = {
            render: function () {
                var t = this.$createElement, s = this._self._c || t;
                return s("div", {attrs: {id: "popup"}}, [s("Popup")], 1)
            }, staticRenderFns: []
        };
        var k = e("VU/8")(S, y, !1, function (t) {
            e("vFBe")
        }, null, null).exports, $ = e("mvHQ"), P = e.n($), I = e("//Fk"), O = e.n(I), B = e("NYxO");
        a.a.use(B.a);
        var N = new B.a.Store({
            state: {
                info: [],
                error: "",
                loginedStatus: logined,
                steakNamesInside: steakNames,
                cabinetState: isItCabinet,
                cabinetItems: steakNames,
                cabinetCounts: steakCounts,
                searchParams: searchText,
                transslates: translates
            }, getters: {}, mutations: {
                newState: function (t, s) {
                    t.error = "", t.info = s
                }, errorState: function (t, s) {
                    t.error = s
                }, updatePartStore: function (t, s) {
                    function e(t) {
                        return t.long == s.long
                    }

                    t.info.findIndex(e) > 0 && (t.info[t.info.findIndex(e)].price > s.price ? t.info[t.info.findIndex(e)].update = "up" : t.info[t.info.findIndex(e)].update = "down", t.info[t.info.findIndex(e)].price = Math.floor(1e3 * s.price) / 1e3, t.info[t.info.findIndex(e)].mktcap = s.mktcap)
                }, deleteFromSteak: function (t, s) {
                    var e = t.steakNamesInside.indexOf(s);
                    t.steakNamesInside.splice(e, 1)
                }, addToSteak: function (t, s) {
                    t.steakNamesInside[t.steakNamesInside.length] = s
                }, cangeCabItemSumm: function (t, s) {
                    t.cabinetCounts[t.cabinetItems.indexOf(s[0])] = s[1]
                }
            }, actions: {
                getUserDataToTable: function (t) {
                    var s = new Headers({"Access-Control-Allow-Origin": "*", "Content-Type": "multipart/form-data"});
                    fetch("api.coincap.io/v2/assets", {header: s}).then(function (t) {
                        return t.json()
                    }).then(function (s) {
                        s.forEach(function (t, s) {
                            t.sortNum = s + 1;
                            var e = t.short, a = "";
                            translates.forEach(function (t, s) {
                                if (t.name.toLowerCase() == e.toLowerCase()) return a = t.translate, !1
                            }), t.trans = a
                        }), t.commit("newState", s)
                    }).catch(function (s) {
                        t.commit("errorState", s)
                    })
                }, updateStore: function (t, s) {
                    t.commit("updatePartStore", s.msg)
                }, removeItemFromCab: function (t, s) {
                    return new O.a(function (e, a) {
                        var i = new FormData;
                        i.append("action", "addToSteakCurrent"), i.append("named", P()(s)), i.append("summ", P()(0)), i.append("price", P()(0)), i.append("time", Date.now()), i.append("userID", userID), fetch("/wp-admin/admin-ajax.php", {
                            method: "POST",
                            body: i
                        }).then(function (t) {
                            return console.log(t), t.json()
                        }).then(function (e) {
                            e ? (t.commit("deleteFromSteak", s), location.reload()) : console.log("some error", e)
                        }).catch(function (t) {
                            console.log("erroe network")
                        }), e()
                    })
                }, addItemToCab: function (t, s) {
                    console.log(s);
                    var e = t.state.info.find(function (e, a, i) {
                        return e.short === s[2] && (console.log(a), 0 !== a ? a : t.state.info[0])
                    });
                    return new O.a(function (a, i) {
                        var n = new FormData;
                        n.append("action", "addToSteakCurrent"), n.append("named", P()(s[0])), n.append("summ", P()(s[1])), n.append("price", P()(e.price)), n.append("time", Date.now()), n.append("userID", userID), fetch("/wp-admin/admin-ajax.php", {
                            method: "POST",
                            body: n
                        }).then(function (t) {
                            return console.log(t), t.json()
                        }).then(function (e) {
                            e ? t.commit("addToSteak", s[0]) : console.log("some error", e), location.replace("/cabinet/")
                        }).catch(function (t) {
                        }), a()
                    })
                }, cangeCabItem: function (t, s) {
                    var e = t.state.info.find(function (t, e, a) {
                        return t.short === s[2] && e
                    });
                    return new O.a(function (a, i) {
                        var n = new FormData;
                        n.append("action", "addToSteakCurrent"), n.append("named", P()(s[0])), n.append("summ", P()(s[1])), n.append("price", P()(e.price)), n.append("time", Date.now()), n.append("userID", userID), fetch("/wp-admin/admin-ajax.php", {
                            method: "POST",
                            body: n
                        }).then(function (t) {
                            return console.log(t), t.json()
                        }).then(function (e) {
                            e ? t.commit("cangeCabItemSumm", [s[0], s[1]]) : console.log("some error", e), location.reload()
                        }).catch(function (t) {
                            console.log("erroe network")
                        }), a()
                    })
                }
            }
        }), w = e("hMcO"), x = e.n(w), T = e("DmT9"), D = e.n(T), L = e("OjAt"), A = e.n(L);
        a.a.config.productionTip = !1, a.a.use(A.a), a.a.use(x.a, D()("http://coincap.io"), N), null != document.getElementById("app") && new a.a({
            el: "#app",
            store: N,
            sockets: {
                connect: function () {
                    this.$socket.emit("trades")
                }, trades: function (t) {
                    N.dispatch("updateStore", t)
                }
            },
            components: {App: c},
            template: "<App/>"
        }), null != document.getElementById("header") && new a.a({
            el: "#header",
            store: N,
            sockets: {
                connect: function () {
                    this.$socket.emit("trades")
                }, trades: function (t) {
                    N.dispatch("updateStore", t)
                }
            },
            components: {Head: h},
            template: "<Head/>"
        }), null != document.getElementById("head") && new a.a({
            el: "#head", store: N, sockets: {
                connect: function () {
                    this.$socket.emit("trades")
                }, trades: function (t) {
                    N.dispatch("updateStore", t)
                }
            }, components: {HeadS: _}, template: "<HeadS/>"
        }), null != document.getElementById("popup") && new a.a({
            el: "#popup",
            store: N,
            sockets: {
                connect: function () {
                    this.$socket.emit("trades")
                }, trades: function (t) {
                    N.dispatch("updateStore", t)
                }
            },
            components: {PopupTable: k},
            template: "<PopupTable />"
        })
    }, S9T8: function (t, s) {
    }, bU5q: function (t, s) {
    }, qNIY: function (t, s) {
    }, sqmL: function (t, s) {
    }, vFBe: function (t, s) {
    }, x0Z3: function (t, s) {
    }, xna1: function (t, s) {
    }
}, ["NHnr"]);
//# sourceMappingURL=app.0d9213172056f4c21724.js.map