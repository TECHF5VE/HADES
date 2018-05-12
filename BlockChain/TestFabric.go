/*
Copyright Ziggurat Corp. 2017 All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

// Asset: a demo chaincode for zigledger

package main

import (
	"fmt"
	"encoding/json"
	"strings"

	"github.com/ziggurat/zigledger/core/chaincode/shim"
	pb "github.com/ziggurat/zigledger/protos/peer"
)


//consist definition
const (
	User = iota
    Debit
    Transacation
)					//enum type of block chain

const (
	// invoke func name
	AddUser				string = "addUser"
	QueryUser			string = "queryUser"
	RaiseDebit			string = "raiseDebit"
	ReadDebit			string = "readDebit"
	DealTransaction     string = "dealTransaction"
	QueryTransaction	string = "queryTransaction"
)

// Prefixes for user and asset separately
const (
	UserPrefix	= "USER_"
	DebitPrefix = "DEBIT_"
)


//data structure definition
type assetChaincode struct {
}

//type BlockPojo  struct {
//	BpType int `json:bpType`
//	UserInfo string `json:"userInfoPojo"`
//	DebitInfo string `json:"debitInfoPojo"`
//	Transacation string `json:"json:"transacationPojo"`
//}

type UserInfoPojo struct {
	Name	string `json:"name"`
	IDC		string	   `json:"idc"`
	PhoneNum string `json:"phoneNum"`
	Address string `json:"address"`
	Password string `json:"password"`
}

type DebitInfoPojo struct {
	ID string `json:"id"`
	FundRaiserID string `json:"fundRaiserID"`
    FundRaiseRest string `json:"fundRaiseRest"`
    FundOvertimeTime string `json:"fundOvertimeTime"`
	Validation string `json:"validation"`
	Repaid string `json:"repaid"`
}

type TransacationPojo struct {
	ID string `json:"id"`
	From string `json:"from"`
	To string `json:"to"`
	Amount string `json:"amount"`
	BelongTo string `json:"belongto"`
}

func main() {
	err := shim.Start(new(assetChaincode))
	if err != nil {
		fmt.Printf("Error starting assetChaincode: %s", err)
	}
}


// Init is a no-op
func (t *assetChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("assetChaincode Init.")
	return shim.Success([]byte("Init success."))
}

func (t *assetChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("assetChaincode Invoke.")
	function, args := stub.GetFunctionAndParameters()
	
	switch function {
	case AddUser:
		if len(args) != 4 {
			return shim.Error("put operation must include 3 arguements")
		}
		// args[0]: user name
		// args[1]: user IDC
		// args[2]: user Phone Number
		// args[3]: user password
		// note: user address could be revealed from private key provided when invoking
		return t.addUser(stub, args)
	case QueryUser:
		if len(args) != 1 {
			return shim.Error("Incorrect number of arguments. Expecting 1.")
		}
		// args[0]: user name
		return t.queryUser(stub, args)
	case RaiseDebit:
		if len(args) != 6 {
			return shim.Error("Incorrect number of arguments. Expecting 1.")
		}
		// args[0]: FundRaiserID
		// args[1]: FundRaiseRest
		return t.raiseDebit(stub,args)
	case ReadDebit:
		if len(args) != 1 {
			return shim.Error("Incorrect number of arguments. Expecting 1.")
		}
		return t.readDebit(stub,args)
	}
	return shim.Error("Invalid invoke function name.")
}

func (t *assetChaincode) addUser(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var new_name string
	var new_idc string
	var new_phoneNum string
	var new_password string
	var err error

	new_name = args[0]
	new_idc = args[1]
	new_phoneNum = args[2]
	new_password = args[3]
	// get user's address
	new_add, err := stub.GetSender()
	if err != nil {
		return shim.Error("Fail to reveal user's address.")
	}
	new_add = strings.ToLower(new_add)

	// check if user exists
	user_key := UserPrefix + new_name
	userAsBytes, err := stub.GetState(user_key)
	if err != nil {
		return shim.Error("Fail to get user: " + err.Error())
	} else if userAsBytes != nil {
		fmt.Println("This user already exists: " + new_name)
		return shim.Error("This user already exists: " + new_name)
	}

	// register user
	//user := &user{new_name, new_idc,new_phoneNum, new_userLoan,new_add}
	UserInfoPojo := &UserInfoPojo{new_name, new_idc,new_phoneNum, new_add,new_password}
	userJSONasBytes, err := json.Marshal(UserInfoPojo)
	if err != nil {
		return shim.Error(err.Error())
	}
	err = stub.PutState(user_key, userJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success([]byte("User register success."))
}

func (t *assetChaincode) queryUser(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	user_name := args[0]
	user_key := UserPrefix + user_name

	userAsBytes, err := stub.GetState(user_key)
	if err != nil {
		return shim.Error("Fail to get user: " + err.Error())
	}
	if userAsBytes == nil {
		fmt.Println("This user doesn't exist: " + user_name)
		return shim.Error("This user doesn't exist: " + user_name)
	}

	return shim.Success(userAsBytes)
}

func (t *assetChaincode) raiseDebit(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var new_id string
	var new_fundRaiserID string
	var new_fundRaiseRest string
	var new_fundOvertimeTime string
	var new_validation string
	var new_repaid string
	var err_0 error
	var err_1 error

	new_id = args[0]
	new_fundRaiserID = args[1]
	new_fundRaiseRest = args[2]
	new_fundOvertimeTime = args[3]
	new_validation = args[4]
	new_repaid = args[5]
	
	//check if debit has existed
	debit_key := DebitPrefix + new_id
	DebitAsBytes_0, err_0 := stub.GetState(debit_key)
	if err_0 != nil {
		return shim.Error("Fail to raise debit: " + err_0.Error())
	} else if DebitAsBytes_0 != nil {
		fmt.Println("This debit already exists: " + new_id)
		return shim.Error("This debit already exists: " + new_id)
	}

	// verify weather the fundRaiser exists
	funderRaiser_key := UserPrefix + new_fundRaiserID
	DebitAsBytes_1, err_1 := stub.GetState(funderRaiser_key)
	if err_1 != nil {
		return shim.Error("Fail to get user: " + err_1.Error())
	}
	if DebitAsBytes_1 == nil {
		fmt.Println("This funder raiser doesn't exist: " + new_fundRaiserID)
		return shim.Error("This funder raiser doesn't exist: " + new_fundRaiserID)
	}
	//register this debit
	DebitInfoPojo := &DebitInfoPojo{new_id, new_fundRaiserID,new_fundRaiseRest,new_fundOvertimeTime, new_validation,new_repaid}
	debitJSONasBytes, err := json.Marshal(DebitInfoPojo)
	if err != nil {
		return shim.Error(err.Error())
	}
	err = stub.PutState(debit_key, debitJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}
	return shim.Success([]byte("debit register success."))
}
// ===========================================
// readAsset: query the information of a debit
// ===========================================
func (t *assetChaincode) readDebit(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	new_id := args[0]
	debit_key := DebitPrefix + new_id

	DebitAsBytes, err := stub.GetState(debit_key)
	if err != nil {
		return shim.Error("Fail to get debit: " + err.Error())
	}
	if DebitAsBytes == nil {
		fmt.Println("This debit doesn't exist: " + new_id)
		return shim.Error("This debit doesn't exist: " + new_id)
	}

	return shim.Success(DebitAsBytes)
}